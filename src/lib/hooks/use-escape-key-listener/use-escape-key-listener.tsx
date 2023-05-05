import React, { useEffect } from 'react'

export default function useEscapeKeyListener({
   listener,
   shouldAddEvent = true,
   options,
}: {
   listener: (e: globalThis.KeyboardEvent) => void
   shouldAddEvent?: boolean
   options?: boolean | AddEventListenerOptions | undefined
}) {
   useEffect(() => {
      const callback = (e: globalThis.KeyboardEvent) => {
         if (e.key == 'Escape') {
            listener(e)
         }
      }

      if (shouldAddEvent) {
         document.addEventListener('keyup', callback, options)
      } else {
         document.removeEventListener('keyup', callback, options)
      }

      return () => {
         document.removeEventListener('keyup', callback, options)
      }
   }, [shouldAddEvent])
}
