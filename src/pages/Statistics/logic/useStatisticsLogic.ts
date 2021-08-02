import useStatistics from "@/models/useStatistics";
import {useEffect} from "react";

export const useStatisticsLogic = () => {
  const {getStatisticsService, statisticsMap} = useStatistics();
  useEffect(() => {
    getStatisticsService.run();
  }, []);
  return {getStatisticsService, statisticsMap};
};

export default useStatisticsLogic;
