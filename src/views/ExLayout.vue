<template lang="pug">
  .ex-content
    n-progress(parent=".ex-content")
    header
      img.logo(src="../assets/images/logo.svg")
      .user-info.fr
        span
          i.icon-batonx.icon-user.icon-color
          | hi，{{user.name}}
        span.log-out(@click="logout()") 退出
    section.container(:style='containerStyles')
      aside
        el-menu(:unique-opened='true', :default-openeds="defaultOpeneds", :default-active="defaultActive", :router='true', ref="menus")
          template(v-for="menu in menus")
            el-submenu(v-if="menu.menus", :index="menu.index", v-show="!menu.hidden")
              template(slot='title')
                i.icon-batonx.icon-color(:class="menu.icon")
                | {{menu.name}}
              el-menu-item( v-for="item in menu.menus", :index='item.index', :route="item.route") {{item.name}}
            el-menu-item(v-else, :index='menu.index', :route="menu.route", v-show="!menu.hidden")
              i.icon-batonx.icon-color(:class="menu.icon")
              | {{menu.name}}
      .body(:style='containerStyles')
        el-breadcrumb
          el-breadcrumb-item(v-for="crumb in crumbs", :to="crumb.to") {{crumb.name}}
        router-view.body-container
        footer
          p(style="margin-bottom: 10px;") 联系电话：010-84554188   京ICP备150220058号-1
          p ©2016 开通金融信息服务（北京）有限公司
</template>

<script>
import {
  Menu,
  Submenu,
  MenuItem,
  Breadcrumb,
  BreadcrumbItem
} from 'element-ui'
import {
  startsWith,
  each,
  every,
  includes,
  find
} from 'lodash'
import NProgress from '@/components/NProgress.vue'
import {
  updateCrumbs
} from '@/common/crossers.js'
import {
  mapGetters,
  mapActions
} from 'vuex'

const headerH = 60 // header高度

export default {
  components: {
    NProgress,
    ElMenu: Menu,
    ElSubmenu: Submenu,
    ElMenuItem: MenuItem,
    ElBreadcrumb: Breadcrumb,
    ElBreadcrumbItem: BreadcrumbItem
  },

  watch: {
    '$route' (to, from) {
      this.breadcrumbRefresh()
    }
  },

  mounted() {
    // 更新面包屑中的占位符
    updateCrumbs.$on('update-crumbs', crumbs => {
      each(crumbs, cr => {
        let co = find(this.crumbs, c => c.id === cr.id)
        if (co) {
          co.name = cr.name
          co.placeholder = ''
        }
      })
    })

    window.addEventListener('resize', e => {
      this.containerStyles.minHeight = `${window.innerHeight - headerH}px`
    })
  },

  created() {
    this.breadcrumbRefresh()
  },

  computed: {
    ...mapGetters(['user'])
  },

  data() {
    const _self = this
    const data = {
      defaultOpeneds: [],
      defaultActive: '',
      crumbs: [],
      menus: [{
        name: '产品管理',
        index: '1',
        icon: 'icon-proman',
        menus: [{
          name: '今日总览',
          index: '1-1',
          route: {
            name: 'overview'
          }
        }, {
          name: '产品列表',
          index: '1-2',
          route: {
            name: 'ProductList'
          }
        }, {
          name: '登记产品列表',
          index: '1-3',
          route: {
            name: 'RegisterProductList'
          }
        }]
      }, {
        name: '资产管理',
        index: '2',
        icon: 'icon-assetman',
        menus: [{
          name: '资产列表',
          index: '2-1',
          route: {
            name: 'AssetList'
          },
          activeIncludes: ['AssetList', 'AssetForm', 'AssetDetail']
        }]
      }, {
        name: '机构管理',
        index: '3',
        icon: 'icon-platformman',
        menus: [{
          name: '机构列表',
          index: '3-1',
          route: {
            name: 'InstList'
          },
          activeIncludes: ['InstList', 'InstForm', 'InstDetail']
        }]
      }, {
        name: '客户管理',
        index: '4',
        icon: 'icon-customer',
        menus: [{
          name: '客户列表',
          index: '4-1',
          route: {
            name: 'ClientList'
          }
        }]
      }, {
        name: '账户管理',
        index: '5',
        icon: 'icon-capitalman',
        menus: [{
          name: '资金账户列表',
          index: '5-1',
          route: {
            name: 'AccountList'
          }
        }, {
          name: '公司账户列表',
          index: '5-2',
          route: {
            name: 'CompanyAccountList'
          }
        }, {
          name: '公司账户权限',
          index: '5-3',
          route: {
            name: 'CompanyAccountAuthority'
          }
        }, {
          name: '个人设置',
          index: '5-4',
          route: {
            name: 'Setting'
          }
        }]
      }, {
        name: '审批管理',
        index: '6',
        icon: 'icon-approval',
        route: {
          name: ''
        }
      }, {
        name: '权限管理',
        index: '7',
        hidden: true,
        icon: 'icon-jurisdiction',
        route: {
          name: ''
        }
      }, {
        name: '行为日志',
        index: '8',
        icon: 'icon-log',
        route: {
          name: ''
        }
      }],

      containerStyles: {
        minHeight: (window.innerHeight - 60) + 'px'
      }
    }

    function getActive(menus) {
      every(menus, v => {
        if (v.route && (v.route.name === _self.$route.name || includes(v.activeIncludes || [], _self.$route.name))) {
          data.defaultActive = v.index
          if (~v.index.indexOf('-')) {
            data.defaultOpeneds = [v.index.split('-')[0]]
          } else {
            data.defaultOpeneds = [v.index]
          }
          return false
        } else if (v.menus) {
          getActive(v.menus)
        }
        return true
      })
    }

    getActive(data.menus)

    return data
  },

  methods: {
    startsWith: startsWith,
    breadcrumbRefresh() {
      this.crumbs = this.$route.meta.crumbs
    },
    ...mapActions(['logout'])
  }
}
</script>

