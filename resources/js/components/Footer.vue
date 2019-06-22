<template>
  <footer class="footer">
    <button v-if="isLogin" class="button button--link" @click="logout">
      Logout
    </button>
    <router-link v-else class="button button--link" to="/login">
      Login / Register
    </router-link>
  </footer>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
  methods: {
    async logout(){
      await this.$store.dispatch('auth/logout');
      if(this.apiStatus){
        this.$router.push('/login');
      }
    }
  },
  computed: {
    // isLogin(){
    //   return this.$store.getters['auth/check'];
    // }
    ...mapState({
      apiStatus: state => state.auth.apiStatus
    }),
    ...mapGetters({
      isLogin: 'auth/check'
    })
  }
}
</script>