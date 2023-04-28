import Then from './Then'
import { render, screen } from '@testing-library/react'

describe('Then.tsx', () => {
   it('should render without any errors or crash', () => {
      render(<Then>This is the content</Then>)
   })

   it('should render fine without any children', () => {
      render(<Then></Then>)
   })

   it('should render the passes children', () => {
      render(
         <Then>
            <div data-testid='element'> this is element </div>
         </Then>
      )
      expect(screen.getByTestId('element')).toBeInTheDocument()
   })
})
