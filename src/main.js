// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import Filters from './common/filter.js'
Vue.use(Filters)

import {
  Button,
  Input,
  Select,
  Tabs,
  TabPane,
  Table,
  TableColumn,
  Popover,
  Pagination,
  Row,
  Col,
  Upload
} from 'element-ui'

Vue.component(Button.name, Button)
Vue.component(Input.name, Input)
Vue.component(Select.name, Select)
Vue.component(Tabs.name, Tabs)
Vue.component(TabPane.name, TabPane)
Vue.component(Table.name, Table)
Vue.component(TableColumn.name, TableColumn)
Vue.component(Popover.name, Popover)
Vue.component(Pagination.name, Pagination)
Vue.component(Row.name, Row)
Vue.component(Col.name, Col)
Vue.component(Upload.name, Upload)

/* eslint-disable no-new */
router.run()
