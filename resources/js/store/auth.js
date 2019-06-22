import Axios from "axios";

const state = {
  user: null // ログイン済みユーザーを保持する
};

const getters = {
  check: state => !! state.user,
  username: state => state.user ? state.user.name : ''
};

const mutations = {
  // userステートの値を更新する（第一引数は必ずステート）
  setUser(state, user){
    state.user = user;
  }
};

const actions = {
  // 会員登録APIを呼び出すregisterアクション（第一引数は必ずコンテキストオブジェクト）
  // contextの中にはmutationsを呼び出すためのcommitメソッドなどがある
  async register(context, data){
    const response = await axios.post('/api/register', data);
    context.commit('setUser', response.data);
  },
  async login(context, data){
    const response = await axios.post('/api/login', data);
    context.commit('setUser', response.data);
  },
  async logout(context, data){
    const response = await axios.post('/api/logout', data);
    context.commit('setUser', null);
  },
  async currentUser(context){
    const response = await axios.get('/api/user');
    const user = response.data || null;
    context.commit('setUser', user);
  }
};

export default {
  namespaced: true, //モジュール名で区別できるようにする
  state,
  getters,
  mutations,
  actions
};