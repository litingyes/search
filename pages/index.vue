<!--
 * @Date: 2023-01-07 15:32:54
 * @Author: liting luz.liting@gmail.com
 * @LastEditors: liting luz.liting@gmail.com
 * @LastEditTime: 2023-01-08 13:25:17
 * @FilePath: /search/pages/index.vue
-->
<script lang="ts" setup>
const colorMode = useColorMode()

const {
  info: baiduSearchInfo,
  params: baiduSearchParams,
  paramsMap: baiduSearchParamsMap,
  search: baiduSearch,
} = useBaiduSearch()
const {
  info: googleSearchInfo,
  params: googleSearchParams,
  paramsMap: googleSearchParamsMap,
  search: googleSearch,
} = useGoogleSearch()

const listOptions = [baiduSearchInfo, googleSearchInfo]
const selectedListOption: SearchInfo = reactive({ ...listOptions[0] })

let inputValue = ref('')
const popoverFormMap = computed(() => {
  if (selectedListOption.name === baiduSearchInfo.name) {
    inputValue = toRef(baiduSearchParams, 'q1')
    return baiduSearchParamsMap
  } else if (selectedListOption.name === googleSearchInfo.name) {
    inputValue = toRef(googleSearchParams, 'as_q')
    return googleSearchParamsMap
  }
  return {} as any
})
const popoverFormMapData = computed(() => {
  if (selectedListOption.name === baiduSearchInfo.name) {
    return baiduSearchParams
  } else if (selectedListOption.name === googleSearchInfo.name) {
    return googleSearchParams
  }
  return {} as any
})
const search = () => {
  if (selectedListOption.name === baiduSearchInfo.name) {
    baiduSearch()
  } else if (selectedListOption.name === googleSearchInfo.name) {
    googleSearch()
  }
}
</script>

<template>
  <div class="page-index mt-32 flex items-center flex-col gap-4">
    <div>
      <el-popover width="600px" trigger="click" :effect="colorMode.value">
        <template #reference>
          <ElInput v-model="inputValue" class="!w-96 !rounded-lg">
            <template #prefix>
              <SearchSelect v-model="selectedListOption" :options="listOptions"> </SearchSelect>
            </template>
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

<style lang="scss">
.page-index {
  .el-input-group__append {
    padding: 0 12px;
  }
}
</style>
