import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createStore } from 'vuex'
import SinglePost from './SinglePost.vue'

describe('SinglePost', () => {
  let mockStore;

  beforeEach(() => {
    mockStore = createStore({
      state() {
        return {
          posts: [{ id: 123, postId: 456, title: 'hello', body: 'world' }],
          historyItems: [{ postId: 2, oldIndex: 3, newIndex: 4 }, { postId: 4, oldIndex: 7, newIndex: 8 }]
        }
      },
    })

  })

  it('is a vue instance', () => {
    const wrapper = mount(SinglePost, {
      global: {
        plugins: [mockStore],
      },
      propsData: {
        id: 9,
        index: 12,
        amountOfShownPosts: 100,
      }
    })

    expect(!!wrapper.vm).toBeTruthy();
  })

  it('should call move function on a chevron click', async () => {
    const wrapper = mount(SinglePost, {
      global: {
        plugins: [mockStore],
      },
      propsData: {
        id: 9,
        index: 12,
        amountOfShownPosts: 100,
      }
    })
    
    vi.spyOn(wrapper.vm, 'move');

    await wrapper.find('[data-test="chevronUp"]').trigger("click");

    expect(wrapper.vm.move).toHaveBeenCalledWith(12, 'up');

    await wrapper.find('[data-test="chevronDown"]').trigger("click");

    expect(wrapper.vm.move).toHaveBeenCalledWith(12, 'down');
  })

  it('should render only chevron up', () => {
    const wrapper = mount(SinglePost, {
      global: {
        plugins: [mockStore],
      },
      propsData: {
        id: 9,
        index: 12,
        amountOfShownPosts: 10,
      }
    })

    expect(wrapper.find('[data-test="chevronUp"]').exists()).toBeTruthy();
    expect(wrapper.find('[data-test="chevronDown"]').exists()).toBeFalsy();
  })

  it('should render only chevron down', () => {
    const wrapper = mount(SinglePost, {
      global: {
        plugins: [mockStore],
      },
      propsData: {
        id: 9,
        index: 0,
        amountOfShownPosts: 55,
      }
    })

    expect(wrapper.find('[data-test="chevronUp"]').exists()).toBeFalsy();
    expect(wrapper.find('[data-test="chevronDown"]').exists()).toBeTruthy();
  })

  it('should dispatch movePost action', () => {
    vi.spyOn(mockStore, 'dispatch');

    const wrapper = mount(SinglePost, {
      global: {
        plugins: [mockStore],
      },
      propsData: {
        id: 9,
        index: 0,
        amountOfShownPosts: 55,
      }
    })

    wrapper.vm.move(45, 'down');

    expect(mockStore.dispatch).toHaveBeenCalledWith("movePost", { oldIndex: 45, direction: 'down', postId: 9 });
  })
})