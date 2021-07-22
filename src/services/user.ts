import {RequestOptions} from "@/typings";
import {request} from "@@/plugin-request/request";

export const getCurrentUser = async(options?: RequestOptions)=> {
  return request<API.CurrentUser>('/api/users/currentUser', {
    method: 'GET',
    ...(options || {}),
  });
}
