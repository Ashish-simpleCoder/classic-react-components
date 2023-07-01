import React from 'react'

export default function For<T extends any[]>({
   data,
   children = null,
}: {
   children?: ((item: T[number], i: number) => JSX.Element) | null
   data?: T
}) {
   if (!data || children === null) return <></>

   if (typeof children != 'function') {
      throw new Error('Children type must be a function.')
   }

   let arr: JSX.Element[] = []
   for (let i = 0; i < Number(data.length); i++) {
      const element = children(data[i], i)
      arr.push(element)
   }

   return <>{arr}</>
}
