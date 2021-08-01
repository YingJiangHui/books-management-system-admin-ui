import {request} from "umi";

export function queryGetBorrowBooks(params: API.BorrowBook.GetsParams={}) {
  return request<API.BorrowBook[]>('/api/borrow-books', {
    method: "GET",
    params,
    getResponse:true
  });
}
export function queryGetBorrowBook(params: API.BorrowBook.GetParams) {
  return request<API.BorrowBook>(`/api/borrow-books/${params.id}`, {
    method: "GET",
    getResponse:true
  });
}

export function queryCreateBorrowBooks(params: API.BorrowBook.CreateParams) {
  const startedDate = params.startedDate?params.startedDate: new Date().toISOString()
  return request<API.BorrowBook>('/api/borrow-books', {
    method: "POST",
    data: {...params,startedDate},
    getResponse:true
  });
}

export function queryDeleteBorrowBooks(params: API.BorrowBook.DeletePrams) {
  return request<API.BorrowBook>(`/api/borrow-books/${params.id}`, {
    method: "DELETE",
    getResponse:true
  });
}

export function queryUpdateBorrowBooks(params: API.BorrowBook.UpdateParams) {
  const {id,...data} = params
  const startedDate = params.startedDate?params.startedDate: new Date().toISOString()
  return request<API.BorrowBook>(`/api/borrow-books/${id}`, {
    method: "PATCH",
    data:{...data,startedDate},
    getResponse:true
  });
}

export function queryOccupiedTimeList(params: API.BorrowBook.GetParams) {
  const {id} = params
  return request<API.BorrowBook.OccupiedTime[]>(`/api/borrow-books/${id}/occupied-time`, {
    method: "GET",
    getResponse:true
  });
}

export function queryGetBorrowBooksForUser(params: API.BorrowBook.GetsParams={}) {
  return request<API.BorrowBook[]>('/api/borrow-books/user', {
    method: "GET",
    params,
    getResponse:true
  });
}
