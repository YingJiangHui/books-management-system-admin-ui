import useBorrowBook from "@/models/useBorrowBook";
import { useEffect } from "react";

export const useReaderBorrowedLogic = ()=>{
  const borrowBookService = useBorrowBook({
    onUpdateBorrowBookServiceSuccess: () => {
      borrowBookService.getListForUserService.run();
    }
  });
  useEffect(() => {
    borrowBookService.getListForUserService.run();
  }, []);
  return {borrowBookService};
}
export default useReaderBorrowedLogic
