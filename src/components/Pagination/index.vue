<template>
  <div class="box">
    <div class="pagination">
      <button
        :disabled="pageNum == 1"
        @click="$emit('getPageNum', pageNum - 1)"
      >
        上一页
      </button>
      <button
        v-if="startNumAndEndNum.start > 1"
        @click="$emit('getPageNum', 1)"
        :class="{ active: pageNum == 1 }"
      >
        1
      </button>
      <button v-if="startNumAndEndNum.start > 2">...</button>

      <template v-for="(page, index) in startNumAndEndNum.end">
        <button
          :key="index"
          v-if="page >= startNumAndEndNum.start"
          @click="$emit('getPageNum', page)"
          :class="{ active: pageNum == page }"
        >
          {{ page }}
        </button>
      </template>

      <button v-if="startNumAndEndNum.end < totalPage - 1">...</button>
      <button
        v-if="startNumAndEndNum.end < totalPage"
        @click="$emit('getPageNum', totalPage)"
        :class="{ active: pageNum == totalPage }"
      >
        {{ totalPage }}
      </button>
      <button
        :disabled="pageNum == totalPage"
        @click="$emit('getPageNum', pageNum + 1)"
      >
        下一页
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: ['pageNum', 'pageSize', 'total', 'continues'],
  computed: {
    // 计算总页数
    totalPage() {
      return Math.ceil(this.total / this.pageSize)
    },
    // 计算连续的页数
    startNumAndEndNum() {
      const { continues, pageNum, totalPage } = this
      let start = 0
      let end = 0
      // 第一种特殊情况，当连续的总页数要大于总页数的时候
      if (continues > totalPage) {
        start = 1
        end = totalPage
      } else {
        // 正常现象
        // 当前页 前后两个数字
        start = pageNum - parseInt(continues / 2)
        end = pageNum + parseInt(continues / 2)
        if (start < 1) {
          start = 1
          end = continues
        }
        if (end > totalPage) {
          end = totalPage
          start = totalPage - continues + 1
        }
      }
      return { start, end }
    }
  }
}
</script>

<style lang="less" scoped>
.box {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .pagination {
    text-align: center;
    // margin: auto;
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
        background-color: #5cb85c;
        color: #fff;
      }
    }
  }
  .active {
    background: #5cb85c;
  }
}
</style>
