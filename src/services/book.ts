import {request} from "umi";


export function queryGetBooks(params: API.Book.GetParams={}) {
  return request<API.Book[]>('/api/books', {
    method: "GET",
    params,
    getResponse:false
  });
}

export function queryDeleteBook(params: API.Book.DeleteParams) {
  return request<API.Book>(`/api/books/${params.id}`, {
    method: "DELETE",
    getResponse:true
  });
}

export function queryUpdateBooks(data: API.Book.UpdateParams) {
  return request<API.Book>(`/api/books/${data.id}`, {
    method: "PATCH",
    headers: {
      'Content-Type': 'application/json',
    },
    data
  });
}

export function queryAddBooks(data: API.Book.AddParams) {
  return request<API.Book>(`/api/books`, {
    method: "POST",
    data
  });
}
