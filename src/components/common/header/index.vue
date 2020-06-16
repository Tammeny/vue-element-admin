<template>
  <el-header class="header-component">
    <y-breadcrumb :list="breadCrumbList"></y-breadcrumb>
    <div class="right">
      <y-fullscreen v-model="isFullscreen"></y-fullscreen>
      <user-dropdown user-avatar=""></user-dropdown>
    </div>
  </el-header>
</template>
<script>
import YBreadcrumb from '@/components/common/breadcrumb';
import YFullscreen from '@/components/common/fullscreen';
import UserDropdown from '@/components/common/user-dropdown';

export default {
  name: 'Header',
  components: {
    YBreadcrumb,
    YFullscreen,
    UserDropdown,
  },
  data() {
    return {
      isFullscreen: false,
    };
  },
  computed: {
    breadCrumbList() {
      return this.$store.state.tabs.breadCrumbList;
    },
  },
};
</script>
<style lang="scss">
  .header-component {
    padding: 0;
    display: flex;
    justify-content: space-between;
    .right {
      display: flex;
      margin-right: 20px;
    }
  }
</style>


