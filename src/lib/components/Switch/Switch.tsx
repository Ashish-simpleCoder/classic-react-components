import type { ReactNode } from 'react'
import React, { Children, useRef } from 'react'

type SwitchProps<T> = {
   children: ({
      Case,
      Default,
   }: {
      Case: ({ children, value }: { children?: ReactNode; value: T }) => JSX.Element
      Default: ({ children }: { children: ReactNode }) => JSX.Element | null
   }) => JSX.Element
   item: T
}

export default function Switch<T>({ children, item }: SwitchProps<T>) {
   const itemRef = useRef(item)
   itemRef.current = item

   const functionsRefObj = useRef({
      Case({ children, value }: { children?: ReactNode; value: T }) {
         if (value == itemRef.current) {
            return <>{children}</>
         }
         return <></>
      },
      Default({ children }: { children: ReactNode }) {
         return <>{children}</>
      },
   })

   const { props } = children({ Case: functionsRefObj.current.Case, Default: functionsRefObj.current.Default })

   let new_child: JSX.Element | null = null
   const defaultCase = {
      present: false,
      index: 0,
   }

   if (props?.children?.length > 0) {
      Children.forEach(props.children, (child: JSX.Element, i) => {
         // check if it is <Case> case
         if (child?.type?.name == 'Case') {
            // if passed <item> prop is equal to the <Case> component's <value> prop, then assign it to <new_child> state
            if (child?.props?.value == item) {
               new_child = child
               return
            }
         }
         // check if <Default> case is present or not
         if (child?.type?.name == 'Default') {
            defaultCase.present = true
            defaultCase.index = i
         }

         if (!child) {
            console.warn('You can"t call function, You must use Default or Case component')
            return
         }

         if (typeof child.type == 'function') {
            if (child.type.name == 'Default' || child.type.name == 'Case') return
            console.warn(
               'Only Default and Case component are allowed. Skipping the rendering for',
               child.type.name,
               'component'
            )
         } else {
            console.warn(
               'Only Default and Case component are allowed. Skipping the rendering for HtmlElement',
               child.type
            )
         }
      })
   }

   // if no-other cases match and <Default> case is present, then assign the <Default> to the <new_child> state
   if (!new_child && defaultCase.present) {
      new_child = props?.children[defaultCase.index]
   }

   return new_child
}
