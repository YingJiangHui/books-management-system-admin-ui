import {login, sign} from "@/services/account";
import {useRequest} from "umi";
import {getNationList} from "@/services/user";
import {useEffect, useState} from "react";
import {useHttpErrorHandler} from "@/hooks/useHttpErrorHandler";

interface Params {
  onSuccessForLogin?: () => void
  onSuccessForSign?: () => void
}

export const useUserLogic = (params: Params = {}) => {

  const [type, setType] = useState<"login" | "sign">('login');
  const {onSuccessForLogin, onSuccessForSign} = params;
  const [nationList, setNationList] = useState<API.Nation[]>([]);
  const {setErrorData, resetErrorData,Alert} = useHttpErrorHandler();
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
  return {loginService, signService, nationListService, nationList,Alert,type, setType};
};
