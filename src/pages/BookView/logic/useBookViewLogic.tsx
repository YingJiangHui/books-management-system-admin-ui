import useBook from '@/logic/useBook';
import {useEffect, useMemo} from 'react';
import {Button, Space, Tag} from 'antd';
import {Link} from '@umijs/preset-dumi/lib/theme';

interface UseBookViewLogic {
}

const useBookViewLogic = (params:UseBookViewLogic) => {
  const {getBooksService, bookList} = useBook({});
  useEffect(() => {
    getBooksService.run();
  }, []);

  const bookSourceData = useMemo(() => bookList.map((book) => ({
    title: <Link to={'/'}>{book.name}</Link>,
    subTitle: <>{book.categories.map((category) => (<Tag color="#5BD8A6">{category.name}</Tag>))}</>,
    actions: [<Button type="link" onClick={() => {
    }}>借阅</Button>, <Button type="link">预约</Button>, <Button type="link">还书</Button>, <Button type="link">续借</Button>],
    avatar: 'https://gw.alipayobjects.com/zos/antfincdn/UCSiy1j6jx/xingzhuang.svg',
    content: (
      <div
        style={{
          flex: 1,
        }}
      >
        <div
          style={{
            width: 500,
          }}
        >
          <Space direction="vertical" size="middle">
            <div>{book.author} / {book.publisher.name} / {book.publicationDate}</div>
            <b>“{book.description}”</b>
          </Space>
        </div>
      </div>),
  })), [bookList]);


  return {getBooksService, bookList, bookSourceData};
};

export default useBookViewLogic;
