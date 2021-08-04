import useBook from '@/models/useBook';
import {useEffect} from 'react';

interface Params {
  id: number
}

const useBookLogic = (params: Params) => {
  const bookService = useBook({});
  useEffect(() => {
    bookService.getBookService.run({id: params.id});
  },[]);
  return {...bookService}
};

export default useBookLogic;
