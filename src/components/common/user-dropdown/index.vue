<template>
  <div class="user-dropdown-component">
    <el-dropdown @command="handleCommand">
      <div class="item">
        <el-avatar :size="32" :src="userAvatar"></el-avatar>
        <i class="el-icon-arrow-down el-icon--right"></i>
      </div>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="logout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  name: 'user-dropdown',
  props: {
    userAvatar: {
      type: String,
      default: '',
    },
  },
  methods: {
    handleCommand(command) {
      if (command === 'logout') {
        this.$confirm('确定退出登录吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          this.$router.push({
            name: 'login.index',
          });
        });
      }
    },
  },
};
</script>
<style lang="scss">
.user-dropdown-component {
  margin: 0 10px;
  .item {
    display: flex;
    align-items: center;
    height: 60px;
  }
}
</style>