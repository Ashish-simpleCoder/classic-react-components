<p align="left">
  <a href="https://badge.fury.io/js/simple-react-components">
    <img src="https://badge.fury.io/js/simple-react-components.svg" alt="npm version">
  </a>
    <img src="https://img.shields.io/badge/Licence-MIT-success" alt="MIT license." />
  <a href="https://github.com/Ashish-simplecoder/simple-react-components/actions/workflows/main.yml">
    <img src="https://img.shields.io/github/actions/workflow/status/Ashish-simpleCoder/simple-react-components/main.yml?label=CI&logo=GitHub" alt="Jest is released under the MIT license." />
  </a>
</p>

# 🚀 simple-react-components

An simple React Library for **Utility** **Components** and **Hooks**.

## Features

-  Comes with treeshaking
-  Built in Typescript

## Installation

For npm users

```bash
$ npm install simple-react-components
```

For pnpm users

```bash
$ pnpm install simple-react-components
```

For yarn users

```bash
$ yarn add simple-react-components
```

## Components

-  [If](#if)
-  [Then](#then)
-  [Else](#else)
-  [For](#for)

## If

| Prop      |   Type    | Required | Default | Description                                                                                   |
| --------- | :-------: | :------: | :-----: | --------------------------------------------------------------------------------------------- |
| condition |    any    |    ❌    |  false  | Based on evaluation of the condition flag the component will return null or children          |
| children  | ReactNode |    ❌    |  null   | To render the children                                                                        |
| suspense  |  boolean  |    ❌    |  false  | To lazy load the component or not                                                             |
| fallback  | ReactNode |    ❌    |  null   | Fallback needed to show untill the component is loaded fully. Needed for suspensed components |

### Working

-  Based the condition the children are rendered. If the condition is true then the childeren will render otherwise it will return null.

-  For one children

   -  If condition is true then children will render.
   -  If condition is false then null gets returned.

-  For multiple children
   -  If conditin is true then the first children will render
   -  Otherwise the all of the children will be renderd excluding the first children.

### Example

```tsx
import { If } from 'simple-react-components'

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
import { If, Then, Else } from 'simple-react-components'
import { lazy } from 'react'

const SomeLazyComponent = lazy(() => import('./SomeLazyComponent'))

export default function YourComponent() {
   return (
      <div>
         {/* Passing two children, condition and suspense prop */}
         <If codition={false} suspense>
            {/* this component code file will only download when the condition will be true.
             In this case, codition is falsy then it will not be downloaded. */}
            <Then>
               <SomeLazyComponent />
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

| Prop     |   Type    | Required | Default | Description                 |
| -------- | :-------: | :------: | :-----: | --------------------------- |
| children | ReactNode |    ❌    |  null   | Renders the passed children |

### Example

```tsx
import { If, Then } from 'simple-react-components'

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

| Prop     |   Type    | Required | Default | Description                 |
| -------- | :-------: | :------: | :-----: | --------------------------- |
| children | ReactNode |    ❌    |  null   | Renders the passed children |

### Example

```tsx
import { If, Then, Else } from 'simple-react-components'

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

| Prop     |   Type    | Required | Default | Description                 |
| -------- | :-------: | :------: | :-----: | --------------------------- |
| loop     |  number   |    ❌    |    0    | Needed to run the loop      |
| children | ReactNode |    ❌    |  null   | Renders the passed children |

### Example

```tsx
import { For } from 'simple-react-components'
import CardComponent from './CardComponent'

export default function YourComponent() {
   const Data = [
      { id: 1, course: 'Javascript' },
      { id: 2, course: 'React' },
   ]
   return (
      <div>
         <For loop={Data.length}>
            {(i) => {
               return <CardComponent key={Data[i].id}>{Data[i].course}</CardComponent>
            }}
         </For>
      </div>
   )
}
```
