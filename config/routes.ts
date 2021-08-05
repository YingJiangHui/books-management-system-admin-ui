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
    path: '/statistics',
    name: 'statistics',
    icon: 'BarChart',
    component: './Statistics',
    access: 'canAdmin',
  },
  {
    path: '/welcome',
    name: 'welcome',
    icon: 'smile',
    component: './Welcome',
    hideInMenu: true
  },
  {
    hideInMenu: true,
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
    icon: 'read',
    component: './Books',
    access: 'canUser',
  },
  {
    name:'book',
    path: '/books/:id',
    component: "./Books/Book",
    hideInMenu: true,
  },
  {
    path: '/borrow-book-management',
    name: 'borrowBook',
    icon: 'UnorderedList',
    component: './BorrowBook',
    access: 'canAdmin',
  },
  {
    path: '/borrow-book',
    name: 'readerBorrowed',
    icon: 'paperClip',
    component: './ReaderBorrowed',
    access: 'canUser',
  },
  {
    path: '/',
    redirect: '/account',
    hideInMenu: true
  },
  {
    component: './404'
  }
];
