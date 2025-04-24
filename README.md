# 🚀 classic-react-components

## Intro

Rethinking the way you write JSX. 


<br />
<p align="left">
  <a href="https://badge.fury.io/Ashish-simpleCoder/classic-react-components">
    <img src="https://badge.fury.io/js/classic-react-components.svg" alt="npm version">
  </a>
    <img src="https://img.shields.io/badge/Licence-MIT-success" alt="MIT license." />
  <a href="https://github.com/Ashish-simpleCoder/classic-react-components/actions/workflows/test.yml">
    <img src="https://img.shields.io/github/actions/workflow/status/Ashish-simpleCoder/classic-react-components/test.yml?label=Test&logo=GitHub" alt="Test" />
  </a>
  <a href="https://github.com/Ashish-simplecoder/classic-react-components/actions/workflows/main.yml">
    <img src="https://img.shields.io/github/actions/workflow/status/Ashish-simpleCoder/classic-react-components/main.yml?label=CI&logo=GitHub" alt="Jest is released under the MIT license." />
  </a>
</p>

## Features

- Built in Typescript
- Supports Treeshaking
- Small bundle size
- Minimal and Easy to use
- Open Source

## Installation

For npm users

```bash
$ npm install classic-react-components
```

For pnpm users

```bash
$ pnpm install classic-react-components
```
For bun users

```bash
$ bun install classic-react-components
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

| Prop      |   Type    | Required | Default Value | Description                                                                                  |
| --------- | :-------: | :------: | :-----------: | -------------------------------------------------------------------------------------------- |
| condition |    any    |    ❌    |     false     | Based on the evaluation of `condition` prop, either children or null will be rendered         |
| children  | ReactNode |    ❌    |     null      |      Renders the passed children                                                                 |
| suspense  |  boolean  |    ❌    |     false     | Used for rendering lazily loaded components                              |
| fallback  | ReactNode |    ❌    |     null      | Used for showing the fallback until the suspensed children have been loaded.  |

### Working

-  Based on evaulation of the condition flag the children are rendered.
-  If the condition is true then it will render the children otherwise null.
-  Working with one child
   -  If condition is true then child will be rendered.
   -  If condition is false then null gets rendered.
-  Working with children(more than one child)
   -  If condition is true then the first child will be rendered.
   -  Otherwise the all of the children will be rendered excluding the first child.

------
### Before (Conditional JSX with Ternary operator)
![with-ternary](https://github.com/user-attachments/assets/93ed579a-a1e1-41bc-8351-78a635e3e1f3)

### After (Conditional JSX with If-Else component)
![with-if-else](https://github.com/user-attachments/assets/ac2518f2-caa6-4b5d-98dd-fcf1e58a1c8b)
-------

### Examples

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

#### <i>Usage with Suspense</i>

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

### Examples

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

### Examples

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
| data     |   Array   |    ❌    |   undefined   | Used for looping over the data and rendering the children                             |
| children | ReactNode |    ❌    |     null      | Renders the `JSX` returned from child function |

### Working

-  Replacement of `Array.map` method.
-  Used to iterate over an array of items and renders the `JSX` based on the provided child function.

------
### Before (Looping over data with Array.map method)
![for-without](https://github.com/user-attachments/assets/2b8a944b-df94-42af-832b-2a6358b9cc9d)

### After (Looping over data with For component)
![for-with](https://github.com/user-attachments/assets/c93bf0ea-becf-489e-a1e1-86abc2ea8cd4)
-------

### Examples

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
| item     |    any    |    ❌    |   undefined   | The value used for comparing with all of the cases                                              |
| children | ReactNode |    ✅    |       -       | Used for rendering the children of matched case if found, else Default Case's children will be rendered |

### Working

-  Renders the children of particular matched case for given prop `item(switch value)`.
-  If none of cases are matched for given prop `item`, the `Default` case will be rendered.

> **Note:** The order of Default Case does not matter.

------
### Before (Switching component with different cases with Object switch logic)
![switch-without](https://github.com/user-attachments/assets/ba190cc5-f8d7-466e-96a1-d60e658e2401)

### After (Switching component with different cases with Switch component)
![switch-with](https://github.com/user-attachments/assets/68a72560-5c92-4a71-9e30-f1b3a294d9c3)
-------

### Examples

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
