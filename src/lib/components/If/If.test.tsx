import { render, screen, waitFor } from '@testing-library/react'
import { lazy } from 'react'
import If from './If'

describe('If.tsx', () => {
   it('should render without any errors or crash', () => {
      render(
         <If condition={true}>
            <div>this is content</div>
         </If>
      )
   })
   it('should render without any errors or crash without condition prop', () => {
      render(
         <If>
            <div data-testid='children'>this is content</div>
         </If>
      )
      expect(screen.queryByTestId('children')).not.toBeInTheDocument()
   })
   it('should render without any errors or crash without children', () => {
      render(<If></If>)
   })

   describe('should be able to handle all scenarios for one children', () => {
      it('should render children if condition is true', () => {
         render(
            <If condition={true}>
               <div data-testid='content'>this is content</div>
            </If>
         )
         expect(screen.queryByTestId('content')).toBeInTheDocument()
      })

      it('should not render children if condition is false', () => {
         render(
            <If condition={false}>
               <div data-testid='content'>this is content</div>
            </If>
         )
         expect(screen.queryByTestId('content')).not.toBeInTheDocument()
      })

      describe('suspensed component handling', () => {
         it('should able to handle suspense component without fallback with true condition', async () => {
            const DumbComponent = lazy(() => import('./__mocks__/Dumb.component'))

            render(
               <If condition={true} suspense>
                  <DumbComponent />
               </If>
            )
            expect(screen.queryByTestId('dumb')).not.toBeInTheDocument()

            await waitFor(() => {
               expect(screen.queryByTestId('dumb')).toBeInTheDocument()
            })
         })

         it('should able to handle suspense component with fallback with true condition', async () => {
            const DumbComponent = lazy(() => import('./__mocks__/Dumb.component'))

            render(
               <If condition={true} suspense fallback={<h1 data-testid='fallback'>loading....</h1>}>
                  <DumbComponent>
                     <div data-testid='children-dumb'></div>
                  </DumbComponent>
               </If>
            )
            expect(screen.queryByTestId('fallback')).toBeInTheDocument()
            expect(screen.queryByTestId('dumb')).not.toBeInTheDocument()

            await waitFor(() => {
               expect(screen.queryByTestId('fallback')).not.toBeInTheDocument()
               expect(screen.queryByTestId('children-dumb')).toBeInTheDocument()
            })
         })

         it('should able to handle suspense component without fallback with false condition', async () => {
            const DumbComponent = lazy(() => import('./__mocks__/Dumb.component'))

            render(
               <If condition={false} suspense>
                  <DumbComponent />
               </If>
            )

            expect(screen.queryByTestId('dumb')).not.toBeInTheDocument()

            await waitFor(() => {
               expect(screen.queryByTestId('dumb')).not.toBeInTheDocument()
            })
         })

         it('should able to handle suspense component with fallback with true condition', async () => {
            const DumbComponent = lazy(() => import('./__mocks__/Dumb.component'))

            render(
               <If condition={false} suspense fallback={<h1 data-testid='fallback'>loading....</h1>}>
                  <DumbComponent />
               </If>
            )
            expect(screen.queryByTestId('fallback')).not.toBeInTheDocument()
            expect(screen.queryByTestId('dumb')).not.toBeInTheDocument()

            await waitFor(() => {
               expect(screen.queryByTestId('fallback')).not.toBeInTheDocument()
               expect(screen.queryByTestId('dumb')).not.toBeInTheDocument()
            })
         })
      })
   })

   describe('should be able to handle all scenarios for multiple children', () => {
      it('should render first children if condition is true', () => {
         render(
            <If condition={true}>
               <div data-testid='content'>this is content</div>
               <div data-testid='content-2'>this is content-2</div>
               <div data-testid='content-3'>this is content-3</div>
            </If>
         )
         expect(screen.queryByTestId('content')).toBeInTheDocument()
         expect(screen.queryByTestId('content-2')).not.toBeInTheDocument()
         expect(screen.queryByTestId('content-3')).not.toBeInTheDocument()
      })

      it('should not render children if condition is false', () => {
         render(
            <If condition={false}>
               <div data-testid='content'>this is content</div>
               <div data-testid='content-2'>this is content-2</div>
               <div data-testid='content-3'>this is content-3</div>
            </If>
         )
         expect(screen.queryByTestId('content')).not.toBeInTheDocument()
         expect(screen.queryByTestId('content-2')).toBeInTheDocument()
         expect(screen.queryByTestId('content-3')).toBeInTheDocument()
      })

      describe('suspensed component handling', () => {
         it('should able to handle suspense component without fallback with true condition', async () => {
            const DumbComponent = lazy(() => import('./__mocks__/Dumb.component'))

            render(
               <If condition={true} suspense>
                  <DumbComponent />
                  <div data-testid='content'>this is content</div>
               </If>
            )
            expect(screen.queryByTestId('dumb')).not.toBeInTheDocument()
            expect(screen.queryByTestId('content')).not.toBeInTheDocument()

            await waitFor(() => {
               expect(screen.queryByTestId('dumb')).toBeInTheDocument()
               expect(screen.queryByTestId('content')).not.toBeInTheDocument()
            })
         })

         it('should able to handle suspense component with fallback with true condition', async () => {
            const DumbComponent = lazy(() => import('./__mocks__/Dumb.component'))

            render(
               <If condition={true} suspense fallback={<h1 data-testid='fallback'>loading....</h1>}>
                  <DumbComponent />
                  <div data-testid='content'>this is content</div>
               </If>
            )
            expect(screen.queryByTestId('fallback')).toBeInTheDocument()
            expect(screen.queryByTestId('content')).not.toBeInTheDocument()

            await waitFor(() => {
               expect(screen.queryByTestId('fallback')).not.toBeInTheDocument()
               expect(screen.queryByTestId('dumb')).toBeInTheDocument()

               expect(screen.queryByTestId('content')).not.toBeInTheDocument()
            })
         })

         it('should able to handle suspense component without fallback with false condition', async () => {
            const DumbComponent = lazy(() => import('./__mocks__/Dumb.component'))

            render(
               <If condition={false} suspense>
                  <DumbComponent />
                  <div data-testid='content'>this is content</div>
                  <div data-testid='content-2'>this is content-2</div>
               </If>
            )

            expect(screen.queryByTestId('dumb')).not.toBeInTheDocument()
            expect(screen.queryByTestId('content')).toBeInTheDocument()
            expect(screen.queryByTestId('content-2')).toBeInTheDocument()

            await waitFor(() => {
               expect(screen.queryByTestId('dumb')).not.toBeInTheDocument()
               expect(screen.queryByTestId('content')).toBeInTheDocument()
               expect(screen.queryByTestId('content-2')).toBeInTheDocument()
            })
         })

         it('should able to handle suspense component with fallback with true condition', async () => {
            const DumbComponent = lazy(() => import('./__mocks__/Dumb.component'))

            render(
               <If condition={false} suspense fallback={<h1 data-testid='fallback'>loading....</h1>}>
                  <DumbComponent />
                  <div data-testid='content'>this is content</div>
                  <div data-testid='content-2'>this is content-2</div>
               </If>
            )
            expect(screen.queryByTestId('fallback')).not.toBeInTheDocument()
            expect(screen.queryByTestId('dumb')).not.toBeInTheDocument()

            expect(screen.queryByTestId('content')).toBeInTheDocument()
            expect(screen.queryByTestId('content-2')).toBeInTheDocument()

            await waitFor(() => {
               expect(screen.queryByTestId('fallback')).not.toBeInTheDocument()
               expect(screen.queryByTestId('dumb')).not.toBeInTheDocument()

               expect(screen.queryByTestId('content')).toBeInTheDocument()
               expect(screen.queryByTestId('content-2')).toBeInTheDocument()
            })
         })
      })
   })

   describe('component condition flag change dynamically', () => {
      it('should render first children when condition becomes false to true, otherwise rest of the remaining children gets renders', () => {
         const { rerender } = render(
            <If condition={false}>
               <div data-testid='content'>content</div>
               <div data-testid='content-2'>content-falsy</div>
            </If>
         )

         expect(screen.queryByTestId('content')).not.toBeInTheDocument()
         expect(screen.queryByTestId('content-2')).toBeInTheDocument()

         rerender(
            <If condition={true}>
               <div data-testid='content'>content</div>
               <div data-testid='content-2'>content-falsy</div>
            </If>
         )

         expect(screen.queryByTestId('content')).toBeInTheDocument()
         expect(screen.queryByTestId('content-2')).not.toBeInTheDocument()

         rerender(
            <If condition={false}>
               <div data-testid='content'>content</div>
               <div data-testid='content-2'>content-falsy</div>
               <div data-testid='content-3'>content falsy children</div>
            </If>
         )
         expect(screen.queryByTestId('content')).not.toBeInTheDocument()
         expect(screen.queryByTestId('content-2')).toBeInTheDocument()
         expect(screen.queryByTestId('content-3')).toBeInTheDocument()
      })
   })

   describe('component suspense with dynamic condition flag', () => {
      it('should not load the first children', async () => {
         const DumbComponent = lazy(() => import('./__mocks__/Dumb.component'))

         const { rerender } = render(
            <If condition={false} suspense fallback={<div data-testid='fallback'>loading... </div>}>
               <DumbComponent />
               <div data-testid='content'>this is else block</div>
            </If>
         )
         expect(screen.queryByTestId('dumb')).not.toBeInTheDocument()
         expect(screen.queryByTestId('fallback')).not.toBeInTheDocument()
         expect(screen.queryByTestId('content')).toBeInTheDocument()

         rerender(
            <If condition={true} suspense fallback={<div data-testid='fallback'>loading... </div>}>
               <DumbComponent />
               <div data-testid='content'>this is else block</div>
            </If>
         )
         expect(screen.queryByTestId('fallback')).toBeInTheDocument()
         expect(screen.queryByTestId('dumb')).not.toBeInTheDocument()
         expect(screen.queryByTestId('content')).not.toBeInTheDocument()

         await waitFor(() => {
            expect(screen.queryByTestId('fallback')).not.toBeInTheDocument()
            expect(screen.queryByTestId('dumb')).toBeInTheDocument()
            expect(screen.queryByTestId('content')).not.toBeInTheDocument()
         })
      })
   })
})
