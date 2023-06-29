import type { ReactNode } from 'react'
import React from 'react'

export default function Then({ children = null }: { children?: ReactNode }) {
   return <>{children}</>
}
