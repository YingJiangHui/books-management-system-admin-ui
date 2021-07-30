import type {FC} from 'react';
import {EllipsisOutlined} from '@ant-design/icons';
import {Button,Dropdown,Menu} from 'antd';
import {PageContainer} from '@ant-design/pro-layout';
interface Props {

}


const Statistics: FC<Props> = (props) => {
    return (<div
      style={{
        background: '#F5F7FA'
      }}
    >
      <PageContainer
        header={{
          title: '统计',
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
      </PageContainer>
    </div>);
  }
;

export default Statistics;
