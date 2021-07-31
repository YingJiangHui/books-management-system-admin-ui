import {ModalForm, ProFormDatePicker } from '@ant-design/pro-form';
import type {FC} from 'react';

interface Props {
  trigger?: JSX.Element
}

const BorrowBookFormModal: FC<Props> = (props) => {
  const {trigger} = props
  return (<ModalForm trigger={trigger} modalProps={{title: '填写借阅信息',width:350}}>
    <ProFormDatePicker label="选择时间范围:"/>
  </ModalForm>);
};

export default BorrowBookFormModal;
