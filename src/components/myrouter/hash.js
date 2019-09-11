let Vue;
class Router {
  static install(_Vue) {
    console.log(_Vue);
    Vue = _Vue;
    Vue.mixin({
      beforeCreate() {
        // Vue.prototype.$kkbrouter = '来了小老弟，我是路由'
        console.log('beforeCreate');
        console.log(window.history);
        if (this.$options.router) {
          // 这是入口
          // 启动路由
          console.log('$options', this.$options);
          Vue.prototype.$krouter = this.$options.router;

          this.$options.router.init();
          console.log(typeof this.$options.router.init);
          // 有时候路由需要动态跳转
          // this.$router.push('/about')
        }
        // this.init()
      }
    });
  }
  constructor(options) {
    console.log('options', options);
    this.$options = options;
    this.routeMap = {};
    // 使用Vue的响应式机制，路由切换的时候，做一些响应
    this.app = new Vue({
      data: {
        // 默认根目录
        current: '/'
      }
    });
  }
  init() {
    console.log('dsd');
    // 1. 监听hashchange事件
    this.bindEvents();
    this.initComponent();
    this.createRouteMap();
  }
  initComponent() {
    console.log('initComponent');
    Vue.component('router-view', {
      render: h => {
        const component = this.routeMap[this.app.current].component;
        // 使用h新建一个虚拟dom
        return h(component);
      }
    });
    Vue.component('router-link', {
      // props:['to'],
      props: {
        to: String
      },
      render(h) {
        // h == createElement
        // h三个参数，
        // 组件名
        // 参数
        // 子元素
        console.log('slots', this.$slots);
        return h(
          'a',
          {
            attrs: {
              href: '#' + this.to
            }
          },
          [this.$slots.default]
        );
      }
      // import vue/dist/vue.js
      // template最终也是转换成render来执行
      // 需要compile
      // template:"<a :href='to'><slot></slot></a>"
    });
  }
  createRouteMap() {
    this.$options.routes.forEach(item => {
      this.routeMap[item.path] = item;
    });
  }
  bindEvents() {
    console.log('绑定事件');
    window.addEventListener('hashchange', this.onHashChange.bind(this), false);
    window.addEventListener('load', this.onHashChange.bind(this), false);
  }
  getHash() {
    return window.location.hash.slice(1) || '/';
  }
  push(url) {
    // hash模式直接复制
    window.location.hash = url;
    // history模式 使用pushState
  }
  getFrom(e) {
    let from, to;
    if (e.newURL) {
      // 这是一个hashchange
      from = e.oldURL.split('#')[1];
      to = e.newURL.split('#')[1];
    } else {
      // 这是一个第一次加载触发的
      from = '';
      to = this.getHash();
    }
    return { from, to };
  }
  onHashChange(e) {
    console.log(e);
    // 路由跳转马上开始
    // console.log('路由准备跳转')
    // 获取当前的哈希值
    let hash = this.getHash();
    console.log(window.location.hash);
    console.log(hash);
    let router = this.routeMap[hash];
    let { from, to } = this.getFrom(e);
    // // 修改this.app.current 借用了vue的响应式机制
    // // console.log('hash变了')
    console.log(this.app);
    if (router.beforeEnter) {
      // 有生命周期
      router.beforeEnter(from, to, () => {
        this.app.current = hash;
      });
    } else {
      this.app.current = hash;
    }
  }
}

export default Router;
