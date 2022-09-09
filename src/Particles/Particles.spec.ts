import { describe, expect, it } from 'vitest'
import Particles from './Particules'

describe('Particles', () => {
  it('should return instanceof Particles class', () => {
    const particles = new Particles(0, 0, 0, 0)

    expect(particles).instanceOf(Particles)
  })

  it('should move particle to right and down with speed is 1', () => {
    const expected = { x: 2, y: 2 }
    const particles = new Particles(0, 0, 0, 1)

    particles.move()

    expect(particles.getNextPosition()).toMatchObject(expected)
  })

  it('should move particle to left and top with speed is -1', () => {
    const expected = { x: 0, y: 0 }
    const particles = new Particles(2, 2, 0, -1)

    particles.move()

    expect(particles.getNextPosition()).toMatchObject(expected)
  })

  it('should return new position when method setPosition is called', () => {
    const expectedBeforeCalled = { x: 0, y: 0 }
    const expectedAfterCalled = { x: 10, y: 10 }
    const particles = new Particles(0, 0, 0, -1)

    expect(particles.getPosition()).toMatchObject(expectedBeforeCalled)

    particles.setPosition({ x: 10, y: 10 })

    expect(particles.getPosition()).toMatchObject(expectedAfterCalled)
  })

  it('should return radius 8 when particle is created with radius 8', () => {
    const expected = 8
    const particles = new Particles(0, 0, 8, 0)

    expect(particles.getRadius()).toBe(expected)
  })

  it('should flip position y when mehotd flipY is called', () => {
    const expected = { x: 1, y: 3 }
    const particles = new Particles(2, 2, 0, -1)

    particles.flipY()

    expect(particles.getNextPosition()).toMatchObject(expected)
  })

  it('should flip position x when mehotd flipX is called', () => {
    const expected = { x: 3, y: 1 }
    const particles = new Particles(2, 2, 0, -1)

    particles.flipX()

    expect(particles.getNextPosition()).toMatchObject(expected)
  })

  it('should build canvas context with information particles', () => {
    const fakeCanvas = document.createElement('canvas')
    const fakeContext = fakeCanvas.getContext('2d')!

    const particles = new Particles(2, 2, 0, -1)

    particles.build(fakeContext)

    // @ts-ignore
    const path = fakeContext.__getPath()
    expect(path).toMatchSnapshot()
  })
})
