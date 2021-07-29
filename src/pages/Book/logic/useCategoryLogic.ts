import {useRequest} from "@@/plugin-request/request";
import { useState } from "react";
import {queryGetCategories} from "@/services/category";

export interface UseCategoryLogic {
}
export const useCategoryLogic  = (params: UseCategoryLogic={})=>{

  const [categoryList,setCategoryList] = useState<API.Book[]>([])

  const getCategoriesService = useRequest(queryGetCategories,{
    manual:false,
    onSuccess:(response)=>{
      setCategoryList(response)
    }
  })
  return {
    getCategoriesService,
    categoryList
  }
}

export default useCategoryLogic