<style lang="scss">
@import '../assets/scss/_vars.scss';
$header-height: 60px;
$menu-width: 180px;
$menu-height: 50px;
.ex-content {
  header {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    height: $header-height;
    line-height: $header-height;
    background: #3e4b5c;
    z-index: 999;
    .log-out {
      cursor: pointer;
      &:hover {
        color: white;
      }
    }
    .logo {
      height: 25px;
      color: #fff;
      margin: 18px 0 0 15px;
    }
    .user-info {
      span {
        padding: 0 25px;
        text-align: center;
        color: #929aa3;
        font-size: 13px;
        &:first-child {
          height: 15px;
          border-right: 1px solid #2a313b;
        }
      }
      i {
        font-size: 12px;
        color: #5288b9;
        padding: 0 8px;
      }
    }
  }
  .el-breadcrumb__item__inner {
    &:hover {
      color: $primary-color;
    }
  }
  .el-breadcrumb {
    padding: 20px 12px 0;
    font-size: 12px;
  }
  aside {
    position: fixed;
    z-index: 100;
    top: $header-height;
    bottom: 0;
    left: 0;
    background: #2a313b;
    width: $menu-width;
    overflow-y: auto;
    .el-menu {
      background: none;
      color: #929aa3;
      list-style: none;
    }
    .el-submenu {
      border-bottom: 1px solid #363f4b;
      &:last-child {
        border-bottom: none;
      }
    }
    .el-submenu__title,
    .el-submenu ~ .el-menu-item {
      font-size: 15px;
      color: #818992;
      height: $menu-height;
      line-height: $menu-height;
      padding-left: 15px!important;
      &:hover {
        background: none;
      }
      &.is-active {
        color: white;
      }
      .icon-color {
        padding-right: 10px;
        color: #4c7ca9;
      }
      .icon-date {
        display: inline-block;
        transform: scale(0.9);
      }
    }
    .el-submenu .el-menu-item {
      font-size: 13px;
      color: #818992;
      height: $menu-height - 5px;
      line-height: $menu-height - 5px;
      padding: 0 10px 0 45px!important;
      background: #37404c;
      &.is-active {
        color: white;
      }
      &:hover {
        color: white;
        background: #37404c;
      }
    }
  }
  .container {
    position: relative;
    padding-left: $menu-width;
    top: $header-height;
    .body {
      position: relative;
      padding-bottom: 120px;
    }
    .body-container {
      padding: 12px;
    }
    footer {
      position: absolute;
      left: 0;
      bottom: 0;
      padding: 30px 0;
      font-size: 12px;
      color: #717d8f;
      width: 100%;
      background: #f3f6f8;
      p {
        text-align: center;
      }
    }
  }
}
</style>
