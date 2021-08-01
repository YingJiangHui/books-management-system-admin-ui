import useBook from '@/models/useBook';
import {useEffect, useMemo, useState} from 'react';
import {Button, Modal, Space, Tag} from 'antd';
import {Link} from '@umijs/preset-dumi/lib/theme';
import useBorrowBook from "@/models/useBorrowBook";
import BorrowBookFormModal, {BorrowBookFormFieldMap} from "@/pages/BookView/component/BorrowBookFormModal";
import {message} from 'antd';

interface UseBookViewLogic {
}

const useBookViewLogic = (params: UseBookViewLogic) => {
  const bookService = useBook({});
  const borrowBookService = useBorrowBook({
    onCreateBorrowBookServiceSuccess: () => {
      message.success('成功向管理员发起借阅请求');
    }
  });
  useEffect(() => {
    bookService.getBooksService.run();
  }, []);
  const onFinish = async (bookId: number, formDate: BorrowBookFormFieldMap) => {
    const {occupiedTime} = formDate;
    await borrowBookService.createService.run({bookId, startedDate: occupiedTime[0], endDate: occupiedTime[1], status: 'APPLIED'});
  };
  const bookSourceData = bookService.bookList.map((book) => ({
    title: <Link to={'/'}>{book.name}</Link>,
    subTitle: <>{book.categories.map((category) => (<Tag key={category.id} color="#5BD8A6">{category.name}</Tag>))}</>,
    actions: [<BorrowBookFormModal onFinish={onFinish.bind(null, book.id)}
                                   occupiedTimeList={borrowBookService.occupiedTimeList}
                                   trigger={<Button type="link" onClick={() => {
                                     borrowBookService.getOccupiedTimeListService.run({id: book.id});
                                   }}>申请借阅</Button>}/>, <Button type="link">预约</Button>],
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
  }));


  return {bookService, bookSourceData, borrowBookService};
};

export default useBookViewLogic;
