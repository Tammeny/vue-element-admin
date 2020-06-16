<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
  /* ============
   * Entry Point
   * ============
   *
   * The entry point of the application
   */

  export default {
    /**
     * The name of the application.
     */
    name: 'vue-element-admin',

    /**
     * Fires when the app has been mounted.
     */
    mounted() {
      // 可在这获取整站设置
    },
  };
</script>
