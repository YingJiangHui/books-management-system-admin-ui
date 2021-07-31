import useBook from '@/logic/useBook';
import {useEffect, useMemo, useState} from 'react';
import {Button, Modal, Space, Tag} from 'antd';
import {Link} from '@umijs/preset-dumi/lib/theme';
import useBorrowBook from "@/logic/useBorrowBook";
import BorrowBookFormModal from "@/pages/BookView/component/BorrowBookFormModal";

interface UseBookViewLogic {
}

const useBookViewLogic = (params:UseBookViewLogic) => {
  const bookService = useBook({});
  const borrowBookService = useBorrowBook({})
  useEffect(() => {
    bookService.getBooksService.run();
  }, []);
  const bookSourceData = useMemo(() => bookService.bookList.map((book) => ({
    title: <Link to={'/'}>{book.name}</Link>,
    subTitle: <>{book.categories.map((category) => (<Tag color="#5BD8A6">{category.name}</Tag>))}</>,
    actions: [<BorrowBookFormModal trigger={<Button type="link" >借阅</Button>}/>, <Button type="link">预约</Button>],
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
  })), [bookService.bookList]);


  return {bookService, bookSourceData,borrowBookService};
};

export default useBookViewLogic;
