<!--
 * @Date: 2023-01-08 11:04:57
 * @Author: liting luz.liting@gmail.com
 * @LastEditors: liting luz.liting@gmail.com
 * @LastEditTime: 2023-01-08 13:05:01
 * @FilePath: /search/components/SearchSelect.vue
-->
<template>
  <ul class="hidden">
    <!-- fix can't dynamic import icon class  -->
    <li class="i-ri:baidu-fill"></li>
    <li class="i-bxl:google"></li>
  </ul>
  <ClientOnly>
    <el-popover popper-class="search-select__popover" placement="bottom" trigger="focus" :effect="colorMode.value" width="auto">
      <template #reference>
        <el-button class="search-select__reference !w-6 !h-6 !border-0 !rounded-full !p-0" @click.stop
          ><div :class="props.modelValue.icon"></div
        ></el-button>
      </template>
      <ul class="search-select__content p-1 m-0">
        <li
          v-for="option in props.options"
          :key="option.icon"
          class="flex justify-center items-center gap-1 my-1 cursor-pointer hover:text-sky-400"
          @click="handleSelect(option)"
        >
          <span class="inline-block" :class="option.icon"></span>
          <span>{{ option.name }}</span>
        </li>
      </ul>
    </el-popover>
  </ClientOnly>
</template>

<script lang="ts" setup>
const colorMode = useColorMode()

interface Props {
  modelValue: SearchInfo
  options: SearchInfo[]
}
const props = defineProps<Props>()
const emit = defineEmits(['update:modelValue'])

const handleSelect = (option: SearchInfo) => {
  emit('update:modelValue', Object.assign(props.modelValue, option))
}
</script>

<style lang="scss">
.search-select {
  &__popover {
    min-width: 64px !important;
    padding: 0 !important;
  }
}
</style>
