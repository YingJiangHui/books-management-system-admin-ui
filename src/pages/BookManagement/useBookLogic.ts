import useBook from "@/models/useBook";

export const useBookLogic = ()=>{
  const bookService = useBook({})
  return {...bookService}
}

export default useBookLogic
