import { Dash } from './Dash'
import Particles from './Particles/Particules'
import { getRandomBeetween } from './Utils'

class Animation {
  private particles: Particles[] = []
  private _isPaused: boolean = false
  private stage: HTMLCanvasElement
  private stageWidth!: number
  private stageHeight!: number
  private ctx: CanvasRenderingContext2D

  constructor (stage: HTMLCanvasElement) {
    this.stage = stage

    this.ctx = this.stage.getContext('2d')!
    this.resizing()
  }

  addParticle ({ clientX, clientY }: MouseEvent) {
    this.particles.push(this.createParticle(clientX, clientY))
  }

  generateRandomParticles (qtd: number) {
    this.particles = new Array(qtd)
      .fill(null)
      .map(this.createParticle.bind(this))
  }

  createParticle (defaultX: number, defaultY: number) {
    const x = defaultX ? defaultX : getRandomBeetween(0, this.stageWidth)
    const y = defaultY ? defaultY : getRandomBeetween(0, this.stageHeight)
    const radius = getRandomBeetween(5, 10)
    const speed = getRandomBeetween(-5, 5)
    const toLeftOrRight = getRandomBeetween(0, 1)
    const toTopOrDown = getRandomBeetween(0, 1)

    const particle = new Particles(x, y, radius, speed, '#000000')

    if (toTopOrDown) {
      particle.flipY()
    }

    if (toLeftOrRight) {
      particle.flipX()
    }

    return particle
  }

  moveParticle (particle: Particles) {
    const nextMoviment = particle.getNextPosition()

    if (nextMoviment.x > this.stageWidth || nextMoviment.x < 0) {
      particle.flipX()
    }

    if (nextMoviment.y > this.stageHeight || nextMoviment.y < 0) {
      particle.flipY()
    }

    particle.move()
  }

  buildElm () {
    const elmTobuild: Function[] = []

    for (let indexA = 0; indexA < this.particles.length; indexA++) {
      let currentParticle = this.particles[indexA]

      for (let indexB = 0; indexB < this.particles.length; indexB++) {
        let targetParticle = this.particles[indexB]
        const hasCollision = this.hasCollision(currentParticle, targetParticle)

        if (!hasCollision) {
          continue
        }

        elmTobuild.push((ctx: CanvasRenderingContext2D) => {
          const { x: x1, y: y1 } = currentParticle.getPosition()
          const { x: x2, y: y2 } = targetParticle.getPosition()

          const dash = new Dash({ x1, y1, x2, y2 })
          dash.build(ctx)
        })
      }

      this.moveParticle(currentParticle)
      elmTobuild.push((ctx: CanvasRenderingContext2D) => {
        currentParticle.build(ctx)
      })
    }

    return elmTobuild
  }

  hasCollision (current: Particles, target: Particles) {
    const positionCurrent = current.getPosition()
    const positionTarget = target.getPosition()
    const distanceX = positionCurrent.x - positionTarget.x
    const distanceY = positionCurrent.y - positionTarget.y
    const elevatedX = distanceX * distanceX
    const elevatedY = distanceY * distanceY
    const distance = Math.sqrt(elevatedX + elevatedY)

    const elevatedRadiusCurrent = current.getRadius() * 5
    const elevatedRadiusTarget = target.getRadius() * 5

    const colliding =
      distance > 0 && distance < elevatedRadiusCurrent + elevatedRadiusTarget

    return colliding
  }

  resizing () {
    this.stageWidth = document.body.clientWidth
    this.stageHeight = document.body.clientHeight

    this.stage.width = this.stageWidth
    this.stage.height = this.stageHeight
  }

  getStage () {
    return this.stage
  }

  run () {
    this.resizing()
    this.render()
  }

  render () {
    if (!this.isPaused()) {
      this.buildStage()
      this.buildElm().forEach(elmToRender => elmToRender(this.ctx))
    }

    requestAnimationFrame(this.render.bind(this))
  }

  buildStage () {
    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight)
    this.ctx.strokeRect(0, 0, this.stageWidth, this.stageHeight)
  }

  isPaused () {
    return this._isPaused
  }

  pause (pause: boolean = true) {
    this._isPaused = pause
  }
}

export default Animation
