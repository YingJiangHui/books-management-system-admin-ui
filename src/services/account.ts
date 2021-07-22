import {request} from "@@/plugin-request/request";
import type {RequestOptions} from "@/typings";



export const logout = async(options?: RequestOptions)=> {
  return request<void>('/api/account/logout', {
    method: 'POST',
    ...(options || {}),
  });
}

export async function login(data: API.LoginParams, options?: RequestOptions) {
  return request<void>('/api/account/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
    ...(options || {}),
  });
}

export async function sign(data: API.SignParams, options?: RequestOptions) {
  return request<void>('/api/account/sign', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
    ...(options || {}),
  });
}
