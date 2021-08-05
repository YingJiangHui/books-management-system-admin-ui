import {ModalForm,ProFormDatePicker,ProFormDateRangePicker,ProFormText} from '@ant-design/pro-form';
import type {FC} from 'react';
import moment from 'moment';
import type {ModalProps} from 'antd';
import {MailOutlined} from '@ant-design/icons';
import styles from '@/pages/user/Login/index.less';
import {Button,Col,Row} from 'antd';
import React from 'react';
import {useForm} from 'antd/es/form/Form';
import useMail from '@/models/useMail';

interface Props {
  trigger?: JSX.Element;
  occupiedTimeList?: API.BorrowBook.OccupiedTime[];
  onFinish: (dataForm: BorrowBookFormFieldMap) => Promise<void>
  modalProps?: Omit<ModalProps,'visible'>
  isRange?: boolean
}

export type BorrowBookFormFieldMap = {endDate?: string,dateRange?: [string,string]}
const BorrowDateFormModal: FC<Props> = (props) => {
  const {sendCodeService,delayTime}=useMail({})
  const {trigger,occupiedTimeList,onFinish,modalProps,isRange = false} = props;
  const [form] = useForm()
  const disabledDate = (current: moment.Moment) => {
    if (current && (current < moment().endOf('day') || current > moment().add(3,'months').endOf('day')))
      return true;
    return occupiedTimeList?.filter((occupiedTime) =>
      (moment(occupiedTime.startedDate).isBefore(current) && moment(current).isBefore(occupiedTime.endDate))).length !== 0;
  };
  return (<ModalForm<BorrowBookFormFieldMap> trigger={trigger} modalProps={{title: '填写预约信息',width: 350,...modalProps}}
                                             onFinish={onFinish}>
    {isRange ? (<>
        <ProFormDateRangePicker width={'xl'} tooltip='从今天到你选择的还书日期' name={'dateRange'}
                                rules={[{required: true,message: '请选择借阅日期的范围'}]} label={'选择日期范围'}
                                fieldProps={{disabledDate}}/>
      </>)
      : (<>
        <ProFormDatePicker width={'xl'} tooltip='预约一个借阅的日期范围，其他用户无法在你预约的时段借阅' name={'endDate'} rules={[{required: true,message: '请选择还书日期'}]} label={'选择还书日期'} fieldProps={{disabledDate}}/>
        <ProFormText fieldProps={{size: 'large', prefix: <MailOutlined className={styles.prefixIcon}/>}}
                     placeholder="填写你的邮箱" name="email"/>
        <Row>
          <Col span={14}>
            <ProFormText fieldProps={{size: 'large'}}
                         placeholder="输入验证码" name="code"/>
          </Col>
          <Col span={8} offset={2}>
            <Button size='large' onClick={()=>{
              sendCodeService.run({email: form.getFieldValue('email')})
            }} disabled={Boolean(delayTime)}>{delayTime?(`${delayTime}s`):''} 发送验证码</Button>
          </Col>

        </Row>

      </>)
    }
  </ModalForm>);
};

export default BorrowDateFormModal;
