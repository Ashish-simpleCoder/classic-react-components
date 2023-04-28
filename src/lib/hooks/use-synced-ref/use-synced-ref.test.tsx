import { renderHook } from '@testing-library/react'
import useSyncedRef from './use-synced-ref'

describe('use-synced-ref', () => {
   it('should return the ref-object for passed state ', () => {
      const { result } = renderHook(() => useSyncedRef({ name: 'Developer' }))

      expect(result.current).toEqual({ current: { name: 'Developer' } })
   })

   it('should update the ref-object for passed state ', () => {
      const {
         result: { current },
         rerender,
      } = renderHook((props) => useSyncedRef(props || { name: 'Developer' }))

      expect(current).toEqual({ current: { name: 'Developer' } })

      rerender({ name: 'React' })
      expect(current).toEqual({ current: { name: 'React' } })

      rerender({ name: 'React', rank: 1 })
      expect(current).toEqual({ current: { name: 'React', rank: 1 } })
   })
})
