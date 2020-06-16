import Vue from 'vue';

// 默认注入的组件
const components = [];

const install = (v) => {
  components.map(component => v.component(component.name, component));
};

if (typeof window !== 'undefined') {
  install(Vue);
}
