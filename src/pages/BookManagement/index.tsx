import type {FC} from 'react';
import {EllipsisOutlined,PlusOutlined} from '@ant-design/icons';
import {Button,Dropdown,Form,Input,Menu,message,Select,SelectProps, Tag} from 'antd';
import {PageContainer} from '@ant-design/pro-layout';
import ProCard from '@ant-design/pro-card';
import useBook from '@/logic/useBook';
import type {ActionType,ProColumns} from '@ant-design/pro-table';
import {EditableProTable} from '@ant-design/pro-table';
import {Link} from 'umi';
import React,{useRef} from 'react';
import {queryAddBooks, queryDeleteBook, queryGetBooks, queryUpdateBooks} from '@/services/book';
import {useForm} from 'antd/lib/form/Form';
import {OptionsType} from '@ant-design/pro-table/es/components/ToolBar';
import {bookStatus} from '@/constant/book';
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
    const [form] = useForm();
    const columns: ProColumns<API.Book>[] = [
      {dataIndex: 'id',title: '编号'},
      {dataIndex: 'name',title: '书名',render: (data,record) => <Link to={`/book/${record.id}`}>{data}</Link>},
      {dataIndex: 'author',title: '作者'},
      {
        dataIndex: 'publisher',title: '出版社',
        render: (data) => {
          return data.name;
        },
        renderFormItem: (data,{isEditable,...rest},form) => {
          return isEditable ? <TableInput publisherList={publisherList}/> : <Input/>;
        }
      },
      {
        dataIndex: 'publicationDate',title: '出版日期',sorter: true,
        hideInSearch: true,valueType: 'date'
      },
      {
        dataIndex: 'categories',title: '作品类型',
        render: (data,record) => record?.categories?.map(category => category.name).join(','),
        renderFormItem: (data,{isEditable,...rest},form) => {
          return isEditable ? <TableMultipleSelect nativeProps={{mode: 'multiple'}} options={categoryList?.map(({id,name}) => ({label: name,value: id}))}/> : <Input/>;
        }
      },
      {
        title:'状态',
        dataIndex: 'status',
        renderFormItem: (data,{isEditable,...rest},form) => {
          return isEditable ? <TableMultipleSelect options={[{value:'RESERVED',label:'已预约'},{value:'BORROWED',label:'已借取'},{value:'PENDING',label:'待借取'}]}/> : <Input/>;
        },
        render:(text)=>{
          return  <Tag color="#2db7f5">{bookStatus['PENDING']}</Tag>
        }
      },
      {
        title: '操作',valueType: 'option',render: (data,record,_,action) => {
          return (<>
            <Button type="link" key="editable" onClick={() => {
              action?.startEditable?.(record.id);
            }}>操作</Button>
            <Button type="link" key="borrow">借阅</Button>
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
          title: '图书',
          ghost: true,
          breadcrumb: {
            routes: [
              {
                path: '/',
                breadcrumbName: '首页'
              },
              {
                path: '/book',
                breadcrumbName: '图书'
              }
            ]
          },
          extra: [
            <Button key="1">次要按钮</Button>,
            <Button key="2">次要按钮</Button>,
            <Button key="3" type="primary">
              主要按钮
            </Button>,
            <Dropdown
              key="dropdown"
              trigger={['click']}
              overlay={
                <Menu>
                  <Menu.Item key="1">下拉菜单</Menu.Item>
                  <Menu.Item key="2">下拉菜单2</Menu.Item>
                  <Menu.Item key="3">下拉菜单3</Menu.Item>
                </Menu>
              }
            >
              <Button key="4" style={{padding: '0 8px'}}>
                <EllipsisOutlined/>
              </Button>
            </Dropdown>
          ]
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
                // 可以添加多行，但是在添加的过程中取消不会消失只能手动删除
                // newRecordType: 'dataSource',
                position: 'top',
                record: (...a) => {
                  console.log(a,'asd');
                  return {
                    id: a[0] + 1
                  };
                }
              }}
              columns={columns}
              actionRef={actionRef}
              request={async(params = {},sort,filter) => {
                console.log("params,sort,filter");
                console.log(params,sort,filter);
                return  queryGetBooks(params);
              }}
              editable={{
                form,
                type: 'multiple',
                onChange: console.log,
                onDelete: async (id,record)=>{
                  const response = await queryDeleteBook({id})
                  if(response){
                    message.success('删除成功')
                  }
                  return response
                },
                onSave: async (id,formData,formDataCopy,indexs) => {
                  console.log("id,formData,formDataCopy,indexs");
                  console.log(id,formData,formDataCopy,indexs);
                  if (indexs) {
                    // 如果存在索引信息，说明是创建
                    const response = await queryAddBooks({...formData,publisher: formData.publisher.id,categories: formData.categories.map((category) => (category.id))});
                    message.success('添加成功')
                    return response
                  } else {
                    // 不存在则是更新
                    const response= await  queryUpdateBooks({...formData,publisher: formData.publisher.id,categories: formData.categories.map((category) => (category.id))});
                    message.success('更新成功')
                    return response
                  }
                }
              }}
              rowKey="id"
              search={{
                filterType: 'light',
                searchText: '搜索',
                labelWidth: 'auto'
              }}
              form={{
                // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下

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
              headerTitle="高级表格"
              toolBarRender={() => [
                <Button key="button" icon={<PlusOutlined/>} type="primary">
                  新建
                </Button>,
                <Dropdown key="menu" overlay={menu}>
                  <Button>
                    <EllipsisOutlined/>
                  </Button>
                </Dropdown>
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
