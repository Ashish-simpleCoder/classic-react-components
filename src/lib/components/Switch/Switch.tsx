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
   item?: T
}

export default function Switch<T>({ children, item }: SwitchProps<T>) {
   if (!item) return null

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

   // handling case for when only one children is passed
   if (
      'children' in props &&
      typeof props.children == 'object' &&
      !Array.isArray(props.children) &&
      typeof props.children?.type == 'function'
   ) {
      if (props.children.type?.name == 'Case') {
         if (props.children.props.value == item) {
            new_child = props.children
         }
      }
      if (props.children.type?.name == 'Default') {
         new_child = props.children
      }
      return new_child
   }

   if ('children' in props && Array.isArray(props.children) && props.children.length > 0) {
      Children.forEach(props.children, (child: JSX.Element, i) => {
         if (!child || (child?.type?.name != 'Default' && child?.type?.name != 'Case')) {
            console.warn('You must use Default or Case component inside Switch')
         }
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
            if (defaultCase.present) {
               console.warn('You can not use multiple Default-Case inside Switch')
               return
            }
            defaultCase.present = true
            defaultCase.index = i
         }
      })
      // if no-other cases match and <Default> case is present, then assign the <Default> to the <new_child> state
      if (!new_child && defaultCase.present) {
         new_child = props?.children[defaultCase.index]
      }
   }

   return new_child
}
