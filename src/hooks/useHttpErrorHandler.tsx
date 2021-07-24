import {useMemo, useState } from "react"
import {Alert as UmiAlert, Tabs} from 'antd';

export const useHttpErrorHandler = ()=>{
  const [errorData,setErrorData] = useState<API.ErrorDataFor404|null>();
  const Alert = useMemo(()=>(  errorData&&errorData.statusCode===400&&<UmiAlert
    style={{
    marginBottom: 24,
  }}
  message={errorData?.message.map(message=>message.subErrors.join(',')).join(',')}
  type="error"
  showIcon
  />),[errorData])
  const resetErrorData = ()=>{
    setErrorData(null)
  }
  return {setErrorData,resetErrorData,Alert}
}
