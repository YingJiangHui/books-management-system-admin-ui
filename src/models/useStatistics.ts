import {useRequest} from "@@/plugin-request/request";
import {getStatistics} from "@/services/statistics";
import {useState} from "react";

const defaultStatisticsMap = {
  status:[],
  book:[],
  category:[],
  reader:[]
}
export const useStatistics = () => {
  const [statisticsMap, setStatisticsMap] = useState<API.Statistics>(defaultStatisticsMap);
  const getStatisticsService = useRequest(getStatistics, {
    manual:true,
    onSuccess: (response) => {
      setStatisticsMap(response);
    }
  });

  return {getStatisticsService, statisticsMap};
};
export default useStatistics;
