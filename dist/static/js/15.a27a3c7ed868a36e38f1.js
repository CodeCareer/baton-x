webpackJsonp([15],{393:function(t,a,l){l(695);var s=l(252)(l(634),l(736),null,null);t.exports=s.exports},607:function(t,a,l){"use strict";var s={"待提交":"waitC","待确认":"waitC","待发布":"waitC","待执行":"waitC","已发布":"ok1C","销售完成":"ok2C","已确认确认书":"ok2C"};a.a={filters:{filterColor:function(t){return s[t]}}}},634:function(t,a,l){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var s=l(255),e=(l.n(s),l(40)),i=(l.n(e),l(254)),r=l.n(i),n=l(253),o=(l.n(n),l(607));a.default={mixins:[o.a],methods:{findproduct:function(){r.a.info("dome暂时不支持查找")},tabClick:function(t,a){console.log(t,a)},searchFilter:function(t){this.productTypes[t].defaultColor=!0},clearFilter:function(){var t=this;l.i(n.each)(this.filter,function(a,l){t.filter[l]=""})},goToDetail:function(t){this.$router.push({name:"ProductDetail",params:{id:t.id||t.name},query:{type:t.type}})},pageChange:function(t){console.log("分页"+t)},pageSizeChange:function(t){this.page.size=t}},computed:{},data:function(){return{tab:"first",filter:{name:"",rates:"",amount:""},page:{current:1,size:10,sizes:[10,20,30,50]},productTypes:[{value:"全部",defaultColor:!1},{value:"定期",defaultColor:!1},{value:"活期",defaultColor:!1}],schedules:[{value:"全部",defaultColor:!1},{value:"待提交",defaultColor:!1},{value:"待确认",defaultColor:!1},{value:"待发布",defaultColor:!1},{value:"已发布",defaultColor:!1},{value:"销售完成",defaultColor:!1},{value:"已确认确认书",defaultColor:!1}],status:[{value:"全部"},{value:"已执行"},{value:"待执行"},{value:"不可执行"},{value:"已过期"}],platforms:[{value:"全部"},{value:"财富宝"},{value:"360你财富"},{value:"甜橙理财"}],tableData:[{note:"基金总额的30%需在2017年03月06日变现",name:"恒耀稳享5016期",amount:"￥13,098,781.00",startDate:"2017-01-05",endDate:"2017-06-05",term:"365天",rates:"6.5%",platforms:"恒大金服",status:["待提交"],current:!0,type:0},{name:"恒耀稳享3006期",amount:"￥20,231.00",startDate:"2017-01-13",endDate:"2017-07-05",term:"365天",rates:"6.5%",platforms:"恒大金服",status:["待确认"],type:1},{name:"恒存金-灵活理财A",amount:"￥45,632,98.00",startDate:"2017-01-20",endDate:"2017-04-20",term:"365天",rates:"6.5%",platforms:"恒大金服",status:[],type:0},{name:"恒耀稳享85期",amount:"￥870,654,256.00",startDate:"2017-01-22",endDate:"2017-05-22",term:"365天",rates:"6.5%",platforms:"恒大金服",status:["待发布"],current:!0,type:1},{name:"普惠金交·牛稳赚3号理财计",amount:"￥12,098,653.00",startDate:"2017-01-28",endDate:"2017-02-28",term:"365天",rates:"6.5%",platforms:"恒大金服",status:["销售完成","待执行"],type:1},{name:"恒耀稳享4358期",amount:"￥34,892.00",startDate:"2017-01-30",endDate:"2017-06-30",term:"365天",rates:"6.5%",platforms:"恒大金服",status:["已确认确认书"],type:0},{name:"恒耀稳享9746期",amount:"￥23,673,88.00",startDate:"2017-02-05",endDate:"2017-07-05",term:"365天",rates:"6.5%",platforms:"恒大金服",status:["待发布"],type:1},{name:"恒存金-灵活理财C",amount:"￥12,872.00",startDate:"2017-02-15",endDate:"2017-04-15",term:"365天",rates:"6.5%",platforms:"恒大金服",status:["已发布"],type:0},{name:"恒耀稳享36期",amount:"￥76,897,882.00",startDate:"2017-02-18",endDate:"2017-03-18",term:"365天",rates:"6.5%",platforms:"恒大金服",status:["销售完成","待执行"],current:!0,type:1},{name:"普惠金交·牛稳赚4号理财计划",amount:"￥27,653,21.00",startDate:"2017-02-24",endDate:"2018-02-24",term:"365天",rates:"6.5%",platforms:"恒大金服",status:["已确认确认书"],type:1},{name:"恒存金-灵活理财B",amount:"￥27,653,21.00",startDate:"2017-02-24",endDate:"2018-02-24",term:"365天",rates:"6.5%",platforms:"恒大金服",status:["已确认确认书"],type:1},{name:"恒耀稳享4866期",amount:"￥27,653,21.00",startDate:"2017-02-24",endDate:"2018-02-24",term:"365天",rates:"6.5%",platforms:"恒大金服",status:["已确认确认书"],type:0},{name:"普惠金交·牛稳赚5号理365划",amount:"￥27,653,21.00",startDate:"2017-02-24",endDate:"2018-02-24",term:"365天",rates:"6.5%",platforms:"恒大金服",status:["已确认确认书"],type:1}]}}}},648:function(t,a,l){a=t.exports=l(373)(),a.push([t.i,".product-list .el-button--info{padding:7px 9px;background:#96a3ba;border-color:#96a3ba}.product-list .inport-file{display:inline-block;margin-left:10px;color:#538cc0}.product-list .filters .filters-top{padding:10px 0;overflow:hidden}.product-list .filters .filters-top label{width:65px;color:#54637a}.product-list .filters .filters-top li{padding:0 5px}.product-list .filters .filters-top li a{border-radius:3px;padding:0 5px}.product-list .filters .filters-top .filter-top-middle,.product-list .filters .filters-top .filter-top-right{margin-left:50px}.product-list .filters .filters-bottom{overflow:hidden;padding:15px 0}.product-list .filters .filters-bottom label{width:65px;color:#54637a}.product-list .filters .filters-bottom li a{padding:0 5px}.product-list .filters .filters-search{margin:0 -15px;border-top:1px solid #e7eaed}.product-list .filters .filters-search .search-input{padding:15px 15px 0}.product-list .filters .el-input{margin-right:20px}.product-list .table-container{margin-top:20px}.product-list .table-container table{table-layout:auto}.product-list .table-container .current{padding:0 3px;background:#e55a6c;color:#fff;margin-left:8px;border-radius:3px}.product-list .table-container .icon-date{margin-left:8px}.product-list .table-container .status_color{padding:0 5px;border-right:1px solid #f4f5f7}.product-list .table-container .status_color:last-child{border-right:none}.product-list .table-container .waitC{color:#eb7c72}.product-list .table-container .ok1C{color:#18b8ba}.product-list .table-container .ok2C{color:#538cc0}.product-list .table-container .el-pagination{margin-top:20px;text-align:center}.product-list .active a{background:#538cc0;color:#fff}","",{version:3,sources:["/Users/luxueyan/work/kt-batonx-frontend/src/views/product_management/ProductList.vue"],names:[],mappings:"AACA,+BACE,gBAAiB,AACjB,mBAAoB,AACpB,oBAAsB,CACvB,AACD,2BACE,qBAAsB,AACtB,iBAAkB,AAClB,aAAe,CAChB,AACD,oCACE,eAAgB,AAChB,eAAiB,CAClB,AACD,0CACI,WAAY,AACZ,aAAe,CAClB,AACD,uCACI,aAAe,CAClB,AACD,yCACM,kBAAmB,AACnB,aAAe,CACpB,AACD,6GAEI,gBAAkB,CACrB,AACD,uCACE,gBAAiB,AACjB,cAAgB,CACjB,AACD,6CACI,WAAY,AACZ,aAAe,CAClB,AACD,4CACI,aAAe,CAClB,AACD,uCACE,eAAgB,AAChB,4BAA8B,CAC/B,AACD,qDACI,mBAA0B,CAC7B,AACD,iCACE,iBAAmB,CACpB,AACD,+BACE,eAAiB,CAClB,AACD,qCACI,iBAAmB,CACtB,AACD,wCACI,cAAe,AACf,mBAAoB,AACpB,WAAY,AACZ,gBAAiB,AACjB,iBAAmB,CACtB,AACD,0CACI,eAAiB,CACpB,AACD,6CACI,cAAe,AACf,8BAAgC,CACnC,AACD,wDACM,iBAAmB,CACxB,AACD,sCACI,aAAe,CAClB,AACD,qCACI,aAAe,CAClB,AACD,qCACI,aAAe,CAClB,AACD,8CACI,gBAAiB,AACjB,iBAAmB,CACtB,AACD,wBACE,mBAAoB,AACpB,UAAY,CACb",file:"ProductList.vue",sourcesContent:["\n.product-list .el-button--info {\n  padding: 7px 9px;\n  background: #96a3ba;\n  border-color: #96a3ba;\n}\n.product-list .inport-file {\n  display: inline-block;\n  margin-left: 10px;\n  color: #538cc0;\n}\n.product-list .filters .filters-top {\n  padding: 10px 0;\n  overflow: hidden;\n}\n.product-list .filters .filters-top label {\n    width: 65px;\n    color: #54637a;\n}\n.product-list .filters .filters-top li {\n    padding: 0 5px;\n}\n.product-list .filters .filters-top li a {\n      border-radius: 3px;\n      padding: 0 5px;\n}\n.product-list .filters .filters-top .filter-top-middle,\n  .product-list .filters .filters-top .filter-top-right {\n    margin-left: 50px;\n}\n.product-list .filters .filters-bottom {\n  overflow: hidden;\n  padding: 15px 0;\n}\n.product-list .filters .filters-bottom label {\n    width: 65px;\n    color: #54637a;\n}\n.product-list .filters .filters-bottom li a {\n    padding: 0 5px;\n}\n.product-list .filters .filters-search {\n  margin: 0 -15px;\n  border-top: 1px solid #e7eaed;\n}\n.product-list .filters .filters-search .search-input {\n    padding: 15px 15px 0 15px;\n}\n.product-list .filters .el-input {\n  margin-right: 20px;\n}\n.product-list .table-container {\n  margin-top: 20px;\n}\n.product-list .table-container table {\n    table-layout: auto;\n}\n.product-list .table-container .current {\n    padding: 0 3px;\n    background: #e55a6c;\n    color: #fff;\n    margin-left: 8px;\n    border-radius: 3px;\n}\n.product-list .table-container .icon-date {\n    margin-left: 8px;\n}\n.product-list .table-container .status_color {\n    padding: 0 5px;\n    border-right: 1px solid #f4f5f7;\n}\n.product-list .table-container .status_color:last-child {\n      border-right: none;\n}\n.product-list .table-container .waitC {\n    color: #eb7c72;\n}\n.product-list .table-container .ok1C {\n    color: #18b8ba;\n}\n.product-list .table-container .ok2C {\n    color: #538cc0;\n}\n.product-list .table-container .el-pagination {\n    margin-top: 20px;\n    text-align: center;\n}\n.product-list .active a {\n  background: #538cc0;\n  color: #fff;\n}\n"],sourceRoot:""}])},695:function(t,a,l){var s=l(648);"string"==typeof s&&(s=[[t.i,s,""]]),s.locals&&(t.exports=s.locals);l(374)("80dfc9cc",s,!0)},736:function(t,a){t.exports={render:function(){var t=this,a=t.$createElement,l=t._self._c||a;return l("section",{staticClass:"product-list"},[l("div",{staticClass:"box"},[l("div",{staticClass:"box-tab-header"},[l("el-button",{attrs:{type:"primary",size:"small"}},[l("i",{staticClass:"icon-batonx icon-plus"}),t._v("新增")]),l("el-button",{staticClass:"elButton",attrs:{type:"info",size:"small"}},[l("i",{staticClass:"icon-batonx icon-import"}),t._v("导入")]),l("a",{staticClass:"inport-file"},[t._v("历史导入文件")])],1),l("el-tabs",{attrs:{type:"card"},on:{"tab-click":t.tabClick},model:{value:t.tab,callback:function(a){t.tab=a},expression:"tab"}},[l("el-tab-pane",{attrs:{label:"全部",name:"first"}},[l("div",{staticClass:"filters"},[l("div",{staticClass:"filters-top"},[l("div",{staticClass:"filter-top-left fl"},[l("label",{staticClass:"fl"},[t._v("产品类型：")]),l("ul",{staticClass:"fl"},t._l(t.productTypes,function(a,s){return l("li",{staticClass:"fl",class:{active:a.defaultColor}},[l("a",{on:{click:function(a){t.searchFilter(s)}}},[t._v(t._s(a.value))])])}))]),l("div",{staticClass:"filter-top-middle fl"},[l("label",{staticClass:"fl"},[t._v("发行进度：")]),l("ul",{staticClass:"fl"},t._l(t.schedules,function(a,s){return l("li",{staticClass:"fl",class:{active:a.defaultColor}},[l("a",{on:{click:function(a){t.searchFilter(s)}}},[t._v(t._s(a.value))])])}))]),l("div",{staticClass:"filter-top-right fl"},[l("label",{staticClass:"fl"},[t._v("执行状态：")]),l("ul",{staticClass:"fl"},t._l(t.status,function(a){return l("li",{staticClass:"fl"},[l("a",[t._v(t._s(a.value))])])}))])]),l("div",{staticClass:"filters-bottom"},[l("label",{staticClass:"fl"},[t._v("发行平台:")]),l("ul",{staticClass:"fl"},t._l(t.platforms,function(a){return l("li",{staticClass:"fl"},[l("a",[t._v(t._s(a.value))])])}))]),l("div",{staticClass:"filters-search"},[l("div",{staticClass:"search-input"},[l("el-input",{attrs:{icon:"search",placeholder:"请输入产品名称","on-icon-click":t.findproduct},model:{value:t.filter.name,callback:function(a){t.filter.name=a},expression:"filter.name"}})],1)])])]),l("el-tab-pane",{attrs:{label:"待发产品",name:"second"}},[l("div",{staticClass:"filters"},[l("div",{staticClass:"filters-top"},[l("div",{staticClass:"filter-top-left fl"},[l("label",{staticClass:"fl"},[t._v("产品类型：")]),l("ul",{staticClass:"fl"},t._l(t.productTypes,function(a){return l("li",{staticClass:"fl"},[l("a",[t._v(t._s(a.value))])])}))]),l("div",{staticClass:"filter-top-middle fl"},[l("label",{staticClass:"fl"},[t._v("发行进度：")]),l("ul",{staticClass:"fl"},t._l(t.schedules,function(a){return l("li",{staticClass:"fl"},[l("a",[t._v(t._s(a.value))])])}))]),l("div",{staticClass:"filter-top-right fr"},[l("label",{staticClass:"fl"},[t._v("执行状态：")]),l("ul",{staticClass:"fl"},t._l(t.status,function(a){return l("li",{staticClass:"fl"},[l("a",[t._v(t._s(a.value))])])}))])]),l("div",{staticClass:"filters-bottom"},[l("label",{staticClass:"fl"},[t._v("发行平台:")]),l("ul",{staticClass:"fl"},t._l(t.platforms,function(a){return l("li",{staticClass:"fl"},[l("a",[t._v(t._s(a.value))])])}))]),l("div",{staticClass:"filters-search"},[l("div",{staticClass:"search-input"},[l("el-input",{attrs:{icon:"search",placeholder:"请输入产品代码","on-icon-click":t.findproduct}})],1)])])]),l("el-tab-pane",{attrs:{label:"存续产品",name:"third"}},[l("div",{staticClass:"filters"},[l("div",{staticClass:"filters-top"},[l("div",{staticClass:"filter-top-left fl"},[l("label",{staticClass:"fl"},[t._v("产品类型：")]),l("ul",{staticClass:"fl"},t._l(t.productTypes,function(a){return l("li",{staticClass:"fl"},[l("a",[t._v(t._s(a.value))])])}))]),l("div",{staticClass:"filter-top-middle fl"},[l("label",{staticClass:"fl"},[t._v("发行进度：")]),l("ul",{staticClass:"fl"},t._l(t.schedules,function(a){return l("li",{staticClass:"fl"},[l("a",[t._v(t._s(a.value))])])}))]),l("div",{staticClass:"filter-top-right fr"},[l("label",{staticClass:"fl"},[t._v("执行状态：")]),l("ul",{staticClass:"fl"},t._l(t.status,function(a){return l("li",{staticClass:"fl"},[l("a",[t._v(t._s(a.value))])])}))])]),l("div",{staticClass:"filters-bottom"},[l("label",{staticClass:"fl"},[t._v("发行平台:")]),l("ul",{staticClass:"fl"},t._l(t.platforms,function(a){return l("li",{staticClass:"fl"},[l("a",[t._v(t._s(a.value))])])}))]),l("div",{staticClass:"filters-search"},[l("div",{staticClass:"search-input"},[l("el-input",{attrs:{icon:"search",placeholder:"请输入产品代码","on-icon-click":t.findproduct}})],1)])])]),l("el-tab-pane",{attrs:{label:"到期产品",name:"fourth"}},[l("div",{staticClass:"filters"},[l("div",{staticClass:"filters-top"},[l("div",{staticClass:"filter-top-left fl"},[l("label",{staticClass:"fl"},[t._v("产品类型：")]),l("ul",{staticClass:"fl"},t._l(t.productTypes,function(a){return l("li",{staticClass:"fl"},[l("a",[t._v(t._s(a.value))])])}))]),l("div",{staticClass:"filter-top-middle fl"},[l("label",{staticClass:"fl"},[t._v("发行进度：")]),l("ul",{staticClass:"fl"},t._l(t.schedules,function(a){return l("li",{staticClass:"fl"},[l("a",[t._v(t._s(a.value))])])}))]),l("div",{staticClass:"filter-top-right fr"},[l("label",{staticClass:"fl"},[t._v("执行状态：")]),l("ul",{staticClass:"fl"},t._l(t.status,function(a){return l("li",{staticClass:"fl"},[l("a",[t._v(t._s(a.value))])])}))])]),l("div",{staticClass:"filters-bottom"},[l("label",{staticClass:"fl"},[t._v("发行平台:")]),l("ul",{staticClass:"fl"},t._l(t.platforms,function(a){return l("li",{staticClass:"fl"},[l("a",[t._v(t._s(a.value))])])}))]),l("div",{staticClass:"filters-search"},[l("div",{staticClass:"search-input"},[l("el-input",{attrs:{icon:"search",placeholder:"请输入产品代码","on-icon-click":t.findproduct}})],1)])])])],1)],1),l("div",{staticClass:"table-container"},[l("el-table",{staticStyle:{width:"100%"},attrs:{data:t.tableData},on:{"row-click":t.goToDetail}},[l("el-table-column",{attrs:{property:"name",label:"资产名称",width:"320"},scopedSlots:t._u([["default",function(a){return[l("span",{staticClass:"asset-name"},[t._v(t._s(a.row.name))]),a.row.current?l("span",{staticClass:"current"},[t._v("活期")]):t._e(),a.row.current?t._e():l("span",{staticClass:"regular"},[t._v("定期")]),l("i",{staticClass:"icon-batonx icon-date"})]}]])}),l("el-table-column",{scopedSlots:t._u([["default",function(a){return t._l(a.row.status,function(a){return l("span",{staticClass:"status_color",class:t._f("filterColor")(a)},[t._v(t._s(a))])})}]])}),l("el-table-column",{attrs:{property:"amount",label:"实际募集金额",width:"150"}}),l("el-table-column",{attrs:{property:"term",label:"发行期限"}}),l("el-table-column",{attrs:{property:"startDate",label:"起息日",sortable:!0}}),l("el-table-column",{attrs:{property:"endDate",label:"到期日"}}),l("el-table-column",{attrs:{property:"rates",label:"发行利率",width:"180"}}),l("el-table-column",{attrs:{property:"platforms",label:"发行平台",width:"150"}})],1),l("el-pagination",{attrs:{"current-page":t.page.current,"page-sizes":t.page.sizes,"page-size":t.page.size,layout:"total, prev, pager, next, jumper",total:t.tableData.length},on:{"size-change":t.pageSizeChange,"current-change":t.pageChange}})],1)])},staticRenderFns:[]}}});
//# sourceMappingURL=15.a27a3c7ed868a36e38f1.js.map