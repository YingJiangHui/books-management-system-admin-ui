import type {FC,HTMLAttributes,PropsWithChildren} from 'react';
import {PageContainer} from '@ant-design/pro-layout';
import type {RouterTypes} from '@ant-design/pro-layout/es/typings';
import useBookLogic from '@/pages/Books/Book/logic/useBookLogic';
import ProCard from '@ant-design/pro-card';
import {Descriptions, Comment, Tooltip, List} from 'antd';
import moment from 'moment';

const defaultProps = {};

interface Props extends RouterTypes<any> {

}

type BookProps = typeof defaultProps&Props&HTMLAttributes<any>
const Book: FC<PropsWithChildren<BookProps>> = ({...rest}) => {
  const bookId = rest.match.params.id ||0
  const {book} = useBookLogic({id: bookId});
  const data = [
    {
      actions: [<span key="comment-list-reply-to-0">Reply to</span>],
      author: 'Han Solo',
      avatar: '',
      content: (
        <p>
          We supply a series of design principles, practical patterns and high quality design
          resources (Sketch and Axure), to help people create their product prototypes beautifully and
          efficiently.
        </p>
      ),
      datetime: (
          <span>{moment().subtract(1, 'days').fromNow()}</span>
      ),
    },
  ];
  return (
  <PageContainer
    header={{
      title: book.name,
      ghost: true,
      breadcrumb: {
        routes: [
          {
            path: '/',
            breadcrumbName: '首页'
          },
          {
            path: `/books/${bookId}`,
            breadcrumbName: book.name
          }
        ]
      }

    }}
  >
    <ProCard>
      <Descriptions title={book.name} column={1}>
        <Descriptions.Item label="图书类型">
          {book.categories?.map((category)=>category.name).join('/')}
        </Descriptions.Item>
        <Descriptions.Item label="作者">
          {book.author}
        </Descriptions.Item>
        <Descriptions.Item label="出版社">
          {book.publisher?.name}
        </Descriptions.Item>
        <Descriptions.Item label="出版日期">
          {book.publicationDate}
        </Descriptions.Item>
        <Descriptions.Item label="查看图书封面">
          <a onClick={()=>{window.open(book.imagePath)}}>link</a>
        </Descriptions.Item>
        <Descriptions.Item label="描述">
          <b>{book.description}</b>
        </Descriptions.Item>
      </Descriptions>

      {/*<List*/}
      {/*  className="comment-list"*/}
      {/*  header={`${data.length} 条评论`}*/}
      {/*  itemLayout="horizontal"*/}
      {/*  dataSource={data}*/}
      {/*  renderItem={item => (*/}
      {/*    <li>*/}
      {/*      <Comment*/}
      {/*        actions={item.actions}*/}
      {/*        author={item.author}*/}
      {/*        avatar={item.avatar}*/}
      {/*        content={item.content}*/}
      {/*        datetime={item.datetime}*/}
      {/*      />*/}
      {/*    </li>*/}
      {/*  )}*/}
      {/*/>*/}
    </ProCard>
  </PageContainer>
);
}

export default Book;
