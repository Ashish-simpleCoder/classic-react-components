import { renderHook, waitFor } from '@testing-library/react'
import { vi } from 'vitest'
import useDebouncedFn from './use-debounced-fn'

describe('use-debounced-fn', () => {
   it('should return the debounced-callback', () => {
      const callback = vi.fn(function (a: number) {
         console.log(a)
      })
      const { result } = renderHook(() => useDebouncedFn(callback, 300))

      expect(typeof result.current).toBe('function')
   })

   it('should not call debounced-callback on initialization', () => {
      const callback = vi.fn(function (a: number) {
         console.log(a)
      })
      renderHook(() => useDebouncedFn(callback, 300))
      expect(callback).toHaveBeenCalledTimes(0)
   })

   it('should return the debounced-callback with 100ms delay, if delay is not provided', async () => {
      const callback = vi.fn(function (a: number) {
         console.log(a)
      })
      vi.useFakeTimers()
      const { result } = renderHook(() => useDebouncedFn(callback))

      result.current(10)
      vi.runAllTimers()

      expect(callback).toHaveBeenCalledTimes(1)
      expect(callback).toHaveBeenCalledWith(10)
   })

   it('should debounce the callback', async () => {
      const callback = vi.fn((a: number) => {
         console.log(a)
      })
      vi.useFakeTimers()

      const { result } = renderHook(() => useDebouncedFn(callback, 300))

      result.current(2)
      result.current(2)
      result.current(2)
      vi.runAllTimers()
      expect(callback).toHaveBeenCalledTimes(1)
      expect(callback).toHaveBeenCalledWith(2)

      result.current(5)
      vi.runAllTimers()
      expect(callback).toHaveBeenCalledTimes(2)
      expect(callback).toHaveBeenCalledWith(2)

      result.current(10)
      result.current(11)
      result.current(12)
      result.current(125)
      result.current(6)
      vi.runAllTimers()
      expect(callback).toHaveBeenCalledTimes(3)
      expect(callback).toHaveBeenCalledWith(6)
   })
})
