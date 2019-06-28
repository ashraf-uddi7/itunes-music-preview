<template>
  <div>
    <header>
      <div class="container">
        <div class="row">
          <div class="c6-xs c4-md c3-lg">
            <h2 class="logo">
              Pontomais Music
            </h2>
          </div>
          <div class="c6-xs c8-md c9-lg">
            <input type="text">
          </div>
        </div>
      </div>
    </header>
    <div class="container">
      <router-view />
    </div>
    <div />
  </div>
</template>

<style lang="scss">
@import '../assets/style/app.scss';
@import '../assets/style/responsive.scss';
</style>
