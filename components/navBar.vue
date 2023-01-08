<!--
 * @Date: 2023-01-07 15:35:23
 * @Author: liting luz.liting@gmail.com
 * @LastEditors: liting luz.liting@gmail.com
 * @LastEditTime: 2023-01-08 13:24:44
 * @FilePath: /search/components/navBar.vue
-->
<script lang="ts" setup>
const colorMode = useColorMode()
</script>

<template>
  <header class="search-navbar bg-slate-100/50 dark:bg-slate-900/50 backdrop-blur h-16 px-8 flex justify-between items-center">
    <NuxtLink class="text-3xl text-slate-900 dark:text-slate-200 font-bold" to="/">Search</NuxtLink>
    <div class="flex justify-end items-center gap-4">
      <div>
        <div
          v-show="colorMode.preference === 'system'"
          class="i-material-symbols:desktop-windows text-3xl icon-btn"
          @click="colorMode.preference = 'light'"
        ></div>
        <div
          v-show="colorMode.preference === 'light'"
          class="i-material-symbols:light-mode text-3xl icon-btn"
          @click="colorMode.preference = 'dark'"
        ></div>
        <div
          v-show="colorMode.preference === 'dark'"
          class="i-material-symbols:dark-mode text-3xl icon-btn"
          @click="colorMode.preference = 'system'"
        ></div>
      </div>
      <NuxtLink to="https://github.com/liting-yes/search.git" target="__blank">
        <div class="i-mdi:github text-3xl icon-btn"></div>
      </NuxtLink>
    </div>
  </header>
</template>
