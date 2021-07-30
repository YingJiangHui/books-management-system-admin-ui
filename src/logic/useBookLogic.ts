import {useRequest} from "@@/plugin-request/request";
import {queryAddBooks, queryDeleteBooks, queryGetBooks, queryUpdateBooks} from "@/services/book";
import { useState } from "react";
import usePublisherLogic from "@/logic/usePublisherLogic";
import useCategoryLogic from "@/logic/useCategoryLogic";

export interface UseBookParams{
  data: API.Book
}
export const useBookLogic  = (params: UseBookParams)=>{
  const {id} = params
  const [bookList,setBookList] = useState<API.Book[]>([])
  const {getPublisherService,publisherList} = usePublisherLogic()
  const {getCategoriesService,categoryList} = useCategoryLogic()
  const getBooksService = useRequest(queryGetBooks,{
    manual:false,
    onSuccess:(response)=>{
      setBookList(response)
    }
  })

  const updateBooksService = useRequest(queryUpdateBooks,{
    manual:true,
    onSuccess:()=>{
    }
  })
  const addBooksService = useRequest(queryAddBooks,{
    manual:true,
    onSuccess:()=>{
    }
  })
  const deleteBooksService = useRequest(queryDeleteBooks,{
    manual:true,
    onSuccess:()=>{

    }
  })

  return {
    getBooksService,
    updateBooksService,
    addBooksService,
    deleteBooksService,
    getPublisherService,
    getCategoriesService,
    bookList,
    publisherList,
    categoryList
  }
}

export default useBookLogic
