import type {FC} from 'react';
import {EllipsisOutlined,PlusOutlined} from '@ant-design/icons';
import {Button,Dropdown,Menu,Popover} from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import ProCard from '@ant-design/pro-card';
import useBookLogic from "@/pages/Book/useBookLogic";
import type {ActionType,ProColumns} from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import {Link,request} from 'umi';
import {useRef} from 'react';
import {queryGetBooks} from '@/services/book';

interface Props {

}

const Book: FC<Props> = (props) => {
  const {bookList} = useBookLogic({})
  const columns: ProColumns<API.Book>[] = [
    {dataIndex: 'id',title:'编号'},
    {dataIndex: 'name',title:'书名', render:(data,record)=><Link to={`/book/${record.id}`}>{data}</Link>},
    {dataIndex: 'author',title:'作者'},
    {dataIndex: 'publisher',title:'出版社', render: (data)=> data.name},
    {dataIndex: 'categories',title:'作品类型', render: (data)=> data.map((item)=>item.name).join('，')},
    {title:'操作', valueType: 'option',render:( data,record,_, action)=>{
      const actions = <>
        <Button type='link'>下架图书</Button>
        <Button type='link' onClick={()=>{action?.startEditable?.(record.id)}}>修改图书</Button>
        <Button type='link'>借阅图书</Button>
      </>
      return (<>
        {/*<Popover content={actions} title="操作选项">*/}
        {/*  <Button type='link'>选项</Button>*/}
        {/*</Popover>*/}
        <Button type='link'>下架</Button>
        <Button type='link' key="editable" onClick={()=>{action?.startEditable?.(record.id)}}>编辑</Button>
        <Button type='link' key="borrow">借阅</Button>
      </>)
      } }
  ]
  const actionRef = useRef<ActionType>();
  const menu = (
    <Menu>
      <Menu.Item key="1">1st item</Menu.Item>
      <Menu.Item key="2">2nd item</Menu.Item>
      <Menu.Item key="3">3rd item</Menu.Item>
    </Menu>
  );

  return (  <div
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
            <Button key="4" style={{ padding: '0 8px' }}>
              <EllipsisOutlined />
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
        <ProCard >
          <ProTable<API.Book>
            columns={columns}
            actionRef={actionRef}
            request={async (params = {}, sort, filter) => {
              return queryGetBooks(params)
            }}
            editable={{
              type: 'multiple',
            }}
            rowKey="id"
            search={{
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
              pageSize: 5,
            }}
            dateFormatter="string"
            headerTitle="高级表格"
            toolBarRender={() => [
              <Button key="button" icon={<PlusOutlined />} type="primary">
                新建
              </Button>,
              <Dropdown key="menu" overlay={menu}>
                <Button>
                  <EllipsisOutlined />
                </Button>
              </Dropdown>,
            ]}
          />
        </ProCard>
        <ProCard gutter={16} ghost style={{ height: 200 }}>
          <ProCard colSpan={16} />
          <ProCard colSpan={8} />
        </ProCard>
      </ProCard>
    </PageContainer>
  </div>);
};

export default Book;
