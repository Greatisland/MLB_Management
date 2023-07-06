import { DefaultTheme } from "styled-components";

//전역 테마 컬러 타입 정의
declare module 'styled-components' {
  export interface DefaultTheme {
    [key: string]: string
  }
}

export const originTheme: DefaultTheme = {
  pink: '#E3CBCB',
  pink2: '#FFA3A3',
  pink3: '#FF9CC7',
  brown: '#c5a26e',
  brown2: '#f2c684',
  gray: '#b6b6b6',
  gray2: '#282833',
  white: '#fff',
  white2: '#f9f9f9',
  green: '#199E98'
}
