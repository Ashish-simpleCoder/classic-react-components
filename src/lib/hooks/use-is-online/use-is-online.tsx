import React, { useEffect, useState } from 'react'

export default function useIsOnline() {
   const [isOnline, setIsOnline] = useState(false)

   useEffect(() => {
      const handleOnline = () => setIsOnline(true)
      const handleOffline = () => setIsOnline(false)

      window.addEventListener('online', handleOnline)
      window.addEventListener('offline', handleOffline)

      return () => {
         window.addEventListener('online', handleOnline)
         window.addEventListener('offline', handleOffline)
      }
   }, [])

   return [isOnline]
}
