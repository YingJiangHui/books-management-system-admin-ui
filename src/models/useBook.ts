import {useRequest} from "@@/plugin-request/request";
import {queryAddBooks,queryDeleteBook,queryGetBook,queryGetBookList,queryUpdateBooks} from '@/services/book';
import { useState } from "react";
import usePublisherLogic from "@/models/usePublisherLogic";
import useCategoryLogic from "@/models/useCategoryLogic";

export interface UseBookParams{
}
export const useBook  = (params: UseBookParams)=>{
  const [bookList,setBookList] = useState<API.Book[]>([])
  const [book,setBook] = useState<API.Book>({})

  const {getPublisherService,publisherList} = usePublisherLogic()
  const {getCategoriesService,categoryList} = useCategoryLogic()
  const getBooksService = useRequest(queryGetBookList,{
    manual: true,
    onSuccess:(response)=>{
      setBookList(response)
    }
  })

  const getBookService = useRequest(queryGetBook,{
    manual: true,
    onSuccess:(response)=>{
      setBook(response)
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
  const deleteBooksService = useRequest(queryDeleteBook,{
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
    categoryList,
    getBookService,
    book
  }
}

export default useBook
