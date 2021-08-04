export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './user/Login'
          }
        ]
      }
    ]
  },
  {
    path: '/account',
    name: 'account',
    icon: 'user',
    component: './Account'
  },
  {
    path: '/welcome',
    name: 'welcome',
    icon: 'smile',
    component: './Welcome'
  },
  {
    path: '/admin',
    name: 'admin',
    icon: 'crown',
    access: 'canAdmin',
    component: './Admin',
    routes: [
      {
        path: '/admin/sub-page',
        name: 'sub-page',
        icon: 'smile',
        component: './Welcome'
      }
    ]
  },
  {
    path: '/book-management',
    name: 'bookManagement',
    icon: 'book',
    component: './BookManagement',
    access: 'canAdmin',
  },
  {
    path: '/books',
    name: 'books',
    icon: 'book',
    component: './Books',
  },
  {
    name:'book',
    path: '/books/:id',
    component: "./Books/Book",
    hideInMenu: true,
  },
  {
    path: '/statistics',
    name: 'statistics',
    icon: 'dotChart',
    component: './Statistics'
  },
  {
    path: '/borrow-book',
    name: 'borrowBook',
    icon: 'read',
    component: './BorrowBook'
  },
  {
    path: '/reader-borrowed',
    name: 'readerBorrowed',
    icon: 'read',
    component: './ReaderBorrowed'
  },
  {
    path: '/',
    redirect: '/welcome'
  },
  {
    component: './404'
  }
];
