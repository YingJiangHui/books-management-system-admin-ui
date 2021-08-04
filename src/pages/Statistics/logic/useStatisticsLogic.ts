import useStatistics from "@/models/useStatistics";
import {useEffect,useState} from 'react';
import moment from 'moment';

const timeOfUnitMap = {
  'year':'month',
  'month':'day'
}

export const useStatisticsLogic = () => {
  const {getStatisticsService, statisticsMap,getStatisticsByTimeListService,statisticsByTimeList} = useStatistics();
  const [formDate,setFormData] = useState<API.Statistics.StatisticsByTimeListPrams>({timeUnit:'month'})
  useEffect(() => {
    getStatisticsService.run();
  }, []);

  useEffect(()=>{
    const {timeUnit} = formDate

    if(timeUnit)
      getStatisticsByTimeListService.run({timeUnit:timeOfUnitMap[timeUnit],timeQuantum:[moment(Date.now()).startOf(timeUnit).format('YYYY-MM-DD'),moment(Date.now()).endOf(timeUnit).format('YYYY-MM-DD')]})
  },[formDate])

  return {getStatisticsService, statisticsMap,getStatisticsByTimeListService,statisticsByTimeList,setFormData,formDate};
};

export default useStatisticsLogic;
