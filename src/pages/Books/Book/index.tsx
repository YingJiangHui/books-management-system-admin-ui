import type {FC,HTMLAttributes,PropsWithChildren} from 'react';
import {PageContainer} from '@ant-design/pro-layout';
import {RouterTypes} from '@ant-design/pro-layout/es/typings';
import useBookLogic from '@/pages/Books/Book/logic/useBookLogic';
import ProCard from '@ant-design/pro-card';
import {Descriptions} from 'antd';
import { Link } from 'umi';

const defaultProps = {};

interface Props extends RouterTypes<any> {

}

type BookProps = typeof defaultProps&Props&HTMLAttributes<any>
const Book: FC<PropsWithChildren<BookProps>> = ({...rest}) => {
  const bookId = rest.match.params.id ||0
  const {book} = useBookLogic({id: bookId});
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
            path: `/book/${bookId}`,
            breadcrumbName: book.name
          }
        ]
      }

    }}
  >
    <ProCard>
      <Descriptions title={book.name}>
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
      </Descriptions>
    </ProCard>
  </PageContainer>
);
}

export default Book;
