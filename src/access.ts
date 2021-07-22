/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
export default function access(initialState: { currentUser?: API.CurrentUser | undefined }) {
  const { currentUser } = initialState || {};
  return {
    canAdmin: currentUser && currentUser.roles.includes(API.Roles.Admin),
    canUser: currentUser && currentUser.roles.includes(API.Roles.User),
  };
}
