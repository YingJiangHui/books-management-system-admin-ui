import { request } from "umi";



export const getStatistics = async() => {
  return request<API.Statistics>('/api/statistics', {
    method: 'GET',
    getResponse:true
  });
}
