<template>
  <div class="login-page">
    <el-form ref="form" :model="form">
      <el-form-item>
        <el-input v-model="form.username" prefix-icon="el-icon-user-solid"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="form.password" type="password" prefix-icon="el-icon-lock" show-password></el-input>
      </el-form-item>
			<el-form-item>
				<el-checkbox v-model="form.checked">自动登录</el-checkbox>
				<a href="#" class="forget">忘记密码</a>
			</el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login" class="login-btn">登录</el-button>
      </el-form-item>
    </el-form>
	</div>
</template>
<script>
export default {
  data() {
    return {
      form: {
        checked: true,
      },
    };
  },
  methods: {
    login() {
      this.$router.push({
        name: 'home.index',
      });
    },
  },
};
</script>
<style lang="scss">
.login-page{
	margin: 120px auto 0;
	width: 384px;
	.login-btn{
		width: 100%;
	}
	.forget{
		float: right;
	}
}
</style>