<template>
  <div class="pagination">
    <button
      :disabled="this.pageNo==1"
      @click="$emit('getPageNo',pageNo-1)"
    >上一页</button>
    <button v-if="startNumAndEndNum.start>1" :class="{active:pageNo==1}">1</button>
    <button v-if="startNumAndEndNum.start>2">···</button>

    <!-- 中间部分 -->
    <button
      v-for="(page,index) in startNumAndEndNum.end"
      :key="page"
      v-if="page>=startNumAndEndNum.start"
      @click="$emit('getPageNo',page)"
      :class="{active:pageNo==page}"
    >{{page}}</button>
    <button v-if="startNumAndEndNum.end<this.totalPage-1">···</button>
    <button
      v-if="startNumAndEndNum.end<this.totalPage"
      @click="$emit('getPageNo',totalPage)"
      :class="{active:pageNo==totalPage}"
    >{{totalPage}}</button>
    <button
      :disabled="this.pageNo==totalPage"
      @click="$emit('getPageNo',pageNo+1)"
    >下一页</button>

    <button style="margin-left: 30px">共 {{total}} 条</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: ["pageNo", "pageSize", "total", "continues"],
  computed: {
    //总共页数
    totalPage() {
      return Math.ceil(this.total / this.pageSize);
    },
    //计算连续页码数据
    startNumAndEndNum() {
      const { continues, pageNo, totalPage } = this;
      let start = 0,
        end = 0;
      //连续页码数大于总页数
      if (totalPage < continues) {
        start = 1;
        end = this.totalPage;
      }
      //正常情况
      else {
        start = pageNo - Math.floor(continues / 2);
        end = pageNo + Math.floor(continues / 2);
        if (start < 1) {
          start = 1;
          end = continues;
        }
        if (end > totalPage) {
          start = totalPage - continues;
          end = totalPage;
        }
      }
      return { start, end };
    },
  },
};
</script>

<style lang="less" scoped>
.active{
  background-color: skyblue;
}
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>