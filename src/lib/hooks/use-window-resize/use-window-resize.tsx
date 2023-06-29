import React, { useEffect, useRef, useState } from 'react'

export default function useWindowResize({
   start,
   end,
   comparison = '<',
   cb,
}: {
   start: number
   end?: number
   comparison: '>' | '<' | 'betweeen'
   cb?: (show: boolean) => void
}) {
   const [show, setShow] = useState(false)
   const breakPointsRef = useRef({ start, end, comparison })

   breakPointsRef.current = { start, end, comparison }

   useEffect(() => {
      const listener = () => {
         const { start, end, comparison } = breakPointsRef.current

         if (comparison == 'betweeen') {
            if (!end) {
               return
            }
            const result = window.innerWidth > start && window.innerWidth < end
            setShow(result)
            cb?.(result)
            return
         }

         let result: boolean = false
         if (comparison == '<') {
            result = window.innerWidth < start
         }
         if (comparison == '>') {
            result = window.innerWidth > start
         }
         setShow(result)
         cb?.(result)
      }
      listener()

      window.addEventListener('resize', listener)
      return () => {
         window.removeEventListener('resize', listener)
      }
   }, [])

   return { show }
}
