import React, { useEffect } from 'react'

export default function useOnMountEffect(cb: () => void | (() => void)) {
   useEffect(cb, [])
}
