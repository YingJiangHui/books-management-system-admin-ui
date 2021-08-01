import {ModalForm, ProFormDateRangePicker } from '@ant-design/pro-form';
import type {FC} from 'react';
import moment from 'moment';
import { ModalProps } from 'antd';

interface Props {
  trigger?: JSX.Element;
  occupiedTimeList?: API.BorrowBook.OccupiedTime[];
  onFinish: (dataForm: BorrowBookFormFieldMap) => Promise<void>
  modalProps?: Omit<ModalProps, "visible">
}
export type BorrowBookFormFieldMap = {occupiedTime: [string,string]}
const BorrowDateFormModal: FC<Props> = (props) => {

  const {trigger,occupiedTimeList,onFinish,modalProps} = props

  return (<ModalForm<BorrowBookFormFieldMap> trigger={trigger} modalProps={{title: '填写借阅信息',width:350,...modalProps}} onFinish={onFinish}>
    <ProFormDateRangePicker name="occupiedTime" rules={[{required:true,message:'请填写日期'}]} label="选择日期" fieldProps={{
      disabledDate: (current)=>{
        if(current&&(current < moment().endOf('day')||current > moment().add(3,'months').endOf('day')))
          return true
        return occupiedTimeList?.filter((occupiedTime)=>
          (moment(occupiedTime.startedDate).isBefore(current)&&moment(current).isBefore(occupiedTime.endDate))).length !== 0
      }
    }}/>
  </ModalForm>);
};

export default BorrowDateFormModal;
