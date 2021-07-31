import {useRequest} from "@@/plugin-request/request";
import {useState} from "react";
import {
  queryCreateBorrowBooks, queryGetBorrowBook,
  queryGetBorrowBooks,
  queryOccupiedTimeList,
  queryUpdateBorrowBooks
} from "@/services/borrowBook";
import {queryDeleteBook} from "@/services/book";

interface UseBorrowBook {
  onGetBorrowBookListServiceSuccess?: () => void
  onGetBorrowBookServiceSuccess?: () => void
  onUpdateBorrowBookServiceSuccess?: () => void
  onCreateBorrowBookServiceSuccess?: () => void
  onDeleteBorrowBookServiceSuccess?: () => void
  onGetOccupiedTimeListSuccess?: () => void

}

export const useBorrowBook = (params: UseBorrowBook) => {
  const {onGetBorrowBookListServiceSuccess, onCreateBorrowBookServiceSuccess, onGetOccupiedTimeListSuccess, onDeleteBorrowBookServiceSuccess, onGetBorrowBookServiceSuccess, onUpdateBorrowBookServiceSuccess} = params;
  const [borrowBookList, setBorrowBookList] = useState<API.BorrowBook[]>();

  const getListService = useRequest(queryGetBorrowBooks, {
    manual: true,
    onSuccess: (response) => {
      setBorrowBookList(response);
      onGetBorrowBookListServiceSuccess?.();
    }
  });

  const getService = useRequest(queryGetBorrowBook, {
    manual: true,
    onSuccess: () => {
      onGetBorrowBookServiceSuccess?.();
    }
  });
  const createService = useRequest(queryCreateBorrowBooks, {
    manual: true,
    onSuccess: () => {
      onCreateBorrowBookServiceSuccess?.();
    }
  });
  const updateService = useRequest(queryUpdateBorrowBooks, {
    manual: true,
    onSuccess: () => {
      onUpdateBorrowBookServiceSuccess?.();
    }
  });

  const deleteService = useRequest(queryDeleteBook, {
    manual: true,
    onSuccess: () => {
      onUpdateBorrowBookServiceSuccess?.();
    }
  });
  const getOccupiedTimeListService = useRequest(queryOccupiedTimeList, {
    manual: true,
    onSuccess: () => {
      onGetOccupiedTimeListSuccess?.();
    }
  });
  return {getService, getListService, createService, updateService, deleteService, borrowBookList, getOccupiedTimeListService} as const;
};
export default useBorrowBook;
