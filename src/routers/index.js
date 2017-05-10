export default [{
  path: '/',
  redirect: '/ex/overview'
}, {
  path: '/login',
  name: 'login',
  component: resolve => require(['../views/Login.vue'], resolve),
  meta: { title: '开通金融-交易所产品管理系统-登录', needLogin: false }
}, {
  path: '/ex',
  name: 'ex',
  redirect: 'ex/overview',
  component: resolve => require(['../views/ExLayout.vue'], resolve),
  children: [{
    path: 'overview',
    name: 'overview',
    component: resolve => require(['../views/product_management/Overview.vue'], resolve),
    meta: {
      title: '开通金融-交易所产品管理系统-今日总览',
      needLogin: true,
      crumbs: [{
        name: '产品管理',
        to: { name: 'ex' }
      }, {
        name: '今日总览',
        to: { name: 'overview' }
      }]
    }
  }, {
    path: 'register_product_list',
    name: 'RegisterProductList',
    component: resolve => require(['../views/product_management/RegisterProduct.vue'], resolve),
    meta: {
      title: '开通金融-交易所产品管理系统-登记产品列表',
      needLogin: true,
      crumbs: [{
        name: '产品管理',
        to: { name: 'ex' }
      }, {
        name: '登记产品列表',
        to: { name: 'RegisterProductList' }
      }]
    }
  }, {
    path: 'product_list',
    name: 'ProductList',
    component: resolve => require(['../views/product_management/ProductList.vue'], resolve),
    meta: {
      title: '开通金融-交易所产品管理系统-产品列表',
      needLogin: true,
      crumbs: [{
        name: '产品管理',
        to: { name: 'ex' }
      }, {
        name: '产品列表',
        to: { name: 'ProductList' }
      }]
    }
  }, {
    path: 'asset_list',
    name: 'AssetList',
    component: resolve => require(['../views/asset_management/AssetList.vue'], resolve),
    meta: {
      title: '开通金融-交易所产品管理系统-资产列表',
      needLogin: true,
      crumbs: [{
        name: '资产管理',
        to: { name: 'AssetList' }
      }, {
        name: '资产列表',
        to: { name: 'AssetList' }
      }]
    }
  }, {
    path: 'asset_detail/:id',
    name: 'AssetDetail',
    component: resolve => require(['../views/asset_management/AssetDetail.vue'], resolve),
    meta: {
      title: '开通金融-交易所产品管理系统-资产详情',
      needLogin: true,
      crumbs: [{
        name: '资产管理',
        to: { name: 'AssetList' }
      }, {
        name: '资产列表',
        to: { name: 'AssetList' }
      }, {
        id: 'assetName',
        name: '资产详情',
        to: { name: 'AssetDetail' }
      }]
    }
  }, {
    path: 'asset/:id',
    name: 'AssetForm',
    component: resolve => require(['../views/asset_management/AssetForm.vue'], resolve),
    meta: {
      title: '开通金融-交易所产品管理系统-资产编辑',
      needLogin: true,
      crumbs: [{
        name: '资产管理',
        to: { name: 'AssetList' }
      }, {
        name: '资产列表',
        to: { name: 'AssetList' }
      }, {
        id: 'assetName',
        name: '新增资产',
        to: { name: 'AssetForm' }
      }]
    }
  }, {
    path: 'inst_list',
    name: 'InstList',
    component: resolve => require(['../views/inst_management/InstList.vue'], resolve),
    meta: {
      title: '开通金融-交易所产品管理系统-机构列表',
      needLogin: true,
      crumbs: [{
        name: '机构管理',
        to: { name: 'InstList' }
      }, {
        name: '机构列表',
        to: { name: 'InstList' }
      }]
    }
  }, {
    path: 'inst_detail/:id',
    name: 'InstDetail',
    component: resolve => require(['../views/inst_management/InstDetail.vue'], resolve),
    meta: {
      title: '开通金融-交易所产品管理系统-机构详情',
      needLogin: true,
      crumbs: [{
        name: '机构管理',
        to: { name: 'InstList' }
      }, {
        name: '机构列表',
        to: { name: 'InstList' }
      }, {
        id: 'instName',
        name: '机构详情',
        to: { name: 'InstDetail' }
      }]
    }
  }, {
    path: 'inst/:id',
    name: 'InstForm',
    component: resolve => require(['../views/inst_management/InstForm.vue'], resolve),
    meta: {
      title: '开通金融-交易所产品管理系统-机构编辑',
      needLogin: true,
      crumbs: [{
        name: '机构管理',
        to: { name: 'InstList' }
      }, {
        name: '机构列表',
        to: { name: 'InstList' }
      }, {
        id: 'instName',
        name: '新增机构',
        to: { name: 'InstForm' }
      }]
    }
  }, {
    path: 'client_list',
    name: 'ClientList',
    component: resolve => require(['../views/client_management/ClientList.vue'], resolve),
    meta: {
      title: '开通金融-交易所产品管理系统-客户列表',
      needLogin: true,
      crumbs: [{
        name: '客户管理',
        to: { name: 'ClientList' }
      }, {
        name: '客户列表',
        to: { name: 'ClientList' }
      }]
    }
  }, {
    path: 'account_list',
    name: 'AccountList',
    component: resolve => require(['../views/account_management/AccountList.vue'], resolve),
    meta: {
      title: '开通金融-交易所产品管理系统-账户列表',
      needLogin: true,
      crumbs: [{
        name: '账户管理',
        to: { name: 'AccountList' }
      }, {
        name: '账户列表',
        to: { name: 'AccountList' }
      }]
    }
  }]
}]
