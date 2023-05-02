import React, { useEffect, useRef, useState } from 'react'

export default function useWindowResize({
   breakPoint,
   breakPoint2,
   above = false,
   cb,
}: {
   breakPoint: number
   breakPoint2?: number
   above: boolean
   cb?: (show: boolean) => void
}) {
   const [show, setShow] = useState(false)
   const breakPointsRef = useRef({ breakPoint, breakPoint2 })

   breakPointsRef.current = { breakPoint, breakPoint2 }

   useEffect(() => {
      const listener = () => {
         const { breakPoint: breakPointKey, breakPoint2: breakPointKey2 } = breakPointsRef.current

         if (breakPointKey && breakPointKey2) {
            const result = window.innerWidth > breakPointKey && window.innerWidth < breakPointKey2
            setShow(result)
            cb?.(result)
            return
         }
         const result = above ? window.innerWidth > breakPointKey : window.innerWidth < breakPointKey
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
