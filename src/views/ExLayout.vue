<template lang="pug">
  .ex-content
    header
      img.logo(src="../assets/images/logo.svg")
      .user-info.fr
        span
          i.icon-batonx.icon-user.icon-color
          | hi,广交所
        span.log-out(@click="logOut()") 退出
    section.container(:style='containerStyles')
      aside
        el-menu(:unique-opened='true',:default-openeds="['1']", :router='true')
          el-submenu(index='1')
            template(slot='title')
              i.icon-batonx.icon-proman.icon-color
              | 产品管理
            el-menu-item(index='1-1') 今日总览
            el-menu-item(index='1-2') 产品列表
            el-menu-item(index='1-3') 登记产品列表
          el-submenu(index='2')
            template(slot="title")
              i.icon-batonx.icon-assetman.icon-color
              | 资产管理
            el-menu-item(index='2-1', :route="{name: 'AssetList'}") 资产列表
          el-submenu(index='3')
            template(slot='title')
              i.icon-batonx.icon-platformman.icon-color
              | 平台管理
            el-menu-item(index='3-1') 机构列表
          el-submenu(index='4')
            template(slot='title')
              i.icon-batonx.icon-customer.icon-color
              | 客户管理
            el-menu-item(index='4-1') 客户列表
          el-submenu(index='5')
            template(slot='title')
              i.icon-batonx.icon-capitalman.icon-color
              | 资金账户管理
            el-menu-item(index='5-1') 资金账户列表
          el-submenu(index='6')
            template(slot='title')
              i.icon-batonx.icon-approval.icon-color
              | 审批管理
            el-menu-item(index='5-1') 1111
          el-submenu(index='7')
            template(slot='title')
              i.icon-batonx.icon-jurisdiction.icon-color
              | 权限管理
            el-menu-item(index='5-1') 22
      .body(:style='containerStyles')
        el-breadcrumb
          el-breadcrumb-item
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

export default {
  components: {
    ElMenu: Menu,
    ElSubmenu: Submenu,
    ElMenuItem: MenuItem,
    ElBreadcrumb: Breadcrumb,
    ElBreadcrumbItem: BreadcrumbItem
  },
  data() {
    return {
      containerStyles: {
        minHeight: (window.innerHeight - 60) + 'px'
      }
    }
  }
}
</script>

<style lang="scss">
.ex-content {
  header {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    height: 60px;
    line-height: 60px;
    background: #3e4b5c;
    z-index: 10;
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
  .container {
    position: relative;
    padding-left: 180px;
    top: 60px;
    aside {
      position: fixed;
      z-index: 100;
      top: 60px;
      bottom: 0;
      left: 0;
      background: #2a313b;
      width: 180px;
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
      .el-submenu__title {
        font-size: 15px;
        color: #818992;
        height: 50px;
        line-height: 50px;
        padding-left: 15px!important;
        &:hover {
          background: none;
        }
        .icon-color {
          padding-right: 10px;
          color: #4c7ca9;
        }
      }
      .el-menu-item {
        font-size: 13px;
        color: #818992;
        height: 45px;
        line-height: 45px;
        padding: 0 10px 0 45px!important;
        background: #37404c;
        &:hover {
          background: #37404c;
        }
      }
    }
    .body {
      position: relative;
      padding-bottom: 140px;
    }
    .body-container {
      padding: 12px;
    }
    footer {
      position: absolute;
      left: 0;
      bottom: 0;
      padding: 15px 0;
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
