<template>
  <div class="home">
    <div class="container" @click="goToAbout">
      <h1 class="slogan">
        <span
          class="char"
          v-for="(char, index) in slogan"
          :key="char"
          :style="{ animationDelay: `${getDelay(index)}ms` }">
          {{ char }}
        </span>
      </h1>
      <p class="tips">Somnusochi's Home</p>
    </div>
  </div>
</template>

<script setup lang="ts">
  const slogan = ref([
    'With',
    'simple',
    'hearts,',
    'do',
    'what',
    'you',
    'love.',
  ]);
  const getDelay = (index: number) => {
    const base = 200 * (((index + 1) % 2) + 1);
    const random = Math.random() * 100 - 50;
    return base + random;
  };
  const goToAbout = () => {
    window.location.href = '/about';
  };
</script>

<style lang="scss" scoped>
  .home {
    background: light-dark(#fff, #000);
    display: grid;
    place-items: center;
    min-height: 100vh;
    &::before {
      --size: 45px;
      --line: color-mix(in hsl, canvasText, transparent 70%);
      content: '';
      height: 100vh;
      width: 100vw;
      position: fixed;
      background: linear-gradient(
            90deg,
            var(--line) 1px,
            transparent 1px var(--size)
          )
          50% 50% / var(--size) var(--size),
        linear-gradient(var(--line) 1px, transparent 1px var(--size)) 50% 50% /
          var(--size) var(--size);
      -webkit-mask: linear-gradient(-20deg, transparent 50%, white);
      mask: linear-gradient(-20deg, transparent 50%, white);
      top: 0;
      transform-style: flat;
      pointer-events: none;
    }
    .container {
      cursor: pointer;
    }
    h1 {
      color: var(--vp-c-text-2);
      font-size: 48px;
      font-weight: 500;
      margin: -10vh 0 20px;
    }
    p {
      text-align: end;
    }

    .slogan {
      .char {
        opacity: 0;
        animation: fadeIn 1300ms ease-in forwards;
        display: inline-block;
        margin-right: 10px;
      }
    }
    .tips {
      font-size: 16px;
      opacity: 0;
      animation: fadeIn 1300ms ease-in forwards;
      animation-delay: 400ms;
    }

    @keyframes fadeIn {
      0% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }
  }
</style>
