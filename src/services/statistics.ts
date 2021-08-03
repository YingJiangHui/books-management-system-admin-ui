import { request } from "umi";



export const getStatisticsGather = async() => {
  return request<API.Statistics>('/api/statistics/gather', {
    method: 'GET',
    getResponse:true
  });
}

export const getStatisticsByTimeList = async(params: API.Statistics.StatisticsByTimeListPrams) => {
  return request<API.StatisticsTimeItem[]>('/api/statistics/time', {
    method: 'GET',
    params,
    getResponse:true
  });
}
