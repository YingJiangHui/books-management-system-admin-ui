import {FC, useState} from 'react';
import {Button,Input,Menu,message,Select,SelectProps} from 'antd';
import {PageContainer} from '@ant-design/pro-layout';
import ProCard from '@ant-design/pro-card';
import type {ActionType,ProColumns} from '@ant-design/pro-table';
import {EditableProTable} from '@ant-design/pro-table';
import {Link} from 'umi';
import React,{useRef} from 'react';
import {queryAddBooks, queryDeleteBook, queryGetBookList, queryUpdateBooks} from '@/services/book';
import {useForm} from 'antd/lib/form/Form';
import {OptionsType} from '@ant-design/pro-table/es/components/ToolBar';
import useBookLogic from "@/pages/BookManagement/useBookLogic";

interface Props {

}
type BookStatus = 'PENDING'|'BORROWED'|'RESERVED'
const TableInput: React.FC<{value?: API.Publisher,publisherList: API.Publisher[],onChange?: (value: API.Publisher) => void}> = (props) => {
  return (
    <Select options={props.publisherList.map(({id,name}) => ({label: name,value: id}))} defaultValue={props.value?.id}
            onChange={(id,object) => {
              props.onChange?.({name: object.label,id: object.value});
            }}>
    </Select>
  );
};
const TableMultipleSelect: React.FC<{value?: API.Category[]|BookStatus,nativeProps?: SelectProps<number>,options: OptionsType,onChange?: (value: API.Category[]|BookStatus) => void}> = (props) => {
  const defaultValue = Array.isArray(props.value)? props.value?.map(({id}) => id) : props.value
  return (<Select
                  {...props.nativeProps}
                  onChange={(ids,_items) => {
                    const items = Array.isArray(_items)?_items.map((item) => ({...item,name: item.label,id: item.value})):_items
                    props.onChange?.(items);
                  }}
                  showArrow
                  defaultValue={defaultValue}
                  options={props?.options}/>);
};
const BookManagement: FC<Props> = (props) => {
    const {categoryList,publisherList} = useBookLogic()
    const [bookList,setBookList] = useState<API.Book[]>([])
    const [form] = useForm();
    const columns: ProColumns<API.Book>[] = [
      {dataIndex: 'id',title: '??????'},
      {dataIndex: 'name',title: '??????',render: (data,record) => <Link to={`/books/${record.id}`}>{data}</Link>},
      {dataIndex: 'author',title: '??????'},
      {
        dataIndex: 'publisher',title: '?????????',
        render: (data) => {
          return data.name;
        },
        renderFormItem: (data,{isEditable,...rest},form) => {
          return isEditable ? <TableInput publisherList={publisherList}/> : <Input/>;
        }
      },
      {
        dataIndex: 'publicationDate',title: '????????????',sorter: true,
        hideInSearch: true,valueType: 'date'
      },
      {
        dataIndex: 'categories',title: '????????????',
        render: (data,record) => record?.categories?.map(category => category.name).join(','),
        renderFormItem: (data,{isEditable,...rest},form) => {
          return isEditable ? <TableMultipleSelect nativeProps={{mode: 'multiple'}} options={categoryList?.map(({id,name}) => ({label: name,value: id}))}/> : <Input/>;
        }
      },
      {
        dataIndex: 'description',title: '??????',
      },
      {
        title: '??????',valueType: 'option',render: (data,record,_,action) => {
          return (<>
            <Button type="link" key="editable" onClick={() => {
              action?.startEditable?.(record.id);
            }}>??????</Button>
          </>);
        }
      }
    ];
    const actionRef = useRef<ActionType>();
    const menu = (
      <Menu>
        <Menu.Item key="1">1st item</Menu.Item>
        <Menu.Item key="2">2nd item</Menu.Item>
        <Menu.Item key="3">3rd item</Menu.Item>
      </Menu>
    );

    return (<div
      style={{
        background: '#F5F7FA'
      }}
    >
      <PageContainer
        header={{
          title: '????????????',
          ghost: true,
          breadcrumb: {
            routes: [
              {
                path: '/',
                breadcrumbName: '??????'
              },
              {
                path: '/book-management',
                breadcrumbName: '????????????'
              }
            ]
          },
        }}

        tabProps={{
          type: 'editable-card',
          hideAdd: true,
          onEdit: (e,action) => console.log(e,action)
        }}
      >
        <ProCard direction="column" ghost gutter={[0,16]}>
          <ProCard>
            <EditableProTable<API.Book>
              recordCreatorProps={{
                // ????????????????????????????????????????????????????????????????????????????????????
                // newRecordType: 'dataSource',
                position: 'top',
                record: () => {
                  return {
                    id: bookList[0]?.id+1
                  };
                }
              }}
              columns={columns}
              actionRef={actionRef}
              request={async(params = {},sort,filter) => {
                console.log("params,sort,filter");
                console.log(params,sort,filter);
                const list  = await queryGetBookList(params);
                setBookList(list.data)
                return  list
              }}
              editable={{
                form,
                type: 'multiple',
                onChange: console.log,
                onDelete: async (id,record)=>{
                  const response = await queryDeleteBook({id})
                  if(response){
                    message.success('????????????')
                  }
                  return response
                },
                onSave: async (id,formData,formDataCopy,indexs) => {
                  if (indexs) {
                    // ??????????????????????????????????????????
                    const response = await queryAddBooks({...formData,publisher: formData.publisher.id,categories: formData.categories.map((category) => (category.id))});
                    message.success('????????????')
                    return response
                  } else {
                    // ?????????????????????
                    const response= await  queryUpdateBooks({...formData,publisher: formData.publisher.id,categories: formData.categories.map((category) => (category.id))});
                    message.success('????????????')
                    return response
                  }
                }
              }}
              rowKey="id"
              search={{
                filterType: 'light',
                searchText: '??????',
                labelWidth: 'auto'
              }}
              form={{
                // ??????????????? transform????????????????????????????????????????????????????????????

                syncToUrl: (values,type) => {

                  if (type === 'get') {
                    return {
                      ...values,
                      created_at: [values.startTime,values.endTime]
                    };
                  }
                  return values;
                }
              }}
              pagination={{
                pageSize: 10
              }}
              dateFormatter="string"
              headerTitle="??????????????????"
              toolBarRender={() => [
              <div/>
              ]}
            />
          </ProCard>
          <ProCard gutter={16} ghost style={{height: 200}}>
            <ProCard colSpan={16}/>
            <ProCard colSpan={8}/>
          </ProCard>
        </ProCard>
      </PageContainer>
    </div>);
  }
;

export default BookManagement;
