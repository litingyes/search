/*
 * @Date: 2023-01-08 00:11:45
 * @Author: liting luz.liting@gmail.com
 * @LastEditors: liting luz.liting@gmail.com
 * @LastEditTime: 2023-01-08 17:05:57
 * @FilePath: /search/composables/useGoogleSearch.ts
 */
import { stringify } from 'qs'

interface GoogleSearchParams extends SearchParams {
  as_q: string
  as_epq: string
  as_op: string
  as_ep: string
  as_nlo: string
  as_nhi: string
  lr: '' | 'lang_af' | 'lang_de' | 'lang_ru' | 'lang_fr' | 'lang_zh-TW' | 'lang_ko' | 'anglang_zh-CN_de' | 'lang_ja' | 'lang_en'
  cr: string
  as_qdr: 'all' | 'd' | 'w' | 'm' | 'y'
  as_sitesearch: string
  as_occt: 'any' | 'title' | 'body' | 'url' | 'links'
  safe: 'images' | 'active'
  as_filetype: '' | 'pdf' | 'ps' | 'dwf' | 'kml' | 'kmz' | 'xls' | 'ppt' | 'doc' | 'rtf' | 'swf'
  tbs: '' | 'f' | 'fc' | 'fm' | 'fmc'
}

type GoogleSearchParamsMap = SearchParamsMap<GoogleSearchParams>

export const useGoogleSearch = () => {
  const url = 'https://www.google.co.jp/search'

  const info: SearchInfo = {
    name: '谷歌',
    icon: 'i-bxl:google',
  }

  const params: GoogleSearchParams = reactive({
    as_q: '',
    as_epq: '',
    as_op: '',
    as_ep: '',
    as_nlo: '',
    as_nhi: '',
    lr: '',
    cr: '',
    as_qdr: 'all',
    as_sitesearch: '',
    as_occt: 'any',
    safe: 'images',
    as_filetype: '',
    tbs: '',
  })

  const paramsMap: GoogleSearchParamsMap = {
    as_q: {
      key: 'as_q',
      desc: '以下所有字词',
      type: 'input',
    },
    as_epq: {
      key: 'as_epq',
      desc: '与以下字词完全匹配',
      type: 'input',
    },
    as_op: {
      key: 'as_op',
      desc: '以下任意字词',
      type: 'input',
    },
    as_ep: {
      key: 'as_ep',
      desc: '不含以下任意字词',
      type: 'input',
    },
    as_nlo: {
      key: 'as_nlo',
      desc: '数字范围 ｜ 起始',
      type: 'input',
    },
    as_nhi: {
      key: 'as_nhi',
      desc: '数字范围 ｜ 结束',
      type: 'input',
    },
    lr: {
      key: 'lr',
      desc: '语言',
      type: 'select',
      options: [
        {
          label: '任何语言',
          value: '',
        },
        {
          label: '阿拉伯语',
          value: 'lang_ar',
        },
        {
          label: '德语',
          value: 'lang_de',
        },
        {
          label: '俄语',
          value: 'lang_ru',
        },
        {
          label: '法语',
          value: 'lang_fr',
        },
        {
          label: '繁体中文',
          value: 'lang_zh-TW',
        },
        {
          label: '韩语',
          value: 'lang_ko',
        },
        {
          label: '简体中文',
          value: 'langlang_zh-CN_de',
        },
        {
          label: '日语',
          value: 'lang_ja',
        },
        {
          label: '英语',
          value: 'lang_en',
        },
      ],
    },
    cr: {
      key: 'cr',
      desc: '地区',
      type: 'select',
      options: [
        {
          label: '任何国家/地区',
          value: '',
        },
        {
          label: '澳大利亚',
          value: 'countryAU',
        },
        {
          label: '澳门',
          value: 'countryMO',
        },
        {
          label: '巴基斯坦',
          value: 'countryPK',
        },
        {
          label: '百慕大',
          value: 'countryBM',
        },
        {
          label: '德国',
          value: 'countryDE',
        },
        {
          label: '俄罗斯',
          value: 'countryRU',
        },
        {
          label: '法国',
          value: 'countryFR',
        },
        {
          label: '韩国',
          value: 'countryKR',
        },
        {
          label: '美国',
          value: 'countryUS',
        },
        {
          label: '日本',
          value: 'countryJP',
        },
        {
          label: '台湾',
          value: 'countryTW',
        },
        {
          label: '英国',
          value: 'countryGB',
        },
        {
          label: '中国',
          value: 'countryCN',
        },
      ],
    },
    as_qdr: {
      key: 'as_qdr',
      desc: '最后更新时间',
      type: 'select',
      options: [
        {
          label: '任何时间',
          value: 'all',
        },
        {
          label: '一天内',
          value: 'd',
        },
        {
          label: '一周内',
          value: 'w',
        },
        {
          label: '一个月内',
          value: 'm',
        },
        {
          label: '一年内',
          value: 'y',
        },
      ],
    },
    as_sitesearch: {
      key: 'as_sitesearch',
      desc: '网站或域名',
      type: 'input',
    },
    as_occt: {
      key: 'as_occt',
      desc: '字词出现位置',
      type: 'select',
      options: [
        {
          label: '网页上任何位置',
          value: 'any',
        },
        {
          label: '网页标题中',
          value: 'title',
        },
        {
          label: '网页文本中',
          value: 'body',
        },
        {
          label: '网页网址中',
          value: 'url',
        },
        {
          label: '指向网页的链接中',
          value: 'links',
        },
      ],
    },
    safe: {
      key: 'safe',
      desc: '安全搜索',
      type: 'radio',
      options: [
        {
          label: '显示含有露骨色情内容的搜索结果',
          value: 'images',
        },
        {
          label: '隐藏含有露骨内容的搜索结果',
          value: 'active',
        },
      ],
    },
    as_filetype: {
      key: 'as_filetype',
      desc: '文件类型',
      type: 'select',
      options: [
        {
          label: '任意格式',
          value: '',
        },
        {
          label: 'Adobe Acrobat PDF (.pdf)',
          value: 'pdf',
        },
        {
          label: 'Adobe Postscript (.ps)',
          value: 'ps',
        },
        {
          label: 'Autodesk DWF (.dwf)',
          value: 'dwf',
        },
        {
          label: 'Google 地球 KML (.kml)',
          value: 'kml',
        },
        {
          label: 'Google 地球 KMZ (.kmz)',
          value: 'kmz',
        },
        {
          label: 'Microsoft Excel (.xls)',
          value: 'xls',
        },
        {
          label: 'Microsoft Powerpoint (.ppt)',
          value: 'ppt',
        },
        {
          label: 'Microsoft Word (.doc)',
          value: 'doc',
        },
        {
          label: '富文本格式 (.rtf)',
          value: 'rtf',
        },
        {
          label: 'Shockwave Flash (.swf)',
          value: 'swf',
        },
      ],
    },
    tbs: {
      key: 'tbs',
      desc: '使用权限',
      type: 'select',
      options: [
        {
          label: '不按照许可过滤',
          value: '',
        },
        {
          label: '可随意使用或共享',
          value: 'f',
        },
        {
          label: '可随意使用或共享（甚至用于商业用途）',
          value: 'fc',
        },
        {
          label: '可随意使用、共享或修改',
          value: 'fm',
        },
        {
          label: '可随意使用、共享或修改（甚至用于商业用途）',
          value: 'fmc',
        },
      ],
    },
  }

  const search = () => {
    window.open(`${url}?${stringify(params)}`)
  }

  return { info, params, paramsMap, search }
}
