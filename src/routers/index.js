export default [{
  path: '/',
  redirect: '/ex/overview'
}, {
  path: '/login',
  name: 'login',
  component: resolve => require(['../views/Login.vue'], resolve),
  meta: { title: '开通金融-交易所产品管理系统', needLogin: false }
}, {
  path: '/ex',
  name: 'ex',
  redirect: 'ex/overview',
  component: resolve => require(['../views/ExLayout.vue'], resolve),
  children: [{
    path: 'overview',
    name: 'overview',
    component: resolve => require(['../views/product_management/Overview.vue'], resolve)
  }, {
    path: 'asset_list',
    name: 'AssetList',
    component: resolve => require(['../views/asset_management/AssetList.vue'], resolve)
  }, {
    path: 'asset_detail/:id',
    name: 'AssetDetail',
    component: resolve => require(['../views/asset_management/AssetDetail.vue'], resolve)
  }, {
    path: 'asset/:id',
    name: 'AssetForm',
    component: resolve => require(['../views/asset_management/AssetForm.vue'], resolve)
  }]
}]
