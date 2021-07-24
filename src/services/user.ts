import {RequestOptions} from "@/typings";
import { request } from 'umi';

export const getCurrentUser = async(options?: RequestOptions)=> {
  return request<API.CurrentUser>('/api/users/currentUser', {
    method: 'GET',
    ...(options || {}),
  });
}


export const getNationList = async() => {
  return request<string[]>('/api/nation/list', {
    method: 'GET',
  });
}
