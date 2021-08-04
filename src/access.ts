/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
enum Roles {
  Admin = 'admin',
  User = 'user',
}
export default function access(initialState: { currentUser?: API.CurrentUser | undefined }) {
  const { currentUser } = initialState || {};
  return {
    canAdmin: currentUser && currentUser.roles?.includes(Roles.Admin),
    canUser: currentUser && (currentUser.roles?.includes(Roles.User)||currentUser.roles?.includes(Roles.Admin)),
  };
}
