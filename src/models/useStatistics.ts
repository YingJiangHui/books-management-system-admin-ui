import {useRequest} from '@@/plugin-request/request';
import {getStatisticsByTimeList,getStatisticsGather} from '@/services/statistics';
import {useState} from 'react';

const defaultStatisticsMap = {
  status: [],
  book: [],
  category: [],
  reader: []
};
export const useStatistics = () => {
  const [statisticsMap,setStatisticsMap] = useState<API.Statistics>(defaultStatisticsMap);
  const [statisticsByTimeList,setStatisticsByTimeList] = useState<API.StatisticsTimeItem[]>([]);

  const getStatisticsService = useRequest(getStatisticsGather,{
    manual: true,
    onSuccess: (response) => {
      setStatisticsMap(response);
    }
  });
  const getStatisticsByTimeListService = useRequest(getStatisticsByTimeList,{
    manual: true,
    onSuccess: (response) => {
      setStatisticsByTimeList(response);
    }
  });
  return {getStatisticsService,getStatisticsByTimeListService,statisticsByTimeList,statisticsMap};
};
export default useStatistics;



