<template>
  <div class="grid sm:grid-cols-1 lg:grid-cols-3 xl:grid-cols-2 gap-x-8 m-8">
    <div>
      <h4 class="text-xl text-white font-semibold">Sortable Post List</h4>
      <TransitionGroup tag="ul" v-if="getPosts.length">
        <li
          v-for="(post, index) in getPosts"
          :key="post"
          test-data="singlePost"
        >
          <SinglePost
            :id="post.id"
            :index="index"
            :amount-of-shown-posts="amountOfShownPosts"
          >
          </SinglePost>
        </li>
      </TransitionGroup>
    </div>
    <div
      class="bg-neutral-100 rounded-lg shadow-md h-fit lg:col-span-2 xl:col-span-1"
    >
      <h4 class="p-5 bg-white mb-0 rounded-t-lg text-l font-semibold">List of actions commited</h4>
      <TransitionGroup tag="ul" class="p-6 relative" name="list">
        <li
          v-for="(historyItem, index) in getHistoryItems"
          :key="historyItem"
          test-data="historyItem"
        >
          <HistoryItem
            :postId="historyItem.postId"
            :oldIndex="historyItem.oldIndex"
            :newIndex="historyItem.newIndex"
            :index="index"
          >
          </HistoryItem>
        </li>
      </TransitionGroup>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue';
import { useStore } from 'vuex';
import SinglePost from './components/SinglePost.vue';
import HistoryItem from './components/HistoryItem.vue';

const amountOfShownPosts = 5;
const store = useStore();

const getPosts = computed(() =>
  store.getters.getPosts.slice(0, amountOfShownPosts)
);
const getHistoryItems = computed(() => store.getters.getHistoryItems);

onMounted(() => {
  store.dispatch('fetchPosts');
});
</script>
