import useBorrowBook from "@/models/useBorrowBook";
import { message } from "antd";
import { useEffect } from "react";

export const useReaderBorrowedLogic = ()=>{
  const borrowBookService = useBorrowBook({
    onUpdateBorrowBookServiceSuccess: () => {
      message.success('操作成功')
      borrowBookService.getListForUserService.run();
    }
  });
  useEffect(() => {
    borrowBookService.getListForUserService.run();
  }, []);
  return {borrowBookService};
}
export default useReaderBorrowedLogic
