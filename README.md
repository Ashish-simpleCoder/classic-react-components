<p align="left">
  <a href="https://badge.fury.io/js/simple-react-utils">
    <img src="https://badge.fury.io/js/simple-react-utils.svg" alt="npm version">
  </a>
    <img src="https://img.shields.io/badge/Licence-MIT-success" alt="MIT license." />
  <a href="https://github.com/Ashish-simplecoder/simple-react-utils/actions/workflows/main.yml">
    <img src="https://img.shields.io/github/actions/workflow/status/Ashish-simpleCoder/simple-react-utils/main.yml?label=CI&logo=GitHub" alt="Jest is released under the MIT license." />
  </a>
</p>

# 🚀 simple-react-utils

An Awesome React Library for **Utility** **Components** and **Hooks**.

## Installation

For npm users

```bash
$ npm install simple-react-utils
```

For pnpm users

```bash
$ pnpm install simple-react-utils
```

For yarn users

```bash
$ yarn add simple-react-utils
```

## Components

-  [If](#if)

## If

| Prop      |   Type    | Required | Default  | Description                                                                           |
| --------- | :-------: | :------: | :------: | ------------------------------------------------------------------------------------- |
| condition |    any    |    ❌    |  false   | Based on evaluation of the condition flag the component will return null or children  |
| children  | ReactNode |    ❌    |   null   | To render the children                                                                |
| suspense  |  boolean  |    ❌    |  false   | To lazy load the component or not                                                     |
| fallback  | ReactNode |    ❌    | Fragment | Fallback needed to show unless the component is loaded fully for suspensed components |

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
import { If } from 'simple-react-utils'

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
import { If } from 'simple-react-utils'
import { lazy } from 'react'

const SomeLazyComponent = lazy(() => import('./SomeLazyComponent'))

export default function YourComponent() {
   return (
      <div>
         {/* Passing two children, condition and suspense prop */}
         <If codition={false} suspense>
            {/* this component code file will only download when the condition will be true.
             In this case, codition is falsy then it will not be downloaded. */}
            <SomeLazyComponent />
            <h2>this is will render</h2>
         </If>
      </div>
   )
}
```
