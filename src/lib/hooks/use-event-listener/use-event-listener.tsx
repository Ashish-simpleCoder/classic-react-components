import React, { KeyboardEvent, RefObject, useEffect } from 'react'

export default function useEventListener({
   element = window,
   type,
   listener,
   shouldAddEvent = true,
   options,
}: {
   element?: RefObject<HTMLElement> | Element | Window | null
   type: keyof WindowEventMap
   listener: (e: Event | KeyboardEvent) => void
   shouldAddEvent?: boolean
   options?: boolean | AddEventListenerOptions | undefined
}) {
   useEffect(() => {
      if (!element) return
      const callback = (e: Event | KeyboardEvent) => {
         listener(e)
      }
      const cleanupEventListener = () => {
         if ('current' in element) {
            element?.current?.removeEventListener(type, callback, options)
         }
         if ('nodeName' in element) {
            element.removeEventListener(type, callback, options)
         }
      }

      if (shouldAddEvent) {
         if ('current' in element) {
            element?.current?.addEventListener(type, callback, options)
         }
         if ('nodeName' in element) {
            element.addEventListener(type, callback, options)
         }
      } else {
         cleanupEventListener()
      }

      return () => {
         cleanupEventListener()
      }
   }, [shouldAddEvent])
}
