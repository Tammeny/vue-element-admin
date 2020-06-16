本项目的代码规范都应遵循[Airbnb](https://github.com/airbnb/javascript)标准与
[Vue风格指南](https://cn.vuejs.org/v2/style-guide/)，其中Airbnb标准需严格遵循，否则程序会报错。

此外，还应遵循以下规则：

#### 1.路由与pages目录结构应对应
在命名路由和pages目录结构时，应该保持路由path与pages下对应的页面路径相对应，以便更快的根据路由定位到具体的页面文件。
```js
// bad
{
  path: '/home',
  name: 'home',
  component: () => import('@/pages/Home/HomePage'),
},

// good
{
  path: '/home',
  name: 'home.index',
  component: () => import('@/pages/home/index'),
},

```
