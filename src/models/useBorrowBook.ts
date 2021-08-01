import {useRequest} from "@@/plugin-request/request";
import {useState} from "react";
import {
  queryCreateBorrowBooks, queryGetBorrowBook,
  queryGetBorrowBooks, queryGetBorrowBooksForUser,
  queryOccupiedTimeList,
  queryUpdateBorrowBooks
} from "@/services/borrowBook";
import {queryDeleteBook} from "@/services/book";
import { useMemo } from "react";

interface UseBorrowBook {
  onGetBorrowBookListServiceSuccess?: () => void
  onGetBorrowBookServiceSuccess?: () => void
  onUpdateBorrowBookServiceSuccess?: () => void
  onCreateBorrowBookServiceSuccess?: () => void
  onDeleteBorrowBookServiceSuccess?: () => void
  onGetOccupiedTimeListSuccess?: () => void
  onGetBorrowBookListForUserServiceSuccess?: () => void
}

export default function useBorrowBook (params: UseBorrowBook){
  const {onGetBorrowBookListServiceSuccess, onCreateBorrowBookServiceSuccess, onGetOccupiedTimeListSuccess, onDeleteBorrowBookServiceSuccess,onGetBorrowBookListForUserServiceSuccess, onGetBorrowBookServiceSuccess, onUpdateBorrowBookServiceSuccess} = params;
  const [borrowBookList, setBorrowBookList] = useState<API.BorrowBook[]>([]);
  const [occupiedTimeList, setOccupiedTimeList] = useState<API.BorrowBook.OccupiedTime[]>([]);
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
      onDeleteBorrowBookServiceSuccess?.()
    }
  });
  const getOccupiedTimeListService = useRequest(queryOccupiedTimeList, {
    manual: true,
    onSuccess: (response) => {
      setOccupiedTimeList(response)
      onGetOccupiedTimeListSuccess?.();
    }
  });

  const getListForUserService = useRequest(queryGetBorrowBooksForUser,{
    onSuccess:(response)=>{
      setBorrowBookList(response);
      onGetBorrowBookListForUserServiceSuccess?.()
    }
  })

  const loading = useMemo(()=>getListService.loading||updateService.loading||createService.loading||getService.loading,[])
  return {getService, getListService,getListForUserService,createService, updateService, deleteService, borrowBookList, getOccupiedTimeListService,occupiedTimeList,loading} as const;
};
