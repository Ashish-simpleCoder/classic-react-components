import type { ReactNode } from 'react'
import React from 'react'

export default function Else({ children = null }: { children?: ReactNode }) {
   return <>{children}</>
}
