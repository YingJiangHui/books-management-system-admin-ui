import type {FC} from 'react';
import {EllipsisOutlined,} from '@ant-design/icons';
import {Button, Dropdown,  Menu} from 'antd';
import {PageContainer} from '@ant-design/pro-layout';
import type { ProColumns} from '@ant-design/pro-table';
import {useForm} from 'antd/lib/form/Form';
import ProList from '@ant-design/pro-list';
import useBookViewLogic from '@/pages/BookView/logic/useBookViewLogic';
import ProCard from '@ant-design/pro-card';

interface Props {

}

const BookView: FC<Props> = (props) => {
    const {bookSourceData, getBooksService} = useBookViewLogic({});


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
        <ProList<any>
          pagination={{
            defaultPageSize: 8,
            showSizeChanger: false,
          }}
          grid={{ gutter: 16, column: 2 }}
          metas={{
            title: {},
            subTitle: {},
            type: {},
            avatar: {},
            content: {},
            actions: {},
          }}
          expandable={{

          }}
          itemHeaderRender={(item)=>{
            console.log(item);
            return <div>123</div>
          }}
          headerTitle="图书列表"
          dataSource={bookSourceData}
        />
      </PageContainer>
    </div>);
  }
;

export default BookView;
