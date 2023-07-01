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

   it('should throw error if children is not function', () => {
      const data = [{ name: 'react' }, { name: 'nextjs' }, { name: 'typescript' }]

      // prettier-ignore
      // @ts-expect-error
      expect(() =>render(<For data={data}><div data-testid='child'></div></For>)).toThrowError('Children type must be a function.')

      expect(screen.queryByTestId('child')).not.toBeInTheDocument()
   })

   it('should render all of the children', () => {
      const data = [{ name: 'react' }, { name: 'nextjs' }, { name: 'typescript' }]

      render(
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
   })
})
