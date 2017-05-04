<template lang="pug">
  .overview
    .ov-today
      h3 今日总览
      .ov-today-content
        .stock-product.fl
          .stock-product-title 存量产品（元）
          .stock-product-num
            span {{58838848.62 | }}
          .principal-interest
        .acc-amount.fl
        .today-stock.fl
    .ov-todo
      h3 待办事项
    .ov-remind
      h3 提醒
    .ov-calendar
      h3 日历
</template>
<script>

</script>
<style lang="scss">
  .overview{
    h3{
      // margin:auto;
    }
    .ov-today-content{
      overflow: hidden;
      .stock-product,.acc-amount,.today-stock{
        padding:10px;
        border:1px solid #e2e5e9;
        border-radius: 3px;
        width:32%;
      }
      .acc-amount{
        margin:0 2%;
      }
    }
  }
</style>
