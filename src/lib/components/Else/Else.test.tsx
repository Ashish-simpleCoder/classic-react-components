import Else from './Else'
import { render, screen } from '@testing-library/react'

describe('Else.tsx', () => {
   it('should render without any errors or crash', () => {
      render(<Else>This is the content</Else>)
   })
   it('should render the passes children', () => {
      render(
         <Else>
            <div data-testid='element'> this is element </div>
         </Else>,
      )
      expect(screen.getByTestId('element')).toBeInTheDocument()
   })
})
