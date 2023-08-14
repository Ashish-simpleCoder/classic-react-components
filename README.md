> **Note** This library is still in progress.

<p align="left">
  <a href="https://badge.fury.io/js/classic-react-components">
    <img src="https://badge.fury.io/js/classic-react-components.svg" alt="npm version">
  </a>
    <img src="https://img.shields.io/badge/Licence-MIT-success" alt="MIT license." />
  <a href="https://github.com/Ashish-simplecoder/classic-react-components/actions/workflows/main.yml">
    <img src="https://img.shields.io/github/actions/workflow/status/Ashish-simpleCoder/classic-react-components/main.yml?label=CI&logo=GitHub" alt="Jest is released under the MIT license." />
  </a>
</p>

# 🚀 classic-react-components

## A Simple React Library of `Utility Components`.

## Features

-  Comes with treeshaking
-  Typescript support
-  Small bundle size
-  Tests written in Vitest

## Installation

For npm users

```bash
$ npm install classic-react-components
```

For pnpm users

```bash
$ pnpm install classic-react-components
```

For yarn users

```bash
$ yarn add classic-react-components
```

## Components

-  [If](#if)
-  [Then](#then)
-  [Else](#else)
-  [For](#for)
-  [Switch](#switch)

## If

| Prop      |   Type    | Required | Default Value | Description                                                                                   |
| --------- | :-------: | :------: | :-----------: | --------------------------------------------------------------------------------------------- |
| condition |    any    |    ❌    |     false     | Based on evaluation of the condition flag the component will return null or children          |
| children  | ReactNode |    ❌    |     null      | To render the children                                                                        |
| suspense  |  boolean  |    ❌    |     false     | To lazy load the component or not                                                             |
| fallback  | ReactNode |    ❌    |     null      | Fallback needed to show untill the component is loaded fully. Needed for suspensed components |

### Working

-  Based on the condition the children are rendered.
-  If the condition is true then the childeren will render otherwise it will return null.

-  For one children

   -  If condition is true then children will be rendered.
   -  If condition is false then null gets returned.

-  For multiple children
   -  If conndition is true then the first children will rendered.
   -  Otherwise the all of the children will be rendered excluding the first children.

### Example

```tsx
import { If } from 'classic-react-components'

export default function YourComponent() {
   return (
      <div>
         {/* Passing only one children and a condition prop */}
         <If codition={true}>
            <h1>it will render.</h1>
         </If>

         {/* Passing more than one children and a truthy condition prop */}
         <If codition={false}>
            <h1>it will not render</h1>
            <h2>it will render. As condition it falsy</h2>
         </If>

         {/* Passing more than one children and a falsy condition prop */}
         <If codition={falsy}>
            <h1>it will not render</h1>
            <h2>it will render. As condition it falsy.</h2>
            <h2>it will also render</h2>
         </If>
      </div>
   )
}
```

### Usage with Suspense

```tsx
import { If, Then, Else } from 'classic-react-components'
import { lazy } from 'react'

const YourLazyComponent = lazy(() => import('./YourLazyComponent'))

export default function YourComponent() {
   return (
      <div>
         {/* Passing two children, condition and suspense props */}
         <If codition={false} suspense>
            {/* This component will only download when the condition evaluates to true.
             Here condition is falsy, it will not be downloaded. */}
            <Then>
               <YourLazyComponent />
            </Then>
            <Else>
               <h2>this is will render</h2>
            </Else>
         </If>
      </div>
   )
}
```

## Then

| Prop     |   Type    | Required | Default Value | Description                 |
| -------- | :-------: | :------: | :-----------: | --------------------------- |
| children | ReactNode |    ❌    |     null      | Renders the passed children |

### Working

-  It should be used in-conjunction with `If` commponent.
-  It renders the passed children.

### Example

```tsx
import { If, Then } from 'classic-react-components'

export default function YourComponent() {
   return (
      <div>
         <If codition={true}>
            <Then>
               <h1>this will render.</h1>
            </Then>
         </If>
      </div>
   )
}
```

## Else

| Prop     |   Type    | Required | Default Value | Description                 |
| -------- | :-------: | :------: | :-----------: | --------------------------- |
| children | ReactNode |    ❌    |     null      | Renders the passed children |

### Working

-  It should be used in-conjunction with `If` commponent.
-  It renders the passed children.

### Example

```tsx
import { If, Then, Else } from 'classic-react-components'

export default function YourComponent() {
   return (
      <div>
         <If codition={2 + 2 == 4}>
            <Then>
               <h1>this will render.</h1>
            </Then>
            <Else>
               <h1>this will not render.</h1>
            </Else>
         </If>
      </div>
   )
}
```

## For

| Prop     |   Type    | Required | Default Value | Description                                    |
| -------- | :-------: | :------: | :-----------: | ---------------------------------------------- |
| data     |   Array   |    ❌    |   undefined   | Needed for mapping                             |
| children | ReactNode |    ❌    |     null      | Renders the `JSX` returned from child function |

### Working

-  Replacement for Array.map().
-  Used to iterate over an array of items and renders the `JSX` based on the provided child function.

### Example

```tsx
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
            {(item, index) => {
               return <CardComponent key={item.id}>{item.course}</CardComponent>
            }}
         </For>
      </div>
   )
}
```

## Switch

| Prop     |   Type    | Required | Default Value | Description                                                      |
| -------- | :-------: | :------: | :-----------: | ---------------------------------------------------------------- |
| item     |    any    |    ❌    |   undefined   | The value of Switch                                              |
| children | ReactNode |    ✅    |       -       | Renders the children of matched case if found, else default case |

### Working

-  Renders the children of particular matched case for given prop `item(switch value)`.
-  If no case matches for given prop `item`, the `Default` case will be rendered.

> **Note:** The order of Default Case does not matter.

### Example

```tsx
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
```
