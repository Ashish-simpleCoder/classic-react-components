import { vi } from 'vitest'
import { renderHook } from '@testing-library/react'
import useOnMountEffect from './use-on-mount-effect'

describe('should be able to handle cb', () => {
   it('should run the callback only once', () => {
      const cb = vi.fn(() => {
         console.log('awesome')
      })

      const { rerender } = renderHook(() => useOnMountEffect(cb))

      expect(cb).toHaveBeenCalledTimes(1)
      rerender()
      rerender()
      rerender()
      expect(cb).toHaveBeenCalledTimes(1)
   })
   it('should call cleanup function on unmount', () => {
      const cleanup = vi.fn(() => {
         console.log('this is cleanup')
      })
      const cb = vi.fn(() => {
         console.log('awesome')
         return cleanup
      })

      const { rerender, unmount } = renderHook(() => useOnMountEffect(cb))

      expect(cb).toHaveBeenCalledTimes(1)
      rerender()

      unmount()
      expect(cleanup).toHaveBeenCalledTimes(1)
   })
})
