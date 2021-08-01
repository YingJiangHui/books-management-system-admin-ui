import {ModalForm, ProFormDateRangePicker } from '@ant-design/pro-form';
import type {FC} from 'react';
import moment from 'moment';

interface Props {
  trigger?: JSX.Element;
  occupiedTimeList?: API.BorrowBook.OccupiedTime[];
  onFinish: (dataForm: BorrowBookFormFieldMap) => Promise<void>
}
export type BorrowBookFormFieldMap = {occupiedTime: [string,string]}
const BorrowBookFormModal: FC<Props> = (props) => {

  const {trigger,occupiedTimeList,onFinish} = props

  return (<ModalForm<BorrowBookFormFieldMap> trigger={trigger} modalProps={{title: '填写借阅信息',width:350}} onFinish={onFinish}>
    <ProFormDateRangePicker name="occupiedTime" label="选择时间范围" fieldProps={{
      disabledDate: (current)=>{
        if(current&&(current < moment().endOf('day')||current > moment().add(3,'months').endOf('day')))
          return true
        return occupiedTimeList?.filter((occupiedTime)=>
          (moment(occupiedTime.startedDate).isBefore(current)&&moment(current).isBefore(occupiedTime.endDate))).length !== 0
      }
    }}/>
  </ModalForm>);
};

export default BorrowBookFormModal;
