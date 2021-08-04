import useBook from '@/models/useBook';
import {useEffect, useMemo, useState} from 'react';
import {Button, Modal, Space, Tag} from 'antd';
import {Link} from '@umijs/preset-dumi/lib/theme';
import useBorrowBook from "@/models/useBorrowBook";
import BorrowDateFormModal, {BorrowBookFormFieldMap} from "@/components/DateFormModal";
import {message} from 'antd';

interface UseBooksLogic {
}

const useBookViewLogic = (params: UseBooksLogic) => {
  const bookService = useBook({});
  const borrowBookService = useBorrowBook({
    onCreateBorrowBookServiceSuccess: () => {
      message.success('成功向管理员发起借阅请求');
    }
  });
  useEffect(() => {
    bookService.getBooksService.run();
  }, []);
  const onBorrowBookFormFinish = async (bookId: number, formDate: BorrowBookFormFieldMap) => {
    if (formDate.endDate)
      await borrowBookService.createService.run({endDate: formDate.endDate, bookId, status: 'APPLIED'});
  };
  const onReservedBookFormFinish = async (bookId: number, formDate: BorrowBookFormFieldMap) => {
    if (formDate.rangeDate)
      await borrowBookService.createService.run({startedDate: formDate.rangeDate[0], endDate: formDate.rangeDate[1], bookId, status: 'RESERVED'});
  };
  const bookSourceData = bookService.bookList.map((book) => ({
    title: <Link to={`/books/${book.id}`}>{book.name}</Link>,
    subTitle: <>{book.categories.map((category) => (<Tag key={category.id} color="#5BD8A6">{category.name}</Tag>))}</>,
    actions: [
      <BorrowDateFormModal onFinish={onBorrowBookFormFinish.bind(null, book.id)}
                           occupiedTimeList={borrowBookService.occupiedTimeList}
                           trigger={<Button type="link" onClick={() => {
                             borrowBookService.getOccupiedTimeListService.run({id: book.id});
                           }}>申请借阅</Button>}/>,
      <BorrowDateFormModal isRange={true} onFinish={onReservedBookFormFinish.bind(null, book.id)}
                           occupiedTimeList={borrowBookService.occupiedTimeList}
                           trigger={<Button type="link" onClick={() => {
                             borrowBookService.getOccupiedTimeListService.run({id: book.id});
                           }}>预约</Button>}/>
    ],
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
