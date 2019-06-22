import Axios from "axios";

const state = {
  user: null // ログイン済みユーザーを保持する
};

const getters = {};

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
  }
};

export default {
  namespaced: true, //モジュール名で区別できるようにする
  state,
  getters,
  mutations,
  actions
};