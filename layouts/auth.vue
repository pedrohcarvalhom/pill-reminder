<template>
  <div class="w-full h-screen bg">
    <slot/>
  </div>
</template>

<style>
.bg {
  background-image: url('/img/background.png');
  background-size: cover;
  background-position: center;
}
</style>