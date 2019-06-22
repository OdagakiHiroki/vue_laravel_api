import Vue from 'vue';
import VueRouter from 'vue-router';

// ページコンポーネントをインポートする
import PhotoList from './pages/PhotoList.vue';
import Login from './pages/Login.vue';

// vuexのstoreをインポート
import store from './store';

// VueRouterプラグインを使用
// <RouterView />コンポーネントなどを使うことができる
Vue.use(VueRouter);

// パスとコンポーネントのマッピング
const routes = [
  {
    path: '/',
    component: PhotoList,
    // /loginにアクセスされてLoginコンポーネントに切り替わる直前に呼び出される
    beforeEnter(to, from, next){
      if(store.getters['auth/check']){
        // 認証済みなら予定通り、'/'でvue-routerで定義されたトップページに飛ぶ
        next()
      }else{
        // 認証済みでない場合は/loginへ切り替わる
        next('/login')
      }
    }
  },
  {
    path: '/login',
    component: Login,
    // /loginにアクセスされてLoginコンポーネントに切り替わる直前に呼び出される
    beforeEnter(to, from, next){
      if(store.getters['auth/check']){
        // 認証済みなら/loginではなく、'/'でvue-routerで定義されたトップページに飛ぶ
        next('/')
      }else{
        // 認証済みでない場合は予定通り/loginへ切り替わる
        next()
      }
    }
  }
];

// VueRouterインスタンスを作成する
const router = new VueRouter({
  mode: 'history',
  routes
});

// VueRouterインスタンスをapp.jsでインポートするためにエクスポートする
export default router;
