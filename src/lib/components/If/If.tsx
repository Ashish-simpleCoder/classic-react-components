import type { ReactNode } from 'react'
import React, { Suspense } from 'react'

export default function If({
   condition = false,
   children = null,
   suspense,
   fallback = null,
}: {
   condition?: any
   children?: ReactNode
   suspense?: boolean
   fallback?: ReactNode
}): JSX.Element | null {
   // doing double-boolean negation
   const conditionNegation = !!condition
   const isArray = Array.isArray(children)

   if (isArray) {
      if (conditionNegation && suspense) return <Suspense fallback={fallback}>{children[0]}</Suspense>
      if (conditionNegation) return <>{children[0]}</>

      // if false then return children present after the array[0] index
      return <>{children.slice(1)}</>
   }
   if (conditionNegation && suspense) return <Suspense fallback={fallback}>{children}</Suspense>
   if (conditionNegation) return <>{children}</>

   return null
}
