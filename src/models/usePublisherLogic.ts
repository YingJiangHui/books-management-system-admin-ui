import {useRequest} from "@@/plugin-request/request";
import { useState } from "react";
import {queryGetPublisher} from "@/services/publisher";

export interface UsePublisherLogic {

}
export const usePublisherLogic  = (params: UsePublisherLogic={})=>{

  const [publisherList,setPublisherList] = useState<API.Publisher[]>([])

  const getPublisherService = useRequest(queryGetPublisher,{
    manual:false,
    onSuccess:(response)=>{
      setPublisherList(response)
    }
  })
  return {
    getPublisherService,
    publisherList
  }
}

export default usePublisherLogic
