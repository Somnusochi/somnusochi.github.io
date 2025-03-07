<template>
  <div class="home">
    <div class="container" @click="goToAbout">
      <h1 class="slogan">With simple hearts, do what you love.</h1>
      <p>Somnusochi's Home</p>
    </div>
  </div>
</template>

<script setup lang="ts">
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
  }
</style>
