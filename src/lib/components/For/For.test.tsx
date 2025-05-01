import { render, screen } from '@testing-library/react'
import For from './For'

describe('For.tsx', () => {
   it('should render without any errors or crash', () => {
      const data = [{ name: 'react' }, { name: 'nextjs' }, { name: 'typescript' }]
      render(<For data={data}>{(item, i) => <div key={i}>{item.name}</div>}</For>)
   })

   it('should render without children', () => {
      const data = [{ name: 'react' }, { name: 'nextjs' }, { name: 'typescript' }]
      render(<For data={data}></For>)
   })

   it('should render without data prop and children', () => {
      render(<For></For>)
   })

   it('should throw error if data is not type of an array', () => {
      let data = {}

      // prettier-ignore
      // @ts-expect-error
      expect(() =>render(<For data={data}><div data-testid='child'></div></For>)).toThrowError('Type of data prop must be an array, but got object type.')

      data = 'sdfsdfs'
      // prettier-ignore
      // @ts-expect-error
      expect(() =>render(<For data={data}><div data-testid='child'></div></For>)).toThrowError('Type of data prop must be an array, but got string type.')

      data = () => {}
      // prettier-ignore
      // @ts-expect-error
      expect(() =>render(<For data={data}><div data-testid='child'></div></For>)).toThrowError('Type of data prop must be an array, but got function type.')

      expect(screen.queryByTestId('child')).not.toBeInTheDocument()
   })

   it('should throw error if children is not type of function', () => {
      const data = [{ name: 'react' }, { name: 'nextjs' }, { name: 'typescript' }]

      // prettier-ignore
      // @ts-expect-error
      expect(() =>render(<For data={data}><div data-testid='child'></div></For>)).toThrowError('Type of children prop must be a function but got object type.')

      expect(screen.queryByTestId('child')).not.toBeInTheDocument()
   })

   it('should render all of the children', () => {
      let data = [{ name: 'react' }, { name: 'nextjs' }, { name: 'typescript' }]

      const { rerender } = render(
         <For data={data}>
            {(item, i) => (
               <div key={i} data-testid={item.name}>
                  {item.name}
               </div>
            )}
         </For>
      )
      expect(screen.queryByTestId('react')).toBeInTheDocument()
      expect(screen.queryByTestId('nextjs')).toBeInTheDocument()
      expect(screen.queryByTestId('typescript')).toBeInTheDocument()

      // re-render with new data
      data = [{ name: 'react' }, { name: 'nextjs' }, { name: 'vuejs' }, { name: 'typescript' }]

      rerender(
         <For data={data}>
            {(item, i) => (
               <div key={i} data-testid={item.name}>
                  {item.name}
               </div>
            )}
         </For>
      )
      expect(screen.queryByTestId('react')).toBeInTheDocument()
      expect(screen.queryByTestId('nextjs')).toBeInTheDocument()
      expect(screen.queryByTestId('vuejs')).toBeInTheDocument()
      expect(screen.queryByTestId('typescript')).toBeInTheDocument()
   })
})
