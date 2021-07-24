import {useMemo, useState} from "react";
import {Alert as UmiAlert} from 'antd';

export const useHttpErrorHandler = () => {
  const [errorData, setErrorData] = useState<API.ErrorData | null>();

  const statusCode = useMemo(() => (errorData?.statusCode), []);
  const message = useMemo(() => ({
    400: ()=>errorData?.message.map(m => m.subErrors.join(',')).join(','),
    401: ()=>"用户名或密码错误"
  }), [errorData]);
  const Alert = useMemo(() => (errorData && statusCode && <UmiAlert
    style={{
      marginBottom: 24,
    }}
    message={message[statusCode]()}
    type="error"
    showIcon
  />), [errorData]);
  const resetErrorData = () => {
    setErrorData(null);
  };
  return {setErrorData, resetErrorData, Alert};
};
