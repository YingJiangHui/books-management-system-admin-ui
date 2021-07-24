declare namespace API {

  type SignParams = {
    username: string,
    password: string,
    confirmPassword: string,
    nationId: number,
    email: string,
  }

  type LoginParams = {
    username: string,
    password: string,
  }

  type LoginResult = {
    statusCode: number,
    message: string
  } | {}

  type CurrentUser = {
    username: string,
    roles: ('user' | 'admin')[],
    email: string,
    nation: string,
  }

  type Nation = {
    name: string,
    id: number
  }

  type ErrorData = {
    error: string
    message: {field: string, subErrors: string[]}[]
    statusCode: number
  }
}


