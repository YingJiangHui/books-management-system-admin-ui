import type {FC} from 'react';
import {EllipsisOutlined, SearchOutlined,} from '@ant-design/icons';
import {Button, Dropdown,  Menu} from 'antd';
import {PageContainer} from '@ant-design/pro-layout';
import ProList from '@ant-design/pro-list';
import useBookViewLogic from '@/pages/Books/logic/useBooksLogic';
import ProForm, { ProFormText } from '@ant-design/pro-form';

interface Props {

}

const Book: FC<Props> = () => {
    const {bookSourceData, bookService} = useBookViewLogic({});


    return (<div
      style={{
        background: '#F5F7FA',
      }}
    >
      <PageContainer
        header={{
          title: '图书列表',
          ghost: true,
          breadcrumb: {
            routes: [
              {
                path: '/',
                breadcrumbName: '首页',
              },
              {
                path: '/books',
                breadcrumbName: '图书列表',
              },
            ],
          },

        }}
        tabProps={{
          type: 'editable-card',
          hideAdd: true,
          onEdit: (e, action) => console.log(e, action),
        }}
      >
        <ProList<any>
          loading={bookService.getBooksService.loading}
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
          toolBarRender={() => {
            return [
              <ProForm style={{width:500}} size={'large'} submitter={false} onValuesChange={(changeValues) => bookService.getBooksService.run(changeValues)} >
                <ProFormText name='searchText' placeholder={"输入任意关键字查询图书"} fieldProps={{suffix: <SearchOutlined />}}/>
              </ProForm>
            ];
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

export default Book;
