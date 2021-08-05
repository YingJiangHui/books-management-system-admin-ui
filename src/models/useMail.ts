import {useRequest} from '@@/plugin-request/request';
import {sendCode} from '@/services/account';
import {useEffect,useState} from 'react';

interface Params {
  onSuccessSendCode?: () => void
  onErrorSendCode?: (e: Error) => void
}

const useMail = (params: Params) => {
  const {onSuccessSendCode,onErrorSendCode} = params;
  const [delayTime,setDelayTime] = useState(0);

  const sendCodeService = useRequest(sendCode,{
    debounceInterval: 500,
    manual: true,
    onSuccess: () => {
      setDelayTime(60)
      onSuccessSendCode?.();
    },
    onError: (e) => {
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

  return {sendCodeService, delayTime};
};
export default useMail;
