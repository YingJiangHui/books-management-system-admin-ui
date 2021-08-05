import {
  AlipayCircleOutlined,
  LockOutlined,
  MailOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {Alert,Col,message,Row,Tabs} from 'antd';
import React, {useState} from 'react';
import ProForm, {ProFormSelect, ProFormText} from '@ant-design/pro-form';
import {useIntl, Link, FormattedMessage, SelectLang, useModel, history} from 'umi';
import Footer from '@/components/Footer';
import {login, sign} from "@/services/account";
import styles from './index.less';
import {Space} from 'antd';
import {useForm} from 'antd/lib/form/Form';
import notification from 'antd/lib/notification';
import { Button } from 'antd';
import {useUserLogic} from "@/pages/user/Login/useUserLogic";

const Login: React.FC = () => {
  const {initialState, setInitialState} = useModel('@@initialState');
  const intl = useIntl();
  const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.();
    if (userInfo) {
      await setInitialState((s) => ({
        ...s,
        currentUser: userInfo,
      }));
    }
  };
  const [form] = useForm<API.SignParams | API.LoginParams>();

  const {loginService, signService, nationList,Alert:ErrorAlert,type, setType,sendCodeService,delayTime} = useUserLogic({
    onSuccessSendCode:()=>{
      message.success('验证码已发往你的邮箱')
    },
    onSuccessForLogin: async()=>{
      await fetchUserInfo();
      form.resetFields()
      if (!history) return;
      const {query} = history.location;
      const {redirect} = query as { redirect: string };
      history.push(redirect || '/');
    },onSuccessForSign:()=>{
      notification.success({
        message: '账号注册成功',
        description:
          '账号注册成功，请使用用户名密码登录登录',
      });
      setType('login')
    }})

  const onFinish = async (values: API.SignParams | API.LoginParams) => {
    if (type === 'login')
      loginService.run(values as API.LoginParams)
    else
      signService.run(values as API.SignParams)
  }
  return (
    <div className={styles.container}>
      <div className={styles.lang} data-lang>
        {SelectLang && <SelectLang/>}
      </div>
      <div className={styles.content}>
        <div className={styles.top}>
          <div className={styles.header}>
            <Link to="/">
              <span className={styles.title}>图书管理系统</span>
            </Link>
          </div>
          <div className={styles.desc}>
            {intl.formatMessage({id: 'pages.layouts.userLayout.title'})}
          </div>
        </div>

        <div className={styles.main}>
          <Tabs activeKey={type} onChange={setType}>
            <Tabs.TabPane
              key="login"
              tab={intl.formatMessage({
                id: 'pages.login.Login.tab',
                defaultMessage: '登录',
              })}
            />
            <Tabs.TabPane
              key="sign"
              tab={intl.formatMessage({
                id: 'pages.login.Sign.tab',
                defaultMessage: '注册',
              })}
            />
          </Tabs>


          <ProForm
            form={form}
            initialValues={{
              autoLogin: true,
            }}
            submitter={{
              searchConfig: {
                submitText: intl.formatMessage({
                  id: type==='sign'?"pages.login.registerAccount":'pages.login.submit',
                  defaultMessage: '登录',
                }),
              },
              render: (_, dom) => dom.pop(),
              submitButtonProps: {
                loading: signService.loading||loginService.loading,
                size: 'large',
                style: {
                  width: '100%',
                },
              },
            }}
            onFinish={onFinish}
          >
            {ErrorAlert}
            <>

              <ProFormText
                name="username"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined className={styles.prefixIcon}/>,
                }}
                placeholder="请输入用户名"
                rules={[
                  {
                    required: true,
                    message: (
                      <FormattedMessage
                        id="pages.login.username.required"
                        defaultMessage="请输入用户名!"
                      />
                    ),
                  },
                ]}
              />
              <ProFormText.Password
                name="password"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={styles.prefixIcon}/>,
                }}
                placeholder="请输入密码"
                rules={[
                  {
                    required: true,
                    message: (
                      <FormattedMessage
                        id="pages.login.password.required"
                        defaultMessage="请输入密码！"
                      />
                    ),
                  },
                ]}
              />
              {type === 'sign' && (
                <>
                  <ProFormText.Password
                    name="confirmPassword"
                    fieldProps={{
                      size: 'large',
                      prefix: <LockOutlined className={styles.prefixIcon}/>,
                    }}
                    placeholder="再次输入密码"
                    rules={[
                      {
                        required: true,
                        message: (
                          <FormattedMessage
                            id="pages.login.password.required"
                            defaultMessage="再次输入密码！"
                          />
                        ),
                      },
                    ]}
                  />
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
                        }} disabled={Boolean(delayTime)}>{delayTime?(delayTime+'s'):''} 发送验证码</Button>
                      </Col>

                    </Row>
                  <ProFormSelect options={nationList.map((item) => ({value: item.id, label: item.name}))}
                                 fieldProps={{size: 'large'}} placeholder="选择你的民族"
                                 rules={[{required: true, message: '请选择你的民族！'}]} name="nationId"/>
                </>
              )}
            </>
          </ProForm>
          {/*<Space className={styles.other}>*/}
          {/*  <FormattedMessage id="pages.login.loginWith" defaultMessage="其他登录方式"/>*/}
          {/*  <AlipayCircleOutlined className={styles.icon}/>*/}
          {/*</Space>*/}
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Login;
