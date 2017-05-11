// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import Filters from './common/filter.js'
import VueResource from 'vue-resource'

import {
  Form,
  FormItem,
  Button,
  Radio,
  Input,
  Checkbox,
  CheckboxGroup,
  Select,
  Option,
  Tag,
  Tabs,
  TabPane,
  Table,
  TableColumn,
  Popover,
  Pagination,
  Row,
  Col,
  Upload,
  Dialog,
  DatePicker,
  Collapse
} from 'element-ui'
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition.js'

Vue.component(Form.name, Form)
Vue.component(FormItem.name, FormItem)
Vue.component(Button.name, Button)
Vue.component(Radio.name, Radio)
Vue.component(Input.name, Input)
Vue.component(Checkbox.name, Checkbox)
Vue.component(CheckboxGroup.name, CheckboxGroup)
Vue.component(Select.name, Select)
Vue.component(Option.name, Option)
Vue.component(Tag.name, Tag)
Vue.component(Tabs.name, Tabs)
Vue.component(TabPane.name, TabPane)
Vue.component(Table.name, Table)
Vue.component(TableColumn.name, TableColumn)
Vue.component(Popover.name, Popover)
Vue.component(Pagination.name, Pagination)
Vue.component(Row.name, Row)
Vue.component(Col.name, Col)
Vue.component(Upload.name, Upload)
Vue.component(Dialog.name, Dialog)
Vue.component(DatePicker.name, DatePicker)
Vue.component(Collapse.name, Collapse)
Vue.component(CollapseTransition.name, CollapseTransition)

Vue.use(VueResource)
Vue.use(Filters)

router.run()
