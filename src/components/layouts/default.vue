<template>
  <el-container class="default-layout">
    <y-leftbar ref="leftbar"></y-leftbar>
    <el-container direction="vertical">
      <y-header></y-header>
      <tags-nav @input="handleClick" @on-close="handleCloseTag" :list="tagNavList" :value="$route"></tags-nav>
      <el-main>
        <keep-alive :include="cacheList">
          <router-view/>
        </keep-alive>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
/* ============
  * Default Layout
  * ============
  */
import { mapMutations, mapGetters } from 'vuex';
import { routeEqual, getNewTagList } from '@/utils/tools';
import routers from '@/routes/routes';
import YHeader from '@/components/common/header';
import TagsNav from '@/components/common/tags-nav';
import YLeftbar from '@/components/common/leftbar';

export default {
  name: 'default-layout',
  components: {
    YHeader,
    TagsNav,
    YLeftbar,
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters([
      'errorCount',
    ]),
    tagNavList() {
      return this.$store.state.tabs.tagNavList;
    },
    tagRouter() {
      return this.$store.state.tabs.tagRouter;
    },
    cacheList() {
      const list = ['default-layout', ...this.tagNavList.length ? this.tagNavList.filter(item => !(item.meta && item.meta.notCache)).map(item => item.name) : []];
      return list;
    },
    menuList() {
      return this.$store.getters.menuList;
    },
    local() {
      return this.$store.state.tabs.local;
    },
    hasReadErrorPage() {
      return this.$store.state.tabs.hasReadErrorPage;
    },
  },
  watch: {
    '$route'(newRoute) {
      const { name, query, params, meta } = newRoute;
      this.addTag({
        route: { name, query, params, meta },
        type: 'push',
      });
      this.setBreadCrumb(newRoute);
      this.setTagNavList(getNewTagList(this.tagNavList, newRoute));
      // 操作侧边菜单更新active状态
      this.$refs.leftbar.updateOpenName(newRoute.name);
    },
  },
  mounted() {
    /**
     * @description 初始化设置面包屑导航和标签导航
     */
    this.setTagNavList();
    this.setHomeRoute(routers);
    const { name, params, query, meta } = this.$route;
    this.addTag({
      route: { name, params, query, meta },
    });
    this.setBreadCrumb(this.$route);
    // 如果当前打开页面不在标签栏中，跳到homeName页
    if (!this.tagNavList.find(item => item.name === this.$route.name)) {
      this.$router.push({
        name: 'home.index',
      });
    }
  },
  methods: {
    ...mapMutations([
      'setBreadCrumb',
      'setTagNavList',
      'addTag',
      'setLocal',
      'setHomeRoute',
      'closeTag',
    ]),
    turnToPage(route) {
      let { name, params, query } = {};
      if (typeof route === 'string') {
        name = route;
      } else {
        name = route.name;
        params = route.params;
        query = route.query;
      }
      if (name.indexOf('isTurnByHref_') > -1) {
        window.open(name.split('_')[1]);
        return;
      }
      this.$router.push({
        name,
        params,
        query,
      });
    },
    handleCloseTag(res, type, route) {
      if (type !== 'others') {
        if (type === 'all') {
          this.turnToPage('home.index');
        } else {
          if (routeEqual(this.$route, route)) {
            this.closeTag(route);
          }
        }
      }
      this.setTagNavList(res);
    },
    handleClick(item) {
      this.turnToPage(item);
    },
  },
};
</script>


<style lang="scss">
  .default-layout {
    min-height: 100vh;
    .el-main {
      display: inline-flex;
    }
  }
</style>
