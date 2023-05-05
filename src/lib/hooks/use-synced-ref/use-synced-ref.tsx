import React, { useRef } from 'react'

export default function useSyncedRef<T>(state: T) {
   const stateRef = useRef(state)

   stateRef.current = state

   return stateRef
}
