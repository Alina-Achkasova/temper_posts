<template>
  <div class="px-2 py-4 text-black bg-white border border-collapse border-neutral-100 flex justify-between items-center"
    :class="{ 'rounded-t-lg': index === 0, 'rounded-b-lg': index === historyItems.length - 1 }"><span>Moved post {{
      postId
    }} from
      index {{ oldIndex }} to
      index {{ newIndex
      }}</span><button @click="timeTravel()" class="bg-green-custom font-bold py-2 px-4 rounded">
      Time travel
    </button></div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();
const historyItems = computed(() => {
  return store.state.historyItems;
});

const props = defineProps<({
  postId: number,
  oldIndex: number,
  newIndex: number,
  index: number,
})>()

function timeTravel() {
  store.dispatch("timeTravel", { index: props.index });
}
</script>