import React, { useEffect } from 'react'

export default function useTimeout(cb: () => void, delay: number = 100) {
   useEffect(() => {
      let timeout_id: NodeJS.Timeout

      timeout_id = setTimeout(cb, delay)

      return () => clearTimeout(timeout_id)
   }, [])
}
