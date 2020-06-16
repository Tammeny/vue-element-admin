<template>
  <div class="tags-nav-component">
    <div class="close-con">
      <el-dropdown @command="handleTagsOption">
        <span class="el-dropdown-link">
          <i class="el-icon-circle-close"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="all">关闭所有</el-dropdown-item>
          <el-dropdown-item command="others">关闭其他</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div class="btn-con left-btn">
      <el-button type="text" @click="handleScroll(240)">
        <i class="el-icon-arrow-left"></i>
      </el-button>
    </div>
    <div class="btn-con right-btn">
      <el-button type="text" @click="handleScroll(-240)">
        <i class="el-icon-arrow-right"></i>
      </el-button>
    </div>
    <div class="scroll-outer" ref="scrollOuter" @DOMMouseScroll="handlescroll" @mousewheel="handlescroll">
      <div ref="scrollBody" class="scroll-body" :style="{left: tagBodyLeft + 'px'}">
        <transition-group name="taglist-moving-animation">
          <el-tag
            type="dot"
            v-for="(item, index) in list"
            ref="tagsPageOpened"
            :key="`tag-nav-${index}`"
            :data-route-item="item"
            @close="handleClose(item)"
            @click.native="handleClick(item)"
            :closable="item.name !== 'home.index'"
            :class="isCurrentTag(item) ? 'active' : ''"
          ><i class="dot"></i> {{ showTitleInside(item) }}</el-tag>
        </transition-group>
      </div>
    </div>
  </div>
</template>

<script>
import { routeEqual, showTitle } from '@/utils/tools';

export default {
  name: 'TagsNav',
  props: {
    value: Object,
    list: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      tagBodyLeft: 0,
      rightOffset: 40,
      outerPadding: 4,
    };
  },
  computed: {
    currentRouteObj() {
      const { name, params, query } = this.value;
      return { name, params, query };
    },
  },
  methods: {
    showTitleInside(item) {
      return showTitle(item);
    },
    handlescroll(e) {
      const type = e.type;
      let delta = 0;
      if (type === 'DOMMouseScroll' || type === 'mousewheel') {
        delta = (e.wheelDelta) ? e.wheelDelta : -(e.detail || 0) * 40;
      }
      this.handleScroll(delta);
    },
    handleScroll(offset) {
      const outerWidth = this.$refs.scrollOuter.offsetWidth;
      const bodyWidth = this.$refs.scrollBody.offsetWidth;
      if (offset > 0) {
        this.tagBodyLeft = Math.min(0, this.tagBodyLeft + offset);
      } else {
        if (outerWidth < bodyWidth) {
          if (this.tagBodyLeft < -(bodyWidth - outerWidth)) {
            this.tagBodyLeft = this.tagBodyLeft;
          } else {
            this.tagBodyLeft = Math.max(this.tagBodyLeft + offset, outerWidth - bodyWidth);
          }
        } else {
          this.tagBodyLeft = 0;
        }
      }
    },
    handleTagsOption(type) {
      if (type.includes('all')) {
        // 关闭所有，除了home
        const res = this.list.filter(item => item.name === 'home.index');
        this.$emit('on-close', res, 'all');
      } else if (type.includes('others')) {
        // 关闭除当前页和home页的其他页
        const res = this.list.filter(item => routeEqual(this.currentRouteObj, item)
          || item.name === 'home.index');
        this.$emit('on-close', res, 'others', this.currentRouteObj);
        setTimeout(() => {
          this.getTagElementByRoute(this.currentRouteObj);
        }, 100);
      }
    },
    handleClose(current) {
      if (current.meta && current.meta.beforeCloseName) {
        this.$confirm('是否确认关闭此标签', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          this.close(current);
        });
      } else {
        this.close(current);
      }
    },
    close(route) {
      const res = this.list.filter(item => !routeEqual(route, item));
      this.$emit('on-close', res, undefined, route);
    },
    handleClick(item) {
      this.$emit('input', item);
    },
    isCurrentTag(item) {
      return routeEqual(this.currentRouteObj, item);
    },
    moveToView(tag) {
      const outerWidth = this.$refs.scrollOuter.offsetWidth;
      const bodyWidth = this.$refs.scrollBody.offsetWidth;
      if (bodyWidth < outerWidth) {
        this.tagBodyLeft = 0;
      } else if (tag.offsetLeft < -this.tagBodyLeft) {
        // 标签在可视区域左侧
        this.tagBodyLeft = -tag.offsetLeft + this.outerPadding;
      } else if (tag.offsetLeft > -this.tagBodyLeft
                 && tag.offsetLeft + tag.offsetWidth < -this.tagBodyLeft + outerWidth) {
        // 标签在可视区域
        this.tagBodyLeft = Math.min(
          0,
          outerWidth - tag.offsetWidth - tag.offsetLeft - this.outerPadding);
      } else {
        // 标签在可视区域右侧
        this.tagBodyLeft = -(tag.offsetLeft - (outerWidth - this.outerPadding - tag.offsetWidth));
      }
    },
    getTagElementByRoute(route) {
      this.$nextTick(() => {
        this.refsTag = this.$refs.tagsPageOpened;
        this.refsTag.forEach((item, index) => {
          if (routeEqual(route, item.$attrs['data-route-item'])) {
            const tag = this.refsTag[index].$el;
            this.moveToView(tag);
          }
        });
      });
    },
    closeMenu() {
      this.visible = false;
    },
  },
  watch: {
    '$route'(to) {
      this.getTagElementByRoute(to);
    },
    visible(value) {
      if (value) {
        document.body.addEventListener('click', this.closeMenu);
      } else {
        document.body.removeEventListener('click', this.closeMenu);
      }
    },
  },
  mounted() {
    setTimeout(() => {
      this.getTagElementByRoute(this.$route);
    }, 200);
  },
};
</script>

