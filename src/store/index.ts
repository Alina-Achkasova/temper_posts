import { createStore } from 'vuex';
import axios from 'axios';
import PostModel from '../models/postModel';
import HistoryItemModel from '../models/historyItemModel';

export default createStore({
  state: {
    posts: Array<PostModel>(),
    historyItems: Array<HistoryItemModel>(),
  },

  mutations: {
    SET_POSTS(state, posts: Array<PostModel>) {
      state.posts = posts;
    },

    SET_HISTORY_ITEMS(state, historyItems: Array<HistoryItemModel>) {
      state.historyItems = historyItems;
    },
  },

  actions: {
    async fetchPosts({ commit }) {
      try {
        const response = await axios.get(
          'https://jsonplaceholder.typicode.com/posts'
        );
        commit('SET_POSTS', response.data);
      } catch (error) {
        console.log(error);
      }
    },

    movePost({ commit, dispatch }, payload) {
      const posts = this.state.posts;
      const { oldIndex, direction, postId, isTimeTravel } = payload;
      const newIndex = direction === 'up' ? oldIndex - 1 : oldIndex + 1;
      [posts[oldIndex], posts[newIndex]] = [posts[newIndex], posts[oldIndex]];
      commit('SET_POSTS', posts);
      if (!isTimeTravel) {
        dispatch('addHistoryItem', { postId, oldIndex, newIndex });
      }
    },

    addHistoryItem({ commit }, payload) {
      const historyItems = this.state.historyItems;
      const { postId, oldIndex, newIndex } = payload;
      historyItems.unshift({ postId, oldIndex, newIndex });
      commit('SET_HISTORY_ITEMS', historyItems);
    },

    timeTravel({ commit, dispatch }, payload) {
      const historyItems = this.state.historyItems;
      const { index } = payload;
      for (let i = 0; i < index + 1; i++) {
        const { postId, oldIndex, newIndex } = historyItems[i];
        const direction = oldIndex - newIndex > 0 ? 'down' : 'up';
        dispatch('movePost', {
          oldIndex: newIndex,
          direction,
          postId,
          isTimeTravel: true,
        });
      }
      historyItems.splice(0, index + 1);
      commit('SET_HISTORY_ITEMS', historyItems);
    },
  },

  getters: {
    getPosts: (state) => state.posts,
    getHistoryItems: (state) => state.historyItems,
  },
});
