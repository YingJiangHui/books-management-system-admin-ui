declare namespace API {
  type SignParams = {
    username: string;
    password: string;
    confirmPassword: string;
    nationId: number;
    email: string;
  };

  type LoginParams = {
    username: string;
    password: string;
  };

  type LoginResult =
    | {
        statusCode: number;
        message: string;
      }
    | {};

  type CurrentUser = {
    username: string;
    roles?: ('user' | 'admin')[];
    email?: string;
    nation?: string;
  };

  type Nation = {
    name: string;
    id: number;
  };

  type ErrorData = {
    error: string;
    message: { field: string; subErrors: string[] }[];
    statusCode: number;
  };

  interface Category {
    id: number;
    name: string;
  }

  interface Publisher {
    id: number;
    name: string;
  }

  type BookBaseInfo = {
    name: string;
    imagePath?: string;
    description?: string;
    author: string;
    publisher: Publisher;
    categories: Category[];
  };

  interface Book extends BookBaseInfo {
    id: number;
    publicationDate?: string;
  }

  type BookBaseParams = {
    name: string;
    imagePath?: string;
    description?: string;
    author: string;
    publisher: number;
    categories: number[];
  }

  interface BorrowBook {
    id: number
    userId: string
    bookId: string
    status: BorrowBook.status;
    endDate: string;
    startedDate: string;
  }

  declare namespace BorrowBook{
    type OccupiedTime = {startedDate: string,endDate:string}

    interface BaseParams {
      status: status;
      endDate: string;
      startedDate: string;
    }

    type status = 'APPLIED'|'BORROWED'|'RETURNED'|'RESERVED'|'LOST'

    type DeletePrams = {
      id: number
    }

    type GetsParams = {
      bookId?: number,
      status?: status
    }
    type GetParams = {
      id: number
    }

    interface CreateParams extends BaseParams{
      status?: status
      bookId: number
    }

    interface UpdateParams extends Partial<BaseParams>{
      id: number
    }
  }

  declare namespace Book {
    type AddParams = Partial<BookBaseParams>
    interface UpdateParams extends Partial<BookBaseParams> {
      id: number;
    }

    interface DeleteParams {
      id: number|string;
    }

    interface GetParams {
      id?: number;
      searchText?: string;
      categoryId?: number;
    }
  }
}
