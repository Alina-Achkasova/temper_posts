import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { createStore } from 'vuex';
import HistoryItem from './HistoryItem.vue';

describe('HistoryItem', () => {
  let mockStore;

  beforeEach(() => {
    mockStore = createStore({
      state() {
        return {
          posts: [{ id: 123, postId: 456, title: 'hello', body: 'world' }],
          historyItems: [
            { postId: 2, oldIndex: 3, newIndex: 4 },
            { postId: 4, oldIndex: 7, newIndex: 8 },
          ],
        };
      },
    });
  });

  it('is a vue instance', () => {
    const wrapper = mount(HistoryItem, {
      global: {
        plugins: [mockStore],
      },
    });

    expect(!!wrapper.vm).toBeTruthy();
  });

  it('should call timeTravel function on a chevron click', async () => {
    const wrapper = mount(HistoryItem, {
      global: {
        plugins: [mockStore],
      },
    });

    vi.spyOn(wrapper.vm, 'timeTravel');

    await wrapper.find('button').trigger('click');

    expect(wrapper.vm.timeTravel).toHaveBeenCalled();
  });

  it('should dispatch timeTravel action', () => {
    vi.spyOn(mockStore, 'dispatch');

    const wrapper = mount(HistoryItem, {
      global: {
        plugins: [mockStore],
      },
      propsData: {
        postId: 23,
        oldIndex: 56,
        newIndex: 57,
        index: 8,
      },
    });

    wrapper.vm.timeTravel();

    expect(mockStore.dispatch).toHaveBeenCalledWith('timeTravel', { index: 8 });
  });
});
