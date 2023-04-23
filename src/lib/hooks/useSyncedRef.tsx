import React, { useEffect, useRef } from 'react'

export default function useSyncedRef<T>(state: T) {
   const stateRef = useRef(state)
   useEffect(() => {
      stateRef.current = state
   }, [state])

   return stateRef
}
