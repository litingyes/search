<!--
 * @Date: 2023-01-07 15:32:54
 * @Author: liting luz.liting@gmail.com
 * @LastEditors: liting luz.liting@gmail.com
 * @LastEditTime: 2023-01-08 01:36:35
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
    <div>
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
      <el-popover width="600px" trigger="click">
        <template #reference>
          <ElInput v-model="inputValue" class="!w-96">
            <template #append>
              <div class="i-uil:search text-lg cursor-pointer" @click="search"></div>
            </template>
          </ElInput>
        </template>
        <ElForm size="small">
          <ElFormItem v-for="item in popoverFormMap" :key="item.key" :label="item.desc">
            <ElInput v-if="item.type === 'input'" v-model="popoverFormMapData[item.key]"></ElInput>
            <ElRadioGroup v-else-if="item.type === 'radio'" v-model="popoverFormMapData[item.key]" :validate-event="false">
              <ElRadio v-for="option in item.options" :key="option.label" :label="option.value">{{ option.label }} </ElRadio>
            </ElRadioGroup>
          </ElFormItem>
        </ElForm>
      </el-popover>
    </div>
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
    label: '搜索引擎',
    type: 'success',
    items: [
      {
        label: 'Baidu',
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

let inputValue = ref('')

const { params: baiduSearchParams, paramsMap: baiduSearchParamsMap, search: baiduSearch } = useBaiduSearch()
const { params: googleSearchParams, paramsMap: googleSearchParamsMap, search: googleSearch } = useGoogleSearch()
const popoverFormMap = computed(() => {
  if (selectedListOptionItem.label === 'Baidu') {
    inputValue = toRef(baiduSearchParams, 'q1')
    return baiduSearchParamsMap
  } else if (selectedListOptionItem.label === 'Google') {
    inputValue = toRef(googleSearchParams, 'as_q')
    return googleSearchParamsMap
  }
  return {} as any
})
const popoverFormMapData = computed(() => {
  if (selectedListOptionItem.label === 'Baidu') {
    return baiduSearchParams
  } else if (selectedListOptionItem.label === 'Google') {
    return googleSearchParams
  }
  return {} as any
})
const search = () => {
  if (selectedListOptionItem.label === 'Baidu') {
    baiduSearch()
  } else if (selectedListOptionItem.label === 'Google') {
    googleSearch()
  }
}
</script>

<style lang="scss" scoped>
:deep(.el-select) {
  .el-input__wrapper {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    border-right: none;
  }
}

:deep(.el-input) {
  .el-input__wrapper {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    border-left: 0;
  }
}
</style>
