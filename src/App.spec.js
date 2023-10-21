import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { createStore } from 'vuex';
import App from './App.vue';

describe('App', () => {
  let mockStore;
  let wrapper;

  beforeEach(() => {
    mockStore = createStore({
      state() {
        return {
          posts: [
            { id: 1, postId: 2, title: 'hello1', body: 'world2' },
            { id: 3, postId: 4, title: 'hello3', body: 'world4' },
            { id: 5, postId: 6, title: 'hello5', body: 'world6' },
            { id: 7, postId: 8, title: 'hello7', body: 'world8' },
            { id: 9, postId: 10, title: 'hello9', body: 'world10' },
            { id: 11, postId: 12, title: 'hello11', body: 'world12' },
          ],
          historyItems: [],
        };
      },
    });
    mockStore.getters = {
      getPosts: mockStore.state.posts,
      getHistoryItems: mockStore.state.historyItems,
    };
    wrapper = mount(App, {
      global: {
        plugins: [mockStore],
      },
    });
  });

  it('is a vue instance', () => {
    expect(!!wrapper.vm).toBeTruthy();
  });

  it('should render 5 posts and no history items', async () => {
    expect(wrapper.findAll('[test-data="singlePost"]').length).toBe(5);
    expect(wrapper.findAll('[test-data="historyItem"]').length).toBe(0);
  });

  it('should still render 5 posts and 2 history items', async () => {
    mockStore.state.historyItems.push(
      { postId: 2, oldIndex: 3, newIndex: 4 },
      { postId: 4, oldIndex: 7, newIndex: 8 }
    );
    wrapper = mount(App, {
      global: {
        plugins: [mockStore],
      },
    });

    expect(wrapper.findAll('[test-data="singlePost"]').length).toBe(5);
    expect(wrapper.findAll('[test-data="historyItem"]').length).toBe(2);
  });
});
