import { OK, UNPROCESSABLE_ENTITY } from '../util';

import axios from "axios";

const state = {
  user: null, // ログイン済みユーザーを保持する
  apiStatus: null, //API呼び出しが成功したか否かを表す
  loginErrorMessages: null // エラーメッセージを入れるステート
};

const getters = {
  check: state => !! state.user,
  username: state => state.user ? state.user.name : ''
};

const mutations = {
  // userステートの値を更新する（第一引数は必ずステート）
  setUser(state, user){
    state.user = user;
  },
  // API通信が成功したか、失敗したかをセットする
  setApiStatus(state, status){
    state.apiStatus = status;
  },
  // ログインのバリデーションエラーメッセージをセットする
  setLoginErrorMessages(state, messages){
    state.loginErrorMessages = messages;
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
    context.commit('setApiStatus', null);
    // axios.postが失敗した場合err.responseがresponseに代入される
    const response = await axios.post('/api/login', data).catch(err => err.response || err);
    // responseコードで判定
    if(response.status === OK){
      context.commit('setApiStatus', true);
      context.commit('setUser', response.data);
      return false;
    }
    // レスポンスでエラーだった場合
    context.commit('setApiStatus', false);
    if(response.status === UNPROCESSABLE_ENTITY){
      // バリデーションエラーだった場合
      context.commit('setLoginErrorMessages', response.data.errors);
    }else{
      // 通信に失敗したとき、errorモジュールのsetCodeミューテーションをcommitする
      // ストアモジュールから別のモジュールのミューテーションをcommitする場合は、第三引数に{root:true}が必要
      context.commit('error/setCode', response.status, {root: true});
    }
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