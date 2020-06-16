<template>
  <el-aside class="leftbar-component">
    <div class="title">Vue Element Admin</div>
    <el-menu
      :default-active="home"
      class="menus"
      :router="true"
      @open="handleOpen"
      background-color="#001529"
      text-color="#fff"
      @close="handleClose">
      <template v-for="(parent, index) in routeList">
      <el-submenu v-if="!parent.meta.isTop && parent.children && parent.children.length" :index="parent.path" :key="index">
        <template slot="title">
          <i :class="parent.meta.icon"></i>
          <span>{{parent.meta.title}}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item v-for="(child, childIndex) in parent.children" :key="`child${childIndex}`" :index="`${parent.path}/${child.path}`">{{child.meta.title}}</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item :index="parent.path" :key="index" v-else>
        <i :class="parent.meta.icon"></i>
        <span slot="title">{{parent.meta.title}}</span>
      </el-menu-item>
      </template>
    </el-menu>
  </el-aside>
</template>
<script>
import LayoutDefault from '@/components/layouts/default';
import routes from '@/routes/routes';

export default {
  name: 'leftbar',
  data() {
    return {
      home: '/home/index',
      routeList: routes.filter(item => !item.meta.hideInMenu),
    };
  },
  created() {
    this.addRoutes();
  },
  methods: {
    addRoutes() {
      const children = [{
        path: 'baidu',
        name: 'app.baidu',
        component: () => import(/* webpackChunkName: "app.index" */ '@/pages/app'),
        meta: {
          title: '百度',
          url: 'https://www.baidu.com',
        },
      }, {
        path: 'taobao',
        name: 'app.taobao',
        component: () => import(/* webpackChunkName: "app.index" */ '@/pages/app'),
        meta: {
          title: '淘宝',
          url: 'https://www.taobao.com',
        },
      }];
      const newRoute = [{
        path: '/app',
        redirect: '/app/index',
        name: 'app',
        component: LayoutDefault,
        meta: {
          icon: 'el-icon-menu',
          title: '应用',
        },
        children,
      }];
      this.$router.addRoutes(newRoute);
      this.routeList = this.routeList.concat(newRoute);
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    getOpenedNamesByActiveName(name) {
      return this.$route.matched.map(item => item.name).filter(item => item !== name);
    },
    updateOpenName(name) {
      if (name === 'home.index') this.openedNames = [];
      else this.openedNames = this.getOpenedNamesByActiveName(name);
    },
  },
};
</script>
<style lang="scss">
  .leftbar-component {
    background-color: #001529;
    color: #fff;
    width: 200px;
    .title {
      font-size: 24px;
      text-align: center;
      margin: 20px 0;
    }
    .menus {
      border-right: none;
    }
  }
</style>


