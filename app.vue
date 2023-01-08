<!--
 * @Date: 2023-01-03 23:40:11
 * @Author: liting luz.liting@gmail.com
 * @LastEditors: liting luz.liting@gmail.com
 * @LastEditTime: 2023-01-08 17:49:43
 * @FilePath: /search/app.vue
-->
<script lang="ts" setup>
const litingSearchRef = ref()
provide('litingSearchRef', litingSearchRef)
</script>

<template>
  <div
    ref="litingSearchRef"
    class="liting-search w-screen h-screen bg-slate-50 text-slate-900 dark:bg-slate-800 dark:text-slate-200"
  >
    <NuxtLayout>
      <NavBar></NavBar>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
