import React from 'react'

/**
 * @description
 * A Utility component replacement for Array.map() method.
 *
 * @see Docs https://github.com/Ashish-simpleCoder/classic-react-components#for
 *
 * @example
   import { For } from 'classic-react-components'
   import CardComponent from './CardComponent'

   export default function YourComponent() {
      const Data = [
         { id: 1, course: 'Javascript' },
         { id: 2, course: 'React' },
      ]
      return (
         <div>
            <For data={Data}>
               {(item, i) => {
                  return <CardComponent key={item.id}>{item.course}</CardComponent>
               }}
            </For>
         </div>
      )
   }
*/
export default function For<T extends any[]>({
   data,
   children = null,
}: {
   children?: ((item: T[number], i: number) => JSX.Element) | null
   data?: T
}) {
   if (!data || children === null) return <></>
   
   if(!Array.isArray(data)) {
      throw new Error(`Type of data prop must be an array, but got ${typeof data} type.`)
   }

   if (typeof children != 'function') {
      throw new Error(`Type of children prop must be a function but got ${typeof children} type.`)
   }

   let arr: JSX.Element[] = []
   for (let i = 0; i < Number(data.length); i++) {
      const element = children(data[i], i)
      arr.push(element)
   }

   return <>{arr}</>
}
