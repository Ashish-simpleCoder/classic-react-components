'use client'

import type { ReactNode } from 'react'
import React, { useRef } from 'react'

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

/**
 * @description
 * A Utility component which renders the children of matched case just like switch-case statement in javascript.
 *
 * @see Docs https://github.com/Ashish-simpleCoder/classic-react-components#switch
 *
 * @example
   import { Switch } from 'classic-react-components'
   import CardComponent from './CardComponent'

   export default function YourComponent({ item }: { item: 'coding' | 'sleep' }) {
      return (
         <div>
            <Switch item={item}>
               {({ Case, Default }) => {
                  return (
                     <>
                        <Case value='coding'>
                           <div>coing-case</div>
                        </Case>
                        <Case value='sleep'>
                           <div>sleep-case</div>
                        </Case>
                        <Default>
                           <div>this is default case</div>
                        </Default>
                     </>
                  )
               }}
            </Switch>
         </div>
      )
   }
*/
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
   let defaultCase: JSX.Element | null = null

   // handling case for when only one children is passed
   if (
      'children' in props &&
      typeof props.children == 'object' &&
      !Array.isArray(props.children) &&
      typeof props.children?.type == 'function'
   ) {
      if (props.children.type?.name == 'Case') {
         if (props.children.props.value === item) {
            new_child = props.children
         }
      }
      if (props.children.type?.name == 'Default') {
         new_child = props.children
      }
      return new_child
   }

   if ('children' in props && Array.isArray(props.children) && props.children.length > 0) {
      for (let i = 0; i < props.children.length; i++) {
         const child: JSX.Element = props.children[i]

         if (!child || (child?.type?.name != 'Default' && child?.type?.name != 'Case')) {
            console.warn('You must use Default or Case component inside Switch')
            continue
         }
         // check if it is <Case> case
         if (child?.type?.name == 'Case') {
            // if passed <item> prop is equal to the <Case> component's <value> prop, then assign it to <new_child> state
            if (child?.props?.value === item) {
               new_child = child
               break
            }
         }
         // check if <Default> case is present or not
         if (child?.type?.name == 'Default') {
            if (!defaultCase) {
               defaultCase = child
            }
         }
      }
      // if no-other cases match and <Default> case is present, then assign the <Default> to the <new_child> state
      if (!new_child && defaultCase) {
         new_child = defaultCase
      }
   }

   return new_child
}
