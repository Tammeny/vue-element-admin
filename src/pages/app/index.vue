<template>
  <div class="iframe-page">
    <iframe :src="data.url"></iframe>
  </div>
</template>
<script>
export default {
  data() {
    return {
      data: this.$route.meta,
    };
  },
  watch: {
    '$route'() {
      this.data = this.$route.meta;
    },
  },
};
</script>
<style lang="scss">
.iframe-page {
  flex: 1;
  iframe {
    border: none;
    width: 100%;
    height: 100%;
  }
}
</style>