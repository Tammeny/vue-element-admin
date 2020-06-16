<template>
  <div class="breadcrumb-component">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item v-for="(item, index) in list" :to="{name: item.name}" :key="index">
        {{ showTitle(item) }}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>
<script>
import { showTitle } from '@/utils/tools';

export default {
  name: 'BreadCrumb',
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    showTitle(item) {
      return showTitle(item);
    },
  },
};
</script>
<style lang="scss">
.breadcrumb-component{
  display: inline-block;
  vertical-align: top;
  padding-left: 30px;
  .el-breadcrumb {
    line-height: 60px;
  }
}
</style>