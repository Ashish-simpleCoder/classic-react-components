import React, { RefObject } from 'react'

export default function useScrollToTopEffect(element: RefObject<HTMLElement> | null | Element = null) {
   return {
      scrollToTop: () => {
         if (!element) return

         if ('current' in element && element.current) {
            scrollToTop(element.current)
         }
         if ('nodeName' in element) {
            scrollToTop(element)
         }
      },
   }
}
export function scrollToTop(element: Element | Window = window) {
   if (!element) return
   element.scrollTo({
      behavior: 'smooth',
      top: 0,
   })
}
