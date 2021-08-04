import type {FC} from 'react';
import {EllipsisOutlined,} from '@ant-design/icons';
import {Button, Descriptions, Dropdown, Menu} from 'antd';
import {PageContainer} from '@ant-design/pro-layout';
import {useModel} from "@@/plugin-model/useModel";
import moment from 'moment';

interface Props {

}
const roleMap = {
  'user':'读者',
  'admin':'管理员'
}
const Account: FC<Props> = () => {
    const {initialState} = useModel('@@initialState');
    const content = (
      <Descriptions column={2}>
        <Descriptions.Item label="用户名">{initialState?.currentUser?.username}</Descriptions.Item>
        <Descriptions.Item label="邮箱">{initialState?.currentUser?.email}</Descriptions.Item>
        <Descriptions.Item label="民族">{initialState?.currentUser?.nation?.name}</Descriptions.Item>
        <Descriptions.Item label="账号创建日期">{moment(initialState?.currentUser?.createdAt).format('YYYY-MM-DD')}</Descriptions.Item>
        <Descriptions.Item label="账号类型">{initialState?.currentUser?.roles?.map((role)=>roleMap[role]).join('，')}</Descriptions.Item>
      </Descriptions>
    );
    return (<div
      style={{
        background: '#F5F7FA',
      }}
    >
      <PageContainer
        header={{
          title: '个人主页',
          ghost: true,
          breadcrumb: {
            routes: [
              {
                path: '/',
                breadcrumbName: '首页',
              },
              {
                path: '/account',
                breadcrumbName: '个人主页',
              },
            ],
          },
        }}
        tabProps={{
          type: 'editable-card',
          hideAdd: true,
          onEdit: (e, action) => console.log(e, action),
        }}
        content={content}
      >

      </PageContainer>
    </div>);
  }
;

export default Account;
