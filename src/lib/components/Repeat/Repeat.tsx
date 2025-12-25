import { Fragment } from 'react'

export default function Repeat({
   times = 0,
   children,
}: {
   times?: number
   children?: JSX.Element | ((idx: number) => JSX.Element)
}): JSX.Element {
   if (times == 0) {
      return <></>
   }

   const childArr = new Array(times)

   for (let i = 0; i < times; i++) {
      if (typeof children == 'function') {
         childArr.push(<Fragment key={i}>{children(i)}</Fragment>)
      } else {
         childArr.push(children)
      }
   }

   return <>{childArr}</>
}
