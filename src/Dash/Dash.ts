import { IDash, IPosition } from './types'

class Dash implements IDash {
  private x1!: number
  private y1!: number
  private x2!: number
  private y2!: number
  private color!: string

  constructor ({ x1, y1, x2, y2 }: IPosition, color: string = '#000000') {
    this.x1 = x1
    this.y1 = y1
    this.x2 = x2
    this.y2 = y2

    this.color = color
  }

  setPosition ({ x1, y1, x2, y2 }: IPosition) {
    this.x1 = x1
    this.y1 = y1
    this.x2 = x2
    this.y2 = y2
  }

  getPosition (): IPosition {
    return { x1: this.x1, y1: this.y1, x2: this.x2, y2: this.y2 }
  }

  build (ctx: CanvasRenderingContext2D): void {
    ctx.beginPath()
    ctx.moveTo(this.x1, this.y1)
    ctx.lineTo(this.x2, this.y2)
    ctx.strokeStyle = this.color
    ctx.stroke()
    ctx.closePath()
  }
}

export default Dash
