import { IParticles, IPosition } from './types'

class Particles implements IParticles {
  private x: number
  private y: number
  private radius: number
  private color: string
  private speed: number
  private moveX: number = 0
  private moveY: number = 0

  constructor (
    x: number,
    y: number,
    radius: number,
    speed: number,
    color: string = '#000000'
  ) {
    this.x = x
    this.y = y
    this.radius = radius
    this.color = color
    this.speed = speed

    this.calculateMoviment()
  }

  getRadius () {
    return this.radius
  }

  calculateMoviment () {
    const isPositiveMoveX = this.moveX >= 0
    const isPositiveMoveY = this.moveY >= 0

    this.moveX = isPositiveMoveX ? this.speed : this.speed * -1
    this.moveY = isPositiveMoveY ? this.speed : this.speed * -1
  }

  getNextPosition (): IPosition {
    return { x: this.x + this.moveX, y: this.y + this.moveY }
  }

  setPosition ({ x, y }: IPosition) {
    this.x = x
    this.y = y
  }

  getPosition (): IPosition {
    return { x: this.x, y: this.y }
  }

  flipX () {
    this.moveX = this.moveX * -1
  }

  flipY () {
    this.moveY = this.moveY * -1
  }

  move () {
    const { x, y } = this.getNextPosition()

    this.x = x
    this.y = y
  }

  build (cxt: CanvasRenderingContext2D) {
    cxt.beginPath()
    cxt.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
    cxt.fillStyle = this.color
    cxt.fill()
    cxt.closePath()
  }
}

export default Particles
