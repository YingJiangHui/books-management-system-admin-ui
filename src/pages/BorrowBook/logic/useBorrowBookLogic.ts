import useBorrowBook from "@/models/useBorrowBook";
import {useEffect} from "react";

const useBorrowBookLogic = () => {
  const borrowBookService = useBorrowBook({
    onUpdateBorrowBookServiceSuccess: () => {
      borrowBookService.getListService.run();
    }
  });
  useEffect(() => {
    borrowBookService.getListService.run();
  }, []);
  return {borrowBookService};
};
export default useBorrowBookLogic;
