import useStatistics from "@/models/useStatistics";
import {useEffect,useState} from 'react';
import moment from 'moment';

export const useStatisticsLogic = () => {
  const {getStatisticsService, statisticsMap,getStatisticsByTimeListService,statisticsByTimeList} = useStatistics();

  const [formDate,setFormData] = useState<API.Statistics.StatisticsByTimeListPrams>({timeUnit:'day', timeQuantum:[moment(Date.now()).startOf('year').format('YYYY-MM-DD'),moment(Date.now()).endOf('year').format('YYYY-MM-DD')]})
  useEffect(() => {
    getStatisticsService.run();
  }, []);

  useEffect(()=>{
    console.log(formDate);
    getStatisticsByTimeListService.run(formDate)
  },[formDate])

  return {getStatisticsService, statisticsMap,getStatisticsByTimeListService,statisticsByTimeList,setFormData};
};

export default useStatisticsLogic;
