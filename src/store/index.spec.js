import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { createStore } from 'vuex';
import store from './index';
import axios from 'axios';

vi.mock('axios');

describe('Store', () => {
  let mockStore;

  beforeEach(() => {
    beforeEach(() => {
      axios.get.mockReset()
    })
    mockStore = createStore({
      state() {
        return {
          posts: [{ id: 1, userId: 2, title: 'hello1', body: 'world2' },
          { id: 3, userId: 4, title: 'hello3', body: 'world4' },
          { id: 5, userId: 6, title: 'hello5', body: 'world6' },
          { id: 7, userId: 8, title: 'hello7', body: 'world8' },
          { id: 9, userId: 10, title: 'hello9', body: 'world10' },
          { id: 11, userId: 12, title: 'hello11', body: 'world12' }],
          historyItems: []
        }
      }
    })
  })

  it('should commit mutations and return updated posts and historyItems', () => {
    const newPosts = [{ id: 0, userId: 1, title: 'hello0', body: 'world1' },
    { id: 2, userId: 3, title: 'hello2', body: 'world3' }];
    const newHistoryItems = [{ postId: 2, oldIndex: 3, newIndex: 4 }, { postId: 4, oldIndex: 7, newIndex: 8 }];

    store.commit('SET_POSTS', newPosts);

    expect(store.getters.getPosts).toEqual(newPosts);

    store.commit('SET_HISTORY_ITEMS', newHistoryItems);

    expect(store.getters.getHistoryItems).toEqual(newHistoryItems);
  })

  it('should fetch posts', async () => {
    axios.get.mockResolvedValue({
      data: mockStore.state.true,
    })
    console.log('##############', store)
    const commit = vi.fn()

    await store.dispatch("fetchPosts", { commit });

    expect(axios.get).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/posts');
    expect(store.getters.getPosts).toEqual(mockStore.state.true);
  })

  it("should catch an error", async () => {
    store.commit('SET_POSTS', []);
    axios.get.mockReturnValue(Promise.reject("API Error occurred."))
    const commit = vi.fn();

    await store.dispatch("fetchPosts", { commit });

    expect(store.getters.getPosts).toEqual([]);
  });

  it("should add a history item", async () => {
    store.commit('SET_HISTORY_ITEMS', []);
    await store.dispatch("addHistoryItem", { postId: 1, oldIndex: 2, newIndex: 3 });

    expect(store.getters.getHistoryItems).toEqual([{ postId: 1, oldIndex: 2, newIndex: 3 }]);
  })

  it("should travel back in time", async () => {
    store.commit('SET_HISTORY_ITEMS', [{ postId: 3, oldIndex: 1, newIndex: 0 }, { postId: 4, oldIndex: 3, newIndex: 4 }, { postId: 2, oldIndex: 1, newIndex: 2 }]);
    await store.dispatch("timeTravel", { index: 1 });

    expect(store.getters.getHistoryItems).toEqual([{ postId: 2, oldIndex: 1, newIndex: 2 }]);
  })

  it("should move a post (full circle test)", async () => {
    store.commit('SET_POSTS', [{
      "userId": 1,
      "id": 1,
      "title": "title",
      "body": "body"
    },
    {
      "userId": 1,
      "id": 2,
      "title": "title",
      "body": "body"
    },
    {
      "userId": 1,
      "id": 3,
      "title": "title",
      "body": "body"
    },
    {
      "userId": 1,
      "id": 4,
      "title": "title",
      "body": "body"
    },
    {
      "userId": 1,
      "id": 5,
      "title": "title",
      "body": "body"
    }
    ]);
    store.commit('SET_HISTORY_ITEMS', []);

    await store.dispatch("movePost", { oldIndex: 1, direction: 'down', postId: 2 });
    await store.dispatch("movePost", { oldIndex: 3, direction: 'down', postId: 4 });
    await store.dispatch("movePost", { oldIndex: 1, direction: 'up', postId: 3 });

    expect(store.getters.getPosts).toEqual([
      {
        "userId": 1,
        "id": 3,
        "title": "title",
        "body": "body"
      },
      {
        "userId": 1,
        "id": 1,
        "title": "title",
        "body": "body"
      },
      {
        "userId": 1,
        "id": 2,
        "title": "title",
        "body": "body"
      },
      {
        "userId": 1,
        "id": 5,
        "title": "title",
        "body": "body"
      },
      {
        "userId": 1,
        "id": 4,
        "title": "title",
        "body": "body"
      }]);

    expect(store.getters.getHistoryItems).toEqual([{ postId: 3, oldIndex: 1, newIndex: 0 }, { postId: 4, oldIndex: 3, newIndex: 4 }, { postId: 2, oldIndex: 1, newIndex: 2 }]);
    await store.dispatch("timeTravel", { index: 1 });

    expect(store.getters.getHistoryItems).toEqual([{ postId: 2, oldIndex: 1, newIndex: 2 }]);
  })
})