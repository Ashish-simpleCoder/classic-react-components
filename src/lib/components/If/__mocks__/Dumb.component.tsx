import { ReactNode } from 'react'

export default function DumbComponent({ children }: { children?: ReactNode }) {
   if (children) {
      return <>{children}</>
   }
   return <div data-testid='dumb'>dumb implementation</div>
}
