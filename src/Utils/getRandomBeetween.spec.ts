import { describe, it, expect, vi, afterEach } from 'vitest'
import getRandomBeetween from './getRandomBeetWeen'

describe('getRandomBeetween', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should get random number range in list 1 or 2', () => {
    const randomNumber = getRandomBeetween(1, 2)

    expect(randomNumber).toBeLessThanOrEqual(2)
    expect(randomNumber).toBeGreaterThanOrEqual(1)
  })

  it('should return 2 with Math.random return 1', () => {
    const spy = vi.spyOn(Math, 'random')
    spy.mockReturnValue(1)

    const randomNumber = getRandomBeetween(1, 2)
    expect(randomNumber).toBe(2)
  })

  it('should return 2 with Math.random return 1.5', () => {
    const spy = vi.spyOn(Math, 'random')
    spy.mockReturnValue(0.9)

    const randomNumber = getRandomBeetween(1, 2)
    expect(randomNumber).toBe(1.9)
  })

  it('should return 1 with Math.random return 0', () => {
    const spy = vi.spyOn(Math, 'random')
    spy.mockReturnValue(0)

    const randomNumber = getRandomBeetween(1, 2)
    expect(randomNumber).toBe(1)
  })

  it('should return 1.5 with Math.random return 0.5', () => {
    const spy = vi.spyOn(Math, 'random')
    spy.mockReturnValue(0.5)

    const randomNumber = getRandomBeetween(1, 2)
    expect(randomNumber).toBe(1.5)
  })
})
