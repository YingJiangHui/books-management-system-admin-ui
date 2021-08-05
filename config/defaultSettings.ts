import { Settings as LayoutSettings } from '@ant-design/pro-layout';
const path = require('path')
const logoPath = path.join(__dirname,'../public/book.png')
console.log(logoPath)
const Settings: LayoutSettings & {
  pwa?: boolean;
  logo?: string;
} = {
  navTheme: 'light',
  // 拂晓蓝
  primaryColor: '#1890ff',
  layout: 'mix',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: true,
  colorWeak: false,
  title: '图书管理系统',
  pwa: false,
  logo: logoPath,
  iconfontUrl: '',
};

export default Settings;
