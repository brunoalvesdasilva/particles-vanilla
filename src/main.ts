import './style.css'
import Animation from './Animation'

const scene = document.querySelector<HTMLCanvasElement>('#scene')!
const pause = document.querySelector<HTMLCanvasElement>('#pause')!

const animation = new Animation(scene)
animation.generateRandomParticles(100)

pause.addEventListener('click', event => {
  event.preventDefault()

  if (!animation.isPaused()) {
    animation.pause(true)
    pause.innerText = 'Continue'
    return
  }

  animation.pause(false)
  pause.innerText = 'Pause'
})

scene.addEventListener('click', event => animation.addParticle(event))

window.addEventListener('resize', () => animation.resizing())
window.addEventListener('DOMContentLoaded', () => animation.run())
