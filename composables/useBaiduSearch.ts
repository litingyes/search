/*
 * @Date: 2023-01-07 20:26:44
 * @Author: liting luz.liting@gmail.com
 * @LastEditors: liting luz.liting@gmail.com
 * @LastEditTime: 2023-01-07 23:50:37
 * @FilePath: /search/composables/useBaiduSearch.ts
 */
import { stringify } from 'qs'

type BaiduSearchParam = string | undefined
interface BaiduSearchParams {
  q1: string
  q2: string
  q3: string
  q4: string
  q5: '' | '1' | '2'
  q6: string
  ft: '' | 'pdf' | 'doc' | 'xls' | 'ppt' | 'rtf' | 'all'
  lm: '0' | '1' | '7' | '30' | '360'
  ct: '0' | '1' | '2'
  [key: string]: BaiduSearchParam
}
type BaiduSearchParamsKeys = 'q1' | 'q2' | 'q3' | 'q4' | 'q5' | 'q6' | 'ft' | 'lm' | 'ct'
type BaiduSearchParamsMapItemOptionItem = {
  label: string
  value?: string
}
type BaiduSearchParamsMapItemOption = BaiduSearchParamsMapItemOptionItem[]

interface BaiduSearchParamsMapItem {
  key: string
  desc: string
  type: 'input' | 'radio'
  options?: BaiduSearchParamsMapItemOption
}

type BaiduSearchParamsMap = Record<BaiduSearchParamsKeys, BaiduSearchParamsMapItem>

export const useBaiduSearch = () => {
  const url = 'https://baidu.com/s'

  const params: BaiduSearchParams = reactive({
    q1: '',
    q2: '',
    q3: '',
    q4: '',
    q5: '',
    q6: '',
    ft: '',
    lm: '0',
    ct: '0',
  })

  const paramsMap: BaiduSearchParamsMap = {
    q1: {
      key: 'q1',
      desc: '包含以下全部关键词',
      type: 'input',
    },
    q2: {
      key: 'q2',
      desc: '包含以下完整关键词',
      type: 'input',
    },
    q3: {
      key: 'q3',
      desc: '包含以下任意一个关键词',
      type: 'input',
    },
    q4: {
      key: 'q4',
      desc: '不包括以下任意一个关键词',
      type: 'input',
    },
    q5: {
      key: 'q5',
      desc: '查询关键词位于',
      type: 'radio',
      options: [
        {
          label: '网页的任何地方',
          value: '',
        },
        {
          label: '仅在网页标题中',
          value: '1',
        },
        {
          label: '仅在网页的URL中',
          value: '2',
        },
      ],
    },
    q6: {
      key: 'q6',
      desc: '限定要搜索的网站',
      type: 'input',
    },
    ft: {
      key: 'ft',
      desc: '搜索网页格式',
      type: 'radio',
      options: [
        {
          label: '所有网页和格式',
          value: '',
        },
        {
          label: 'Adobe Acroat PDF (.pdf)',
          value: 'pdf',
        },
        {
          label: '微软 Word (.doc)',
          value: 'doc',
        },
        {
          label: '微软 Excel (.xls)',
          value: 'xls',
        },
        {
          label: '微软 PowerPoint (.ppt)',
          value: 'ppt',
        },
        {
          label: 'RTF 文件 (.rtf)',
          value: 'rtf',
        },
      ],
    },
    lm: {
      key: 'lm',
      desc: '搜索时间范围',
      type: 'radio',
      options: [
        {
          label: '全部时间',
          value: '0',
        },
        {
          label: '最近一年',
          value: '360',
        },
        {
          label: '最近一月',
          value: '30',
        },
        {
          label: '最近一周',
          value: '7',
        },
        {
          label: '最近一天',
          value: '1',
        },
      ],
    },
    ct: {
      key: 'ct',
      desc: '搜索网页语言',
      type: 'radio',
      options: [
        {
          label: '全部语言',
          value: '0',
        },
        {
          label: '简体中文',
          value: '1',
        },
        {
          label: '繁体中文',
          value: '2',
        },
      ],
    },
  }

  const search = () => {
    window.open(`${url}?${stringify(params)}`)
  }

  return { params, paramsMap, search }
}
