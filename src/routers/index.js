export default [{
  path: '/',
  redirect: '/ex/overview'
}, {
  path: '/login',
  name: 'login',
  component: resolve => require(['@/views/Login.vue'], resolve),
  meta: { title: '开通金融-交易所产品管理系统-登录', needLogin: false }
}, {
  path: '/ex',
  name: 'ex',
  redirect: 'ex/overview',
  component: resolve => require(['@/views/ExLayout.vue'], resolve),
  children: [{
    path: 'overview',
    name: 'overview',
    component: resolve => require(['@/views/product_management/Overview.vue'], resolve),
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
    component: resolve => require(['@/views/product_management/RegisterProduct.vue'], resolve),
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
    component: resolve => require(['@/views/product_management/ProductList.vue'], resolve),
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
    path: 'product_detail/:id',
    name: 'ProductDetail',
    component: reslove => require(['@/views/product_management/ProductDetail.vue'], reslove),
    meta: {
      title: '开通金融-交易所产品管理系统-产品详情',
      needLogin: true,
      crumbs: [{
        name: '产品管理',
        to: {name: 'ex'}
      }, {
        name: '产品详情',
        to: {name: 'ex'}
      }]
    }
  }, {
    path: 'asset_edit/:id',
    name: 'AssetEdit',
    component: resolve => require(['@/views/product_management/AssetEdit.vue'], resolve),
    meta: {
      title: '开通金融-交易所产品管理系统-产品详情',
      needLogin: true,
      crumbs: [{
        name: '产品管理',
        to: {name: 'ex'}
      }, {
        name: '产品列表',
        to: {name: '产品列表'}
      }, {
        id: 'AssetName',
        name: '新增资产',
        to: {name: 'AssetEdit'}
      }]
    }
  }, {
    path: 'asset_list',
    name: 'AssetList',
    component: resolve => require(['@/views/asset_management/AssetList.vue'], resolve),
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
    component: resolve => require(['@/views/asset_management/AssetDetail.vue'], resolve),
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
    component: resolve => require(['@/views/asset_management/AssetForm.vue'], resolve),
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
    component: resolve => require(['@/views/inst_management/InstList.vue'], resolve),
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
    component: resolve => require(['@/views/inst_management/InstDetail.vue'], resolve),
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
    component: resolve => require(['@/views/inst_management/InstForm.vue'], resolve),
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
    component: resolve => require(['@/views/client_management/ClientList.vue'], resolve),
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
    component: resolve => require(['@/views/account_management/AccountList.vue'], resolve),
    meta: {
      title: '开通金融-交易所产品管理系统-资金账户列表',
      needLogin: true,
      crumbs: [{
        name: '账户管理',
        to: { name: 'AccountList' }
      }, {
        name: '资金账户列表',
        to: { name: 'AccountList' }
      }]
    }
  }, {
    path: 'company_account_list',
    name: 'CompanyAccountList',
    component: resolve => require(['@/views/account_management/CompanyAccountList.vue'], resolve),
    meta: {
      title: '开通金融-交易所产品管理系统-公司账户列表',
      needLogin: true,
      crumbs: [{
        name: '账户管理',
        to: { name: 'AccountList' }
      }, {
        name: '公司账户列表',
        to: { name: 'CompanyAccountList' }
      }]
    }
  }, {
    path: 'company_account_authority',
    name: 'CompanyAccountAuthority',
    component: resolve => require(['@/views/account_management/CompanyAccountAuthority.vue'], resolve),
    meta: {
      title: '开通金融-交易所产品管理系统-公司账户权限',
      needLogin: true,
      crumbs: [{
        name: '账户管理',
        to: { name: 'AccountList' }
      }, {
        name: '公司账户权限',
        to: { name: 'CompanyAccountAuthority' }
      }]
    }
  }, {
    path: 'setting',
    name: 'Setting',
    component: resolve => require(['@/views/account_management/Setting.vue'], resolve),
    meta: {
      title: '开通金融-交易所产品管理系统-个人设置',
      needLogin: true,
      crumbs: [{
        name: '账户管理',
        to: { name: 'AccountList' }
      }, {
        name: '个人设置',
        to: { name: 'Setting' }
      }]
    }
  }, {
    path: 'log_list',
    name: 'LogList',
    component: resolve => require(['@/views/log/LogList.vue'], resolve),
    meta: {
      title: '开通金融-交易所产品管理系统-行为日志',
      needLogin: true,
      crumbs: [{
        name: '行为日志',
        to: { name: 'LogList' }
      }, {
        name: '行为日志',
        to: { name: 'LogList' }
      }]
    }
  }, {
    path: 'approvement',
    name: 'Approvement',
    component: resolve => require(['@/views/approve_management/Approvement.vue'], resolve),
    meta: {
      title: '开通金融-交易所产品管理系统-审批管理',
      needLogin: true,
      crumbs: [{
        name: '审批管理',
        to: { name: 'Approvement' }
      }, {
        name: '审批管理',
        to: { name: 'Approvement' }
      }]
    }
  }]
}]
