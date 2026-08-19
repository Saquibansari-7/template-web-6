import { useEffect, useRef } from 'react'

/** Animated gold particle canvas for the hero background. */
export default function ParticleCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let particles = []
    let animationId

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    class Particle {
      constructor() { this.reset() }
      reset() {
        this.x = Math.random() * canvas.width
        this.y = canvas.height + Math.random() * 100
        this.size = Math.random() * 2 + 0.5
        this.speedY = Math.random() * 0.5 + 0.2
        this.speedX = (Math.random() - 0.5) * 0.3
        this.opacity = Math.random() * 0.5 + 0.1
        this.life = 0
        this.maxLife = Math.random() * 300 + 200
      }
      update() {
        this.y -= this.speedY
        this.x += this.speedX + Math.sin(this.life * 0.02) * 0.3
        this.life++
        if (this.y < -10 || this.life > this.maxLife) this.reset()
      }
      draw() {
        const fade = Math.min(this.life / 50, 1) * Math.min((this.maxLife - this.life) / 50, 1)
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(201, 168, 76, ${this.opacity * fade})`
        ctx.fill()
      }
    }

    const count = window.matchMedia('(max-width: 768px)').matches ? 35 : 80
    for (let i = 0; i < count; i++) particles.push(new Particle())

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach((p) => { p.update(); p.draw() })
      animationId = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas id="particle-canvas" ref={canvasRef} />
}
