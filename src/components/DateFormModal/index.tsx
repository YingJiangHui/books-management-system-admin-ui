import {ModalForm,ProFormDatePicker,ProFormDateRangePicker,ProFormText} from '@ant-design/pro-form';
import type {FC, ReactNode} from 'react';
import moment from 'moment';
import type {ModalProps} from 'antd';
import {MailOutlined} from '@ant-design/icons';
import {Button,Col,Row} from 'antd';
import {useForm} from 'antd/es/form/Form';
import useMail from '@/models/useMail';

interface Props {
  trigger?: JSX.Element;
  occupiedTimeList?: API.BorrowBook.OccupiedTime[];
  onFinish: (dataForm: BorrowBookFormFieldMap) => Promise<void>
  modalProps?: Omit<ModalProps,'visible'>
  isRange?: boolean
  Alert?: ReactNode
}

export type BorrowBookFormFieldMap = {endDate?: string,dateRange?: [string,string]}
const BorrowDateFormModal: FC<Props> = (props) => {
  const {sendCodeService,delayTime,Alert}=useMail({})
  const {trigger,occupiedTimeList,onFinish,modalProps,isRange = false} = props;
  const [form] = useForm()
  const disabledDate = (current: moment.Moment) => {
    if (current && (current < moment().endOf('day') || current > moment().add(3,'months').endOf('day')))
      return true;
    return occupiedTimeList?.filter((occupiedTime) =>
      (moment(occupiedTime.startedDate).isBefore(current) && moment(current).isBefore(occupiedTime.endDate))).length !== 0;
  };
  return (<ModalForm<BorrowBookFormFieldMap> form={form} trigger={trigger} modalProps={{title: '填写借阅信息',width: 420,...modalProps}}
                                             onFinish={onFinish}>
    {isRange ? (<>
        {props.Alert||Alert}
        <ProFormDateRangePicker width={'xl'} tooltip='从今天到你选择的还书日期' name={'dateRange'}
                                rules={[{required: true,message: '请选择借阅日期的范围'}]} label={'选择日期范围'}
                                fieldProps={{disabledDate}}/>
        <ProFormText fieldProps={{size: 'large', prefix: <MailOutlined style={{color:"#1890ff"}} />}}
                     placeholder="填写你的邮箱" name="email"
                     rules={[{required: true,message: '请填写邮箱'}]}
        />
        <Row>
          <Col span={14}>
            <ProFormText fieldProps={{size: 'large'}}
                         rules={[{required: true,message: '请填验证码'}]}
                         placeholder="输入验证码" name="code"/>
          </Col>
          <Col span={9} offset={1} style={{textAlign:'right'}}>
            <Button size='large' onClick={()=>{
              sendCodeService.run({email: form.getFieldValue('email')})
            }} disabled={Boolean(delayTime)}>{delayTime?(`${delayTime}s`):''} 发送验证码</Button>
          </Col>

        </Row>
      </>)
      : (<>
        <ProFormDatePicker width={'xl'} tooltip='预约一个借阅的日期范围，其他用户无法在你预约的时段借阅' name={'endDate'} rules={[{required: true,message: '请选择还书日期'}]} label={'选择还书日期'} fieldProps={{disabledDate}}/>

      </>)
    }
  </ModalForm>);
};

export default BorrowDateFormModal;
