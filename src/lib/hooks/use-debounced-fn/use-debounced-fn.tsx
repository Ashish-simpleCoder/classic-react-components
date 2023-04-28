import { useEffect, useRef } from 'react'

export default function useDebouncedFn<T extends (...args: any[]) => any>(cb: T, delay: number = 100) {
   let delayRef = useRef(delay)
   let timeout_id: NodeJS.Timeout

   const debouncedFn = useRef((...args: Parameters<typeof cb>) => {
      if (timeout_id) {
         clearTimeout(timeout_id)
      }

      timeout_id = setTimeout(() => cb(...args), delayRef.current)
   })
   useEffect(() => {
      delayRef.current = delay
   }, [delay])

   return debouncedFn.current

   // return (...args: Parameters<typeof cb>) => {
   //    if (timeout_id) {
   //       clearTimeout(timeout_id)
   //    }

   //    timeout_id = setTimeout(() => cb(...args), delay)
   // }
}
