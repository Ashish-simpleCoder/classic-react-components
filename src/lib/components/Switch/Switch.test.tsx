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

   it('should render coding named div', () => {
      let item = 'coding' as 'coding' | 'sleep'

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
      expect(screen.queryByTestId('coding')).toBeInTheDocument()
      expect(screen.queryByTestId('sleep')).not.toBeInTheDocument()
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

   it('should render default case', () => {
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

   it('should console warning if used HtmlElement inside Switch', () => {
      let item = 'awesome' as 'coding' | 'sleep' | 'awesome'

      const consoleFn = vi.fn(() => {})
      const consoleLogMock = vi.spyOn(console, 'warn').mockImplementation(consoleFn)

      render(
         <Switch item={item}>
            {({ Case, Default }) => {
               return (
                  <>
                     <div>this is custom element</div>
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

      expect(consoleFn).toBeCalledTimes(1)
      expect(consoleFn).toBeCalledWith(
         'Only Default and Case component are allowed. Skipping the rendering for HtmlElement',
         'div'
      )

      expect(consoleLogMock).toBeCalledTimes(1)
      expect(consoleLogMock).toBeCalledWith(
         'Only Default and Case component are allowed. Skipping the rendering for HtmlElement',
         'div'
      )
   })

   it('should console warning if used component is not "Default" or "Case" inside Swtich', () => {
      let item = 'awesome' as 'coding' | 'sleep' | 'awesome'

      const consoleFn = vi.fn(() => {})
      const consoleLogMock = vi.spyOn(console, 'warn').mockImplementation(consoleFn)
      const Comp = () => <div>this is custom component</div>

      render(
         <Switch item={item}>
            {({ Case, Default }) => {
               return (
                  <>
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

      expect(consoleFn).toBeCalledTimes(1)
      expect(consoleFn).toBeCalledWith(
         'Only Default and Case component are allowed. Skipping the rendering for',
         'Comp',
         'component'
      )

      expect(consoleLogMock).toBeCalledTimes(1)
      expect(consoleLogMock).toBeCalledWith(
         'Only Default and Case component are allowed. Skipping the rendering for',
         'Comp',
         'component'
      )
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

   it('should validate normal js function used inside Switch as cases.', () => {
      let item = 'awesome' as 'coding' | 'sleep' | 'awesome'

      const consoleFn = vi.fn(() => {})
      const consoleLogMock = vi.spyOn(console, 'warn').mockImplementation(consoleFn)

      const fn = vi.fn(() => {})

      render(
         <Switch item={item}>
            {({ Case }) => {
               return (
                  <>
                     <Case value='awesome'>
                        <div>item</div>
                     </Case>
                     {fn()}
                  </>
               )
            }}
         </Switch>
      )

      expect(consoleFn).toBeCalledTimes(1)
      expect(fn).toBeCalledTimes(1)
      expect(consoleFn).toBeCalledWith('You can"t call function, You must use Default or Case component')

      expect(consoleLogMock).toBeCalledTimes(1)
      expect(consoleLogMock).toBeCalledWith('You can"t call function, You must use Default or Case component')
   })
})
