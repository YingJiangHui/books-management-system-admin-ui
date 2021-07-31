import useBook from "@/logic/useBook";

export const useBookLogic = ()=>{
  const bookService = useBook({})
  return {...bookService}
}

export default useBookLogic
