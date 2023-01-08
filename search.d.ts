/*
 * @Date: 2023-01-08 10:41:04
 * @Author: liting luz.liting@gmail.com
 * @LastEditors: liting luz.liting@gmail.com
 * @LastEditTime: 2023-01-08 11:41:51
 * @FilePath: /search/search.d.ts
 */
interface SearchInfo {
  name: string
  icon: string
}

interface SearchParams {
  [key: string]: string
}

interface SearchParamsMapItemOption {
  label: string
  value: string
}

interface SearchParamsMapItem {
  key: string
  desc: string
  type: 'input' | 'radio'
  options?: SearchParamsMapItemOption[]
}

type SearchParamsMap<T> = Record<typeof T, SearchParamsMapItem>

type ElThemeEffect = 'light' | 'dark'
