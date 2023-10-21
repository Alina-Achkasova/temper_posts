<template>
  <div
    class="flex justify-between px-4 shadow-md rounded-lg bg-white text-black my-4"
    ref="post"
  >
    <div class="p-4">
      <span class="align-middle text-slate-500 font-medium">Post {{ id }}</span>
    </div>
    <div class="inline-block flex flex-col justify-center py-1">
      <span
        @click="move(index, 'up')"
        v-if="index > 0"
        class="cursor-pointer"
        :class="{ 'mb-auto': index < amountOfShownPosts - 1 }"
        data-test="chevronUp"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          class="w-5 h-5 text-indigo-500"
        >
          <path
            fill-rule="evenodd"
            d="M14.77 12.79a.75.75 0 01-1.06-.02L10 8.832 6.29 12.77a.75.75 0 11-1.08-1.04l4.25-4.5a.75.75 0 011.08 0l4.25 4.5a.75.75 0 01-.02 1.06z"
            clip-rule="evenodd"
          />
        </svg>
      </span>
      <span
        @click="move(index, 'down')"
        v-if="index < amountOfShownPosts - 1"
        class="cursor-pointer"
        data-test="chevronDown"
      >
        <svg
          xmlns=" http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          class="w-5 h-5 text-indigo-500"
        >
          <path
            fill-rule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
            clip-rule="evenodd"
          />
        </svg>
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStore } from 'vuex';

const store = useStore();

const props = defineProps<{
  id: number;
  index: number;
  amountOfShownPosts: number;
}>();

function move(index: number, direction: string) {
  store.dispatch('movePost', { oldIndex: index, direction, postId: props.id });
}
</script>
