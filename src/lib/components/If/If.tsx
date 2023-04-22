import React, { ReactNode, Suspense } from 'react'

export default function If({
   condition = false,
   children = null,
   suspense,
   fallback = <></>,
}: {
   condition?: any
   children?: ReactNode
   suspense?: boolean
   fallback?: ReactNode
}): JSX.Element | null {
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
