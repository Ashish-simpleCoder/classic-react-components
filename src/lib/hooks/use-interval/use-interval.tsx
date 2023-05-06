import React, { useEffect } from 'react'

export default function useInterval(callback: () => void, delay: number = 100) {
   useEffect(() => {
      let timeout_id: NodeJS.Timeout

      const cb = () => {
         callback()
         timeout_id = setTimeout(cb, delay)
      }

      timeout_id = setTimeout(cb, delay)

      return () => clearTimeout(timeout_id)
   }, [])
}
