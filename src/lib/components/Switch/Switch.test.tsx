import { cleanup, render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import Switch from './Switch'

describe('Switch', () => {
   it('should render without errors', () => {
      let item = 'coding' as 'coding' | 'sleep'

      render(
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
      )
   })

   it('should render nothing if item prop is not provided', () => {
      render(
         <Switch>
            {({ Case, Default }) => {
               return (
                  <>
                     <Case value='any'>
                        <div>this is any case</div>
                     </Case>
                     <Default>
                        <div>this is default case</div>
                     </Default>
                  </>
               )
            }}
         </Switch>
      )
      expect(screen.queryByText(/this is any case/)).not.toBeInTheDocument()
      expect(screen.queryByText(/this is default case/)).not.toBeInTheDocument()
   })

   it('should render sleep Case', () => {
      let item = 'sleep' as 'coding' | 'sleep'

      render(
         <Switch item={item}>
            {({ Case, Default }) => {
               return (
                  <>
                     <Case value='coding'>
                        <div data-testid='coding'>coing-case</div>
                     </Case>
                     <Case value='sleep'>
                        <div data-testid='sleep'>sleep-case</div>
                     </Case>
                     <Default>
                        <div data-testid='default'>this is default case</div>
                     </Default>
                  </>
               )
            }}
         </Switch>
      )
      expect(screen.queryByTestId('coding')).not.toBeInTheDocument()
      expect(screen.queryByTestId('sleep')).toBeInTheDocument()
      expect(screen.queryByTestId('default')).not.toBeInTheDocument()
   })

   it('should work without passing the default case', () => {
      let item = 'coding' as 'coding' | 'sleep'

      render(
         <Switch item={item}>
            {({ Case }) => {
               return (
                  <>
                     <Case value='coding'>
                        <div data-testid='coding'>coing-case</div>
                     </Case>
                     <Case value='sleep'>
                        <div data-testid='sleep'>sleep-case</div>
                     </Case>
                  </>
               )
            }}
         </Switch>
      )
      expect(screen.queryByTestId('coding')).toBeInTheDocument()
      expect(screen.queryByTestId('sleep')).not.toBeInTheDocument()
   })

   it('should work without passing the default case-2, if none case is matched', () => {
      let item = 'awesome' as 'awesome' | 'coding' | 'sleep'

      render(
         <Switch item={item}>
            {({ Case }) => {
               return (
                  <>
                     <Case value='coding'>
                        <div data-testid='coding'>coing-case</div>
                     </Case>
                     <Case value='sleep'>
                        <div data-testid='sleep'>sleep-case</div>
                     </Case>
                  </>
               )
            }}
         </Switch>
      )
      expect(screen.queryByTestId('coding')).not.toBeInTheDocument()
      expect(screen.queryByTestId('sleep')).not.toBeInTheDocument()
   })

   it('should render Default case', () => {
      let item = 'awesome' as 'coding' | 'sleep' | 'awesome'

      render(
         <Switch item={item}>
            {({ Case, Default }) => {
               return (
                  <>
                     <Case value='coding'>
                        <div data-testid='coding'>coing-case</div>
                     </Case>
                     <Case value='sleep'>
                        <div data-testid='sleep'>sleep-case</div>
                     </Case>
                     <Default>
                        <div data-testid='default'>this is default</div>
                     </Default>
                  </>
               )
            }}
         </Switch>
      )
      expect(screen.queryByTestId('coding')).not.toBeInTheDocument()
      expect(screen.queryByTestId('sleep')).not.toBeInTheDocument()
      expect(screen.queryByTestId('default')).toBeInTheDocument()
   })

   it('should console warning for multiple Default case', () => {
      let item = 'awesome' as 'coding' | 'sleep' | 'awesome'

      const consoleFn = vi.fn(() => {})
      const consoleLogMock = vi.spyOn(console, 'warn').mockImplementation(consoleFn)

      render(
         <Switch item={item}>
            {({ Case, Default }) => {
               return (
                  <>
                     <Case value='coding'>
                        <div data-testid='coding'>coing-case</div>
                     </Case>
                     <Case value='sleep'>
                        <div data-testid='sleep'>sleep-case</div>
                     </Case>
                     <Default>
                        <div data-testid='default'>this is default</div>
                     </Default>
                     <Default>
                        <div data-testid='default-2'>this is default-2</div>
                     </Default>
                  </>
               )
            }}
         </Switch>
      )
      expect(screen.queryByTestId('coding')).not.toBeInTheDocument()
      expect(screen.queryByTestId('sleep')).not.toBeInTheDocument()
      expect(screen.queryByTestId('default')).toBeInTheDocument()
      expect(screen.queryByTestId('default-2')).not.toBeInTheDocument()

      expect(consoleFn).toBeCalledTimes(1)
      expect(consoleFn).toBeCalledWith('You can not use multiple Default-Case inside Switch')

      expect(consoleLogMock).toBeCalledTimes(1)
      expect(consoleLogMock).toBeCalledWith('You can not use multiple Default-Case inside Switch')
   })

   it('should console warning if used HtmlElement or any Component inside Switch', () => {
      let item = 'awesome' as 'coding' | 'sleep' | 'awesome'

      const consoleFn = vi.fn(() => {})
      const consoleLogMock = vi.spyOn(console, 'warn').mockImplementation(consoleFn)

      const Comp = () => <div>this is custom component</div>

      render(
         <Switch item={item}>
            {({ Case, Default }) => {
               return (
                  <>
                     <div>this is custom element</div>
                     <Comp />
                     <Case value='coding'>
                        <div data-testid='coding'>coing-case</div>
                     </Case>
                     <Case value='sleep'>
                        <div data-testid='sleep'>sleep-case</div>
                     </Case>
                     <Default>
                        <div data-testid='default'>this is default</div>
                     </Default>
                  </>
               )
            }}
         </Switch>
      )
      expect(screen.queryByTestId('coding')).not.toBeInTheDocument()
      expect(screen.queryByTestId('sleep')).not.toBeInTheDocument()
      expect(screen.queryByTestId('default')).toBeInTheDocument()

      expect(consoleFn).toBeCalledTimes(2)
      expect(consoleFn).toBeCalledWith('You must use Default or Case component inside Switch')

      expect(consoleLogMock).toBeCalledTimes(2)
      expect(consoleLogMock).toBeCalledWith('You must use Default or Case component inside Switch')
   })

   it('should not render children of Case, if value != item', () => {
      let item = 'awesome' as 'coding' | 'sleep' | 'awesome'

      let CapturedCase:
         | (({ children, value }: { children?: React.ReactNode; value: 'coding' | 'sleep' | 'awesome' }) => JSX.Element)
         | undefined

      render(
         <Switch item={item}>
            {({ Case }) => {
               CapturedCase = Case
               return <></>
            }}
         </Switch>
      )
      cleanup()

      render(
         // @ts-ignore
         <CapturedCase value='sleep'>
            <div data-testid='children'>children</div>
         </CapturedCase>
      )
      expect(screen.queryByTestId('children')).not.toBeInTheDocument()
   })

   describe('single children', () => {
      it('should be able to handle one children', () => {
         const item = 'test' as 'test' | 'vitest'
         const { rerender } = render(
            <Switch item={item}>
               {({ Case, Default }) => {
                  return (
                     <>
                        <Case value='test'>
                           <div>this is test case</div>
                        </Case>
                     </>
                  )
               }}
            </Switch>
         )
         expect(screen.queryByText(/this is test case/)).toBeInTheDocument()

         //case-handling if one case and value != item
         rerender(
            <Switch item={item}>
               {({ Case, Default }) => {
                  return (
                     <>
                        {/* @ts-ignore */}
                        <Case value='temp'>
                           <div>this is test case</div>
                        </Case>
                     </>
                  )
               }}
            </Switch>
         )
      })
      it('should be able to handle one children-2', () => {
         const item = 'test' as 'test' | 'vitest'

         render(
            <Switch item={item}>
               {({ Case, Default }) => {
                  return (
                     <>
                        <Default>
                           <div>this is default case</div>
                        </Default>
                     </>
                  )
               }}
            </Switch>
         )
         expect(screen.queryByText(/this is default case/)).toBeInTheDocument()
      })
   })
})
