<template>
  <AnimatePresence>
    <motion.div
      class="flip-words"
      :key="currentWord"
      :initial="{
        opacity: 0,
        y: 10,
      }"
      :animate="{
        opacity: 1,
        y: 0,
      }"
      :transition="{
        type: 'spring',
        stiffness: 100,
        damping: 10,
      }"
      :exit="{
        opacity: 0,
        y: -40,
        x: 40,
        filter: 'blur(10px)',
        scale: 2,
        position: 'absolute',
      }">
      <motion.span
        class="word"
        v-for="(word, wordIndex) in currentWord.split(' ')"
        :key="word + wordIndex"
        :initial="{
          opacity: 0,
          y: 10,
          filter: 'blur(8px)',
        }"
        :animate="{
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
        }"
        :transition="{
          delay: wordIndex * 0.3,
          duration: 0.3,
        }">
        <motion.span
          class="char"
          v-for="(char, charIndex) in word.split('')"
          :key="char + charIndex"
          :initial="{
            opacity: 0,
            y: 10,
            filter: 'blur(8px)',
          }"
          :animate="{
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
          }"
          :transition="{
            delay: wordIndex * 0.3 + charIndex * 0.05,
            duration: 0.2,
          }">
          {{ char }}
        </motion.span>
        <span class="inline-block">&nbsp;</span>
      </motion.span>
    </motion.div>
  </AnimatePresence>
</template>

<script setup lang="ts">
  import { AnimatePresence, motion } from 'motion-v';
  const props = defineProps<{
    words: Array<string>;
    duration?: number;
  }>();

  const currentWord = ref(props.words[0] || 'flip');
  const duration = ref(props.duration || 3000);
  let intervalId: NodeJS.Timeout | null = null;

  const startAnimation = () => {
    const wordIndex = props.words.indexOf(currentWord.value);
    const nextWord = props.words[(wordIndex + 1) % props.words.length];
    currentWord.value = nextWord;
  };

  onMounted(() => {
    intervalId = setInterval(startAnimation, duration.value);
  });

  onUnmounted(() => {
    if (intervalId) {
      clearInterval(intervalId);
    }
  });
</script>

<style lang="scss" scoped>
  .flip-words {
    position: relative;
    display: inline-block;
    font-size: 32px;
  }

  .word {
    display: inline-block;
    white-space: nowrap;
  }

  .char {
    display: inline-block;
  }
</style>
