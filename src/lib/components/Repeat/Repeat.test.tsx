import { render, screen } from '@testing-library/react'
import Repeat from './Repeat'

describe('Repeat.tsx', () => {
   it('should render without any errors or crash', () => {
      render(
         <Repeat times={1}>
            <div>this is going to repeated</div>
         </Repeat>
      )
   })

   it('should render nothing without any errors if <times> prop is not provided', () => {
      render(
         <Repeat>
            <div data-testid='children'>this is content</div>
         </Repeat>
      )
      expect(screen.queryByTestId('children')).not.toBeInTheDocument()
   })

   it('should render children repeated n times', () => {
      render(
         <Repeat times={3}>
            <div data-testid='children'>this is content</div>
         </Repeat>
      )
      expect(screen.queryAllByTestId('children').length).toBe(3)
   })

   it('should render children of function type repeated n times', () => {
      render(<Repeat times={3}>{(idx) => <div data-testid={`children-${idx}`}>this is content-{idx}</div>}</Repeat>)
      expect(screen.queryAllByTestId(/^children-(.*)$/).length).toBe(3)
      expect(screen.queryByTestId('children-0')).toBeInTheDocument()
      expect(screen.queryByTestId('children-1')).toBeInTheDocument()
      expect(screen.queryByTestId('children-2')).toBeInTheDocument()
   })
})
