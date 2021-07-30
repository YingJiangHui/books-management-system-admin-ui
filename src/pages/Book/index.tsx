import type {FC} from 'react';
import {EllipsisOutlined, PlusOutlined} from '@ant-design/icons';
import {Button, Dropdown, Form, Input, Menu, Select} from 'antd';
import {PageContainer} from '@ant-design/pro-layout';
import ProCard from '@ant-design/pro-card';
import useBookLogic from "@/logic/useBookLogic";
import type {ActionType, ProColumns} from '@ant-design/pro-table';
import {EditableProTable} from '@ant-design/pro-table';
import {Link} from 'umi';
import React, {useRef} from 'react';
import {queryGetBooks, queryUpdateBooks} from '@/services/book';
import {useForm} from 'antd/lib/form/Form';

interface Props {

}


const TableInput: React.FC<{ value?: API.Publisher, publisherList: API.Publisher[], onChange: (value: API.Publisher) => void }> = (props) => {
  return (
    <Select options={props.publisherList.map(({id, name}) => ({label:name,value:id})) } defaultValue={props.value?.id}
            onChange={(id, object) => {
              props.onChange({name: object.label, id: object.value});
            }}>
    </Select>
  );
};
const TableSelect: React.FC<{ value?: API.Category[], categoryList: API.Category[], onChange: (value: API.Category[]) => void }> = (props) => {
  return (<Select mode="multiple"
                  onChange={(ids, items) => {
                    props.onChange(items.map((item) => ({...item, name: item.label, id: item.value})));
                  }}
                  showArrow defaultValue={props.value?.map(({id}) => id)}
                  options={props.categoryList?.map(({id, name}) => ({label: name, value: id}))}/>);
};

const Book: FC<Props> = (props) => {
  const {bookList, categoryList, publisherList} = useBookLogic({});
  const [form] = useForm();
  const columns: ProColumns<API.Book>[] = [
    {dataIndex: 'id', title: '编号', valueType: 'indexBorder'},
    {dataIndex: 'name', title: '书名', render: (data, record) => <Link to={`/book/${record.id}`}>{data}</Link>},
    {dataIndex: 'author', title: '作者'},
    {
      dataIndex: 'publisher', title: '出版社',
      render: (data) => {
        return data.name;
      },
      renderFormItem: (data, {isEditable, ...rest}, form) => {
        return isEditable ? <TableInput publisherList={publisherList}/> : <Input/>;
      },
    },
    {
      dataIndex: 'publicationDate', title: '出版日期', sorter: true,
      hideInSearch: true, valueType: 'date'
    },
    {
      dataIndex: 'categories', title: '作品类型',
      render: (data, record) => record?.categories?.map(category => category.name).join(','),
      renderFormItem: (data, {isEditable, ...rest}, form) => {
        return isEditable ? <TableSelect categoryList={categoryList}/> : <Input/>;
      },
    },
    {
      title: '操作', valueType: 'option', render: (data, record, _, action) => {
        return (<>
          <Button type="link" key="deletable" onChange={() => {
          }}>下架</Button>
          <Button type="link" key="editable" onClick={() => {
            action?.startEditable?.(record.id);
          }}>编辑</Button>
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
      background: '#F5F7FA',
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
              breadcrumbName: '首页',
            },
            {
              path: '/book',
              breadcrumbName: '图书',
            },
          ],
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
          </Dropdown>,
        ],
      }}
      tabProps={{
        type: 'editable-card',
        hideAdd: true,
        onEdit: (e, action) => console.log(e, action),
      }}
    >
      <ProCard direction="column" ghost gutter={[0, 16]}>
        <ProCard>
          <EditableProTable<API.Book>
            recordCreatorProps={{
              position: 'top',
            }}
            columns={columns}
            actionRef={actionRef}
            request={async (params = {}, sort, filter) => {
              console.log(params, sort, filter);
              return queryGetBooks(params);
            }}
            editable={{
              form,
              type: 'multiple',
              onSave: (id, formData) => {
                return queryUpdateBooks({...formData, publisher: formData.publisher.id, categories: formData.categories.map((category) => (category.id))});
              }
            }}
            rowKey="id"
            search={{
              filterType: 'light',
              searchText: '搜索',
              labelWidth: 'auto',
            }}
            form={{
              // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下

              syncToUrl: (values, type) => {

                if (type === 'get') {
                  return {
                    ...values,
                    created_at: [values.startTime, values.endTime],
                  };
                }
                return values;
              },
            }}
            pagination={{
              pageSize: 10,
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
              </Dropdown>,
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

export default Book;
