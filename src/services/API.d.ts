declare namespace API {

  type SignParams ={
    username: string,
    nation: {name: string,id: number},
    email: string,
    password: string,
    confirmPassword: string,
  }
  type LoginParams ={
    username: string,
    password: string,
  }
  enum Roles {
    Admin = 'admin',
    User = 'user'
  }
  type CurrentUser = {
    username: string,
    roles: ('user'|'admin')[],
    email: string,
    nation: string,
  }
}