<style lang="scss">
.tags-nav-component {
  padding: 0;
  height: 40px;
  background: #f0f0f0;
  position: relative;
  .el-tag--dot {
    height: 32px;
    line-height: 32px;
    border: 1px solid #e8eaec;
    border-radius: 3px;
    margin: 2px 4px 2px 0;
    color: #515a6e;
    background: #fff;
    padding: 0 12px;
    cursor: pointer;
    .dot {
      display: inline-block;
      width: 12px;
      height: 12px;
      margin-right: 8px;
      position: relative;
      top: 1px;
      border-radius: 50%;
      background: #e8eaec;
    }
    &.active {
      .dot {
        background: #2d8cf0;
      }
    }
    .el-icon-close {
      background-color: #fff;
      color: #666;
      margin-left: 12px;
      &:hover {
        opacity: .6;
      }
    }
  }
  .no-select{
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  .size{
    width: 100%;
    height: 100%;
  }
  .no-select,
  .size,
  .close-con{
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
    width: 32px;
    background: #fff;
    text-align: center;
    z-index: 10;
  }
  .close-con {
    padding-top: 12px;
    box-sizing: border-box;
  }
  .btn-con{
    position: absolute;
    top: 0px;
    height: 100%;
    background: #fff;
    padding-top: 5px;
    box-sizing: border-box;
    z-index: 10;
    button{
      padding: 6px 4px;
      line-height: 14px;
      text-align: center;
    }
    &.left-btn{
      left: 0px;
    }
    &.right-btn{
      right: 32px;
      border-right: 1px solid #F0F0F0;
    }
  }
  .scroll-outer{
    position: absolute;
    left: 24px;
    right: 57px;
    top: 0;
    bottom: 0;
    overflow: hidden;
    // box-shadow: 0px 0 3px 2px rgba(100,100,100,.1) inset;
    .scroll-body{
      height: calc(100% - 1px);
      display: inline-block;
      padding: 1px 4px 0;
      position: absolute;
      overflow: visible;
      white-space: nowrap;
      transition: left .3s ease;
      .ivu-tag-dot-inner{
        transition: background .2s ease;
      }
    }
  }
}
</style>
