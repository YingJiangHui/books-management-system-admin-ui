import {request} from "umi";


export function queryGetPublisher() {
  return request<API.Publisher[]>('/api/publishers', {
    method: "GET",
    getResponse:true
  });
}
