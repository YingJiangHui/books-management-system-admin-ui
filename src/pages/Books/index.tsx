import type {FC} from 'react';
import {EllipsisOutlined,} from '@ant-design/icons';
import {Button, Dropdown,  Menu} from 'antd';
import {PageContainer} from '@ant-design/pro-layout';
import ProList from '@ant-design/pro-list';
import useBookViewLogic from '@/pages/Books/logic/useBooksLogic';

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
          title: '图书',
          ghost: true,
          breadcrumb: {
            routes: [
              {
                path: '/',
                breadcrumbName: '首页',
              },
              {
                path: '/book-management',
                breadcrumbName: '图书',
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
