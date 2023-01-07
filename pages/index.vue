<!--
 * @Date: 2023-01-07 15:32:54
 * @Author: liting luz.liting@gmail.com
 * @LastEditors: liting luz.liting@gmail.com
 * @LastEditTime: 2023-01-07 17:57:45
 * @FilePath: /search/pages/index.vue
-->
<template>
  <div class="page-index mt-32 flex items-center flex-col gap-4">
    <div>
      <ElTag
        v-for="item in selectedListOption.items"
        :key="item.icon"
        class="mx-2 cursor-pointer"
        :class="selectedListOptionItem.label === item.label ? 'contrast-200 drop-shadow-md' : ''"
        :effect="(colorMode.value as ElTagEffect)"
        @click="selectOptionItem(item)"
      >
        <div class="flex items-center">
          <span class="inline-block" :class="item.icon" :type="selectedListOption.type"></span>
          <span>{{ item.label }}</span>
        </div>
      </ElTag>
    </div>
    <ElInput v-model="inputValue" class="!w-128">
      <template #prepend>
        <ClientOnly>
          <ElSelect
            v-model="selectedListOption"
            class="w-36"
            :validate-event="false"
            :effect="colorMode.value"
            @change="selectListOption"
          >
            <ElOption v-for="option in listOptions" :key="option.label" :label="option.label" :value="option"></ElOption>
          </ElSelect>
        </ClientOnly>
      </template>
    </ElInput>
  </div>
</template>

<script lang="ts" setup>
const colorMode = useColorMode()
// eslint-disable-next-line
type ElTagEffect = 'light' | 'dark'

interface ListOptionsItemItemsItem {
  label: string
  icon: string
}
interface ListOptionsItem {
  label: string
  type: string
  items: ListOptionsItemItemsItem[]
}

const listOptions: ListOptionsItem[] = [
  {
    label: 'Search Engine',
    type: 'success',
    items: [
      {
        label: 'BaiDu',
        icon: 'i-ri:baidu-fill',
      },
      {
        label: 'Google',
        icon: 'i-bxl:google',
      },
    ],
  },
]
const selectedListOption: ListOptionsItem = reactive(listOptions[0])
let selectedListOptionItem: ListOptionsItemItemsItem = reactive({ ...selectedListOption.items[0] })
const selectListOption = (val: ListOptionsItem) => {
  selectedListOptionItem = val.items[0]
}
const selectOptionItem = (item: ListOptionsItemItemsItem) => {
  selectedListOptionItem.label = item.label
  selectedListOptionItem.icon = item.icon
}

const inputValue = ref()
</script>
