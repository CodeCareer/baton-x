export default [{
  path: '/',
  redirect: '/ex/overview'
}, {
  path: '/login',
  name: 'login',
  component: reslove => require(['../views/login.vue'], reslove),
  meat: {title: '开通金融-交易所产品管理系统', needLogin: false}
}, {
  path: '/ex',
  name: 'ex',
  // redirect: 'ex/overview',
  component: reslove => require(['../views/ex-layout.vue'], reslove),
  children: [{
    path: '/overview',
    name: 'overview',
    component: reslove => require(['../views/productManagement/overview.vue'], reslove)
  }]
}]
