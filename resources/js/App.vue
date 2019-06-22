<template>
  <div>
    <header>
      <Navbar></Navbar>
    </header>
    <main>
      <div class="container">
        <router-view></router-view>
      </div>
    </main>
    <Footer></Footer>
  </div>
</template>

<script>
import { INTERNAL_SERVER_ERROR } from './util';

import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';

export default {
  components: {
    Navbar,
    Footer
  },
  computed: {
    errorCode(){
      return this.$store.state.error.code;
    }
  },
  watch: {
    // computedで算出したerrorCodeを監視
    errorCode: {
      handler(val){
        if(val === INTERNAL_SERVER_ERROR){
          this.$router.push('/500');
        }
      },
      immediate: true
    },
    // $routeの変更を検知し、errorストアモジュールのsetCodeでnullを設定
    $route(){
      this.$store.commit('error/setCode', null);
    }
  }
}
</script>