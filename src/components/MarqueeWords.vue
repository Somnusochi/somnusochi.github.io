<template>
  <h3 class="marquee-words">
    <span
      class="char"
      v-for="(char, index) in words"
      :key="char"
      :style="{ animationDelay: `${index * 0.2}s` }">
      {{ char }}
    </span>
  </h3>
</template>

<script setup lang="ts">
  const props = defineProps<{
    words: string;
  }>();
  const words = ref(props.words);
</script>

<style lang="scss" scoped>
  @keyframes changeColor {
    to {
      color: #000;
    }
  }
  .marquee-words {
    font-size: 32px;
    font-weight: 400;
    line-height: 1;
    margin-right: auto;
    display: flex;
    cursor: default;
  }
  .char {
    color: #fff;
    animation: changeColor 1s infinite ease-in-out alternate forwards;
  }
</style>
