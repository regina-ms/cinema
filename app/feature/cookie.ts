import type { CookieOptions } from 'react-router'

export function setCookie(
  name: string,
  value: string,
  options?: Pick<CookieOptions, 'path' | 'maxAge' | 'domain' | 'secure' | 'sameSite'>,
) {
  options = {
    path: '/',
    secure: true,
    ...options,
  }

  let updatedCookie = encodeURIComponent(name) + '=' + encodeURIComponent(value)

  for (let optionKey in options) {
    updatedCookie += '; ' + optionKey
    // @ts-ignore
    let optionValue = options[optionKey]
    if (optionValue !== true) {
      updatedCookie += '=' + optionValue
    }
  }

  document.cookie = updatedCookie
}

export function getCookie(name: string) {
  let matches = document.cookie.match(
    new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)'),
  )
  return matches ? decodeURIComponent(matches[1]) : undefined
}
