import React from 'react'

export default function For({
   loop = 0,
   children = null,
}: {
   children?: ((i: number) => JSX.Element) | null
   loop?: number
}) {
   if (children !== null && typeof children != 'function') {
      throw new Error('Children type must be a function.')
   }
   if (Number.isNaN(Number(loop))) {
      throw new Error('Invalid value provided for the loop prop.')
   }

   if (children === null) {
      return <></>
   }

   return <Elements item={children} loop={loop} />
}

function Elements({ item, loop }: { item: (i: number) => JSX.Element; loop: number }) {
   let arr: JSX.Element[] = []
   for (let i = 0; i < Number(loop); i++) {
      const element = item(i)
      arr.push(element)
   }

   return <>{arr}</>
}
