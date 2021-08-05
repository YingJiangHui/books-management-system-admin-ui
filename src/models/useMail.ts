import {useRequest} from '@@/plugin-request/request';
import {sendCode} from '@/services/account';
import {useEffect,useState} from 'react';
import {useHttpErrorHandler} from "@/hooks/useHttpErrorHandler";

interface Params {
  onSuccessSendCode?: () => void
  onErrorSendCode?: (e: Error) => void
}

const useMail = (params: Params) => {
  const {onSuccessSendCode,onErrorSendCode} = params;
  const [delayTime,setDelayTime] = useState(0);
  const {setErrorData,resetErrorData,Alert} = useHttpErrorHandler()
  const sendCodeService = useRequest(sendCode,{
    debounceInterval: 500,
    manual: true,
    onSuccess: () => {
      setDelayTime(60)
      onSuccessSendCode?.();
      resetErrorData()
    },
    onError: (e) => {
      setErrorData(e.data)
      setDelayTime(0)
      onErrorSendCode?.(e);
    }
  });

  useEffect(() => {
    if (delayTime < 1)
      return () => {};

    const timer = setTimeout(() => {
      setDelayTime(time => time - 1);
    },1000);

    return () => {
      clearTimeout(timer);
    };
  },[delayTime]);

  return {sendCodeService, delayTime,Alert};
};
export default useMail;
