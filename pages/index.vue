<!--
 * @Date: 2023-01-07 15:32:54
 * @Author: liting luz.liting@gmail.com
 * @LastEditors: liting luz.liting@gmail.com
 * @LastEditTime: 2023-01-09 23:58:15
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
const popoverVisible = ref(false)
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

const pageIndexSearchInputRef = ref()
const litingSearchRef: any = inject('litingSearchRef')
onClickOutside(pageIndexSearchInputRef, (e) => {
  let el: any = e.target
  while (el !== litingSearchRef.value && el.parentNode) {
    el = el.parentNode
  }
  if (el === litingSearchRef.value) {
    popoverVisible.value = false
  }
})
</script>

<template>
  <div class="page-index pt-32 flex items-center flex-col gap-4">
    <el-popover :visible="popoverVisible" width="600px" :effect="colorMode.value" popper-class="page-index__popover">
      <template #reference>
        <ElInput
          ref="pageIndexSearchInputRef"
          v-model="inputValue"
          class="page-index__input !w-96"
          size="large"
          :validate-event="false"
          @focus="popoverVisible = true"
        >
          <template #prefix>
            <SearchSelect v-model="selectedListOption" :options="listOptions"> </SearchSelect>
          </template>
          <template #suffix>
            <div class="i-uil:search text-xl cursor-pointer text-slate-900 hover:text-blue-400" @click="search"></div>
          </template>
        </ElInput>
      </template>
      <ElForm size="small" label-position="left" label-width="160px">
        <ElFormItem v-for="item in popoverFormMap" :key="item.key" :label="item.desc">
          <ElInput v-if="item.type === 'input'" v-model="popoverFormMapData[item.key]"></ElInput>
          <ElRadioGroup v-else-if="item.type === 'radio'" v-model="popoverFormMapData[item.key]" :validate-event="false">
            <ElRadio v-for="option in item.options" :key="option.label" :label="option.value">{{ option.label }} </ElRadio>
          </ElRadioGroup>
          <ElSelect
            v-else-if="item.type === 'select'"
            v-model="popoverFormMapData[item.key]"
            :validate-event="false"
            :effect="colorMode.value"
          >
            <ElOption v-for="option in item.options" :key="option.label" :label="option.label" :value="option.value"></ElOption>
          </ElSelect>
        </ElFormItem>
      </ElForm>
    </el-popover>
  </div>
</template>

<style lang="scss">
.page-index {
  &__input {
    .el-input__wrapper {
      border-radius: 12px;
      padding-left: 8px !important;
      box-shadow: 0 0 4px 2px rgba(148, 163, 184, 0.2);
      background: #f1f5f9;
    }
  }
}
</style>
