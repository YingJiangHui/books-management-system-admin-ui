import {request} from "umi";


export function queryGetCategories() {
  return request<API.Category[]>('/api/categories', {
    method: "GET",
    getResponse:true
  });
}
