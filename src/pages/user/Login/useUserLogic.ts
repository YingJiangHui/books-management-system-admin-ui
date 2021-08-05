import {login, sign,sendCode} from "@/services/account";
import {useRequest} from "umi";
import {getNationList} from "@/services/user";
import {useEffect, useState} from "react";
import {useHttpErrorHandler} from "@/hooks/useHttpErrorHandler";

interface Params {
  onSuccessForLogin?: () => void
  onSuccessForSign?: () => void
  onSuccessSendCode?: () => void
}

export const useUserLogic = (params: Params = {}) => {

  const [type, setType] = useState<"login" | "sign">('login');
  const {onSuccessForLogin, onSuccessForSign,onSuccessSendCode} = params;
  const [nationList, setNationList] = useState<API.Nation[]>([]);
  const {setErrorData, resetErrorData,Alert} = useHttpErrorHandler();
  const [delayTime,setDelayTime] = useState(0)
  const sendCodeService = useRequest(sendCode,{
    debounceInterval: 500,
    manual: true,
    onSuccess:()=>{
      setDelayTime(60)
      onSuccessSendCode?.()
    },
    onError:(e)=>{
      setErrorData(e.data);
    }
  })
  useEffect(()=>{
    if(delayTime<1){
      return ;
    }
    setTimeout(()=>{
      setDelayTime(time=>time-1)
    },1000)
  },[delayTime])

  const loginService = useRequest(login, {
    debounceInterval:500,
    manual:true,
    onSuccess: () => {
      onSuccessForLogin?.();
      resetErrorData();
    },
    onError: (e) => {
      setErrorData(e.data);
    },
  });
  const signService = useRequest(sign, {
    debounceInterval:500,
    manual:true,
    onSuccess: () => {
      onSuccessForSign?.();
      resetErrorData();
    },
    onError: (e) => {
      setErrorData(e.data);
    },
  });
  const nationListService = useRequest(getNationList, {
    onSuccess: (response) => {
      setNationList(response);
    }
  });
  useEffect(()=>{
    resetErrorData()
  },[type])
  return {loginService, signService, nationListService, nationList,Alert,type, setType,sendCodeService,delayTime};
};
