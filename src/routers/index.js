export default [{
  path: '/',
  redirect: '/ex/overview'
}, {
  path: '/login',
  name: 'login',
  component: reslove => require(['../views/Login.vue'], reslove),
  meat: { title: '开通金融-交易所产品管理系统', needLogin: false }
}, {
  path: '/ex',
  name: 'ex',
  // redirect: 'ex/overview',
  component: reslove => require(['../views/ExLayout.vue'], reslove),
  children: [{
    path: 'overview',
    name: 'overview',
    component: reslove => require(['../views/product_management/Overview.vue'], reslove)
  }]
}]
