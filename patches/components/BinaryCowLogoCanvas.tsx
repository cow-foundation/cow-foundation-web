"use client"

import React, { useRef, useEffect, useCallback, useState } from 'react'
import styled from 'styled-components'
import GUI from 'lil-gui'

// --- Controls ---
// Set to false to disable the lil-gui panel for production.
const ENABLE_GUI = false
// ----------------

// --- Animation Configuration ---
// Use this object to easily tweak the animation's appearance.
const ANIMATION_CONFIG = {
  // Sets the spacing of the grid used to sample particles.
  // A larger value creates more space between particles, making the overall shape less dense.
  PARTICLE_SPACING: 12,
  // Base font size for each particle.
  FONT_SIZE: 12,
  // How fast particles move towards their target position. Higher is faster.
  PARTICLE_SPEED: 0.02,
  // --- Shape & Ratio ---
  // Controls the overall size of the cow shape on the canvas.
  SHAPE_SCALE: 0.85,
  // The threshold for generating a '1' vs a '0'. Higher means more 0s.
  ONE_TO_ZERO_RATIO: 0.8,
  // Chance (from 0 to 1) for a binary digit to flip each frame.
  BINARY_FLIP_CHANCE: 0.002,
  // --- Organic Movement ---
  // Controls the horizontal range of the "wobble" effect.
  ORGANIC_MOVEMENT_X_SCALE: 0,
  // Controls the vertical range of the "wobble" effect.
  ORGANIC_MOVEMENT_Y_SCALE: 0,
  // Controls the speed of the horizontal wobble.
  ORGANIC_MOVEMENT_X_SPEED: 0,
  // Controls the speed of the vertical wobble.
  ORGANIC_MOVEMENT_Y_SPEED: 0,
  // --- Opacity ---
  // The base opacity for each particle (0 to 1).
  BASE_OPACITY: 1,
  // The amount the opacity will fluctuate (0 to 1).
  OPACITY_VARIANCE: 1,
  // The speed of the opacity fluctuation cycle.
  OPACITY_CYCLE_SPEED: 0.2,
  // --- Color Shifting ---
  // The three colors that make up the particle gradient.
  COLOR_1: '#000000',  
  COLOR_2: '#d4c3c2',  
  COLOR_3: '#ffffff',  
  // Base speed for the color transition cycle.
  COLOR_SHIFT_SPEED: 1,
  // How much a particle's distance from the center affects its color.
  COLOR_SHIFT_DISTANCE_FACTOR: 0.005,
}
// ---------------------------

const CanvasContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 0;
  overflow: hidden;  
`

const Canvas = styled.canvas`
  width: 100%;
  height: 100%;
  filter: drop-shadow(0 0 30px rgba(101, 217, 255, 0.4));
`

interface Particle {
  x: number
  y: number
  baseX: number
  baseY: number
  targetX: number
  targetY: number
  char: string
  opacity: number
  size: number
  color: string
  speed: number
  angle: number
  distance: number
  explodeVelocityX: number
  explodeVelocityY: number
  time: number
  expandRandomness: number
  organicPhase: number
}

// Helper to convert hex color string to an RGB object
const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null
}

// Generate accurate cow shape based on the actual SVG icon by drawing it and sampling pixels
const generateCowPoints = (
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D
): Array<{ x: number; y: number }> => {
  const points: Array<{ x: number; y: number }> = []
  const svgPath =
    'M13.653 24a4.011 4.011 0 0 1-3.824-2.79L7.11 12.666H5.44a4.01 4.01 0 0 1-3.825-2.791L0 4.8h6.058L2.863 0h30.274l-3.195 4.8H36l-1.615 5.076a4.01 4.01 0 0 1-3.825 2.79h-1.67l-2.72 8.544A4.01 4.01 0 0 1 22.346 24h-8.693ZM11.6 10.333c0 1.289.965 2.334 2.156 2.334 1.19 0 2.155-1.045 2.155-2.334 0-1.288-.965-2.333-2.155-2.333S11.6 9.045 11.6 10.333Zm12.8 0c0 1.289-.965 2.334-2.156 2.334-1.19 0-2.155-1.045-2.155-2.334 0-1.288.965-2.333 2.155-2.333S24.4 9.045 24.4 10.333Z'
  const path = new Path2D(svgPath)

  const viewBoxWidth = 36
  const viewBoxHeight = 24

  // Scale the icon to fill a good portion of the canvas.
  const scale = (Math.min(canvas.width, canvas.height) / viewBoxHeight) * ANIMATION_CONFIG.SHAPE_SCALE
  const pathWidth = viewBoxWidth * scale
  const pathHeight = viewBoxHeight * scale
  const offsetX = (canvas.width - pathWidth) / 2
  const offsetY = (canvas.height - pathHeight) / 2

  // Temporarily draw the path to get its pixel data
  ctx.save()
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.translate(offsetX, offsetY)
  ctx.scale(scale, scale)
  ctx.fillStyle = 'white' // Color doesn't matter, just need non-transparent pixels
  ctx.fill(path, 'evenodd')

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
  ctx.restore() // Restore context to its original state (removes transform)
  ctx.clearRect(0, 0, canvas.width, canvas.height) // Clean up the temporary drawing

  // Sample the pixel data. A larger step means fewer particles (less dense).
  const step = ANIMATION_CONFIG.PARTICLE_SPACING
  for (let y = 0; y < imageData.height; y += step) {
    for (let x = 0; x < imageData.width; x += step) {
      // The data is a 1D array of RGBA values. Get the alpha for the current pixel.
      const alpha = imageData.data[(y * imageData.width + x) * 4 + 3]
      if (alpha > 0) {
        points.push({ x: x, y: y })
      }
    }
  }

  return points
}

// Gradient color interpolation with more vibrant colors
const interpolateColor = (progress: number): string => {
  const color1 = hexToRgb(ANIMATION_CONFIG.COLOR_1)
  const color2 = hexToRgb(ANIMATION_CONFIG.COLOR_2)
  const color3 = hexToRgb(ANIMATION_CONFIG.COLOR_3)

  if (!color1 || !color2 || !color3) return 'rgb(255,255,255)' // Fallback color

  // Three-color gradient
  if (progress < 0.5) {
    const p = progress * 2
    const r = Math.round(color1.r + (color2.r - color1.r) * p)
    const g = Math.round(color1.g + (color2.g - color1.g) * p)
    const b = Math.round(color1.b + (color2.b - color1.b) * p)
    return `rgb(${r}, ${g}, ${b})`
  } else {
    const p = (progress - 0.5) * 2
    const r = Math.round(color2.r + (color3.r - color2.r) * p)
    const g = Math.round(color2.g + (color3.g - color2.g) * p)
    const b = Math.round(color2.b + (color3.b - color2.b) * p)
    return `rgb(${r}, ${g}, ${b})`
  }
}

export const BinaryCowLogoCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const particlesRef = useRef<Particle[]>([])
  const timeRef = useRef(0)
  const [configVersion, setConfigVersion] = useState(0)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  // Update canvas dimensions and trigger re-initialization
  const updateDimensions = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const container = canvas.parentElement
    if (container) {
      const newWidth = container.clientWidth
      const newHeight = container.clientHeight
      
      // Only update if dimensions actually changed
      if (newWidth !== dimensions.width || newHeight !== dimensions.height) {
        setDimensions({ width: newWidth, height: newHeight })
      }
    }
  }, [dimensions.width, dimensions.height])

  // This function re-initializes the entire animation.
  // We wrap it in useCallback to keep its reference stable across re-renders,
  // preventing the useEffect hook from running unnecessarily.
  const initAnimation = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size to match container
    const container = canvas.parentElement
    if (container) {
      canvas.width = container.clientWidth
      canvas.height = container.clientHeight
    }
    
    ctx.font = `bold ${ANIMATION_CONFIG.FONT_SIZE}px "Courier New", monospace`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'

    const cowPoints = generateCowPoints(canvas, ctx)

    particlesRef.current = cowPoints.map((point, i) => {
      const angle = Math.atan2(point.y - canvas.height * 0.5, point.x - canvas.width * 0.5)
      const distance = Math.hypot(point.x - canvas.width * 0.5, point.y - canvas.height * 0.5)
      
      return {
        x: point.x,
        y: point.y,
        baseX: point.x,
        baseY: point.y,
        targetX: point.x,
        targetY: point.y,
        char: Math.random() > ANIMATION_CONFIG.ONE_TO_ZERO_RATIO ? '1' : '0',
        opacity: 1,
        size: ANIMATION_CONFIG.FONT_SIZE,
        color: interpolateColor(Math.random()),
        speed: ANIMATION_CONFIG.PARTICLE_SPEED,
        angle: angle,
        distance: distance,
        explodeVelocityX: 0,
        explodeVelocityY: 0,
        time: Math.random() * 100,
        expandRandomness: 0.7 + Math.random() * 0.6,
        organicPhase: Math.random() * Math.PI * 2
      }
    })
  }, [])


  // Effect for handling resize events
  useEffect(() => {
    const handleResize = () => {
      updateDimensions()
    }

    // Initial dimension update
    updateDimensions()

    // Add resize listener with debounce for performance
    let resizeTimeout: NodeJS.Timeout
    const debouncedResize = () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(handleResize, 100)
    }

    window.addEventListener('resize', debouncedResize)

    // Also use ResizeObserver for more accurate container size changes
    const canvas = canvasRef.current
    let resizeObserver: ResizeObserver | null = null
    
    if (canvas && canvas.parentElement && 'ResizeObserver' in window) {
      resizeObserver = new ResizeObserver(debouncedResize)
      resizeObserver.observe(canvas.parentElement)
    }

    return () => {
      window.removeEventListener('resize', debouncedResize)
      clearTimeout(resizeTimeout)
      if (resizeObserver) {
        resizeObserver.disconnect()
      }
    }
  }, [updateDimensions])

  // Effect for setting up the GUI controls
  useEffect(() => {
    if (!ENABLE_GUI) return

    const gui = new GUI()
    gui.title("Animation Controls")

    const forceReset = () => setConfigVersion(v => v + 1)

    // --- Spacing & Font ---
    const layoutFolder = gui.addFolder('Layout & Spacing')
    layoutFolder.add(ANIMATION_CONFIG, 'PARTICLE_SPACING', 4, 40, 1).name('Particle Spacing').onFinishChange(forceReset)
    layoutFolder.add(ANIMATION_CONFIG, 'FONT_SIZE', 8, 40, 1).name('Font Size').onFinishChange(forceReset)
    layoutFolder.add(ANIMATION_CONFIG, 'PARTICLE_SPEED', 0.01, 0.2, 0.01).name('Particle Speed')
    
    // --- Shape & Ratio ---
    const shapeFolder = gui.addFolder('Shape & Ratio')
    shapeFolder.add(ANIMATION_CONFIG, 'SHAPE_SCALE', 0.1, 2.0, 0.05).name('Shape Scale').onFinishChange(forceReset)
    shapeFolder.add(ANIMATION_CONFIG, 'ONE_TO_ZERO_RATIO', 0, 1, 0.05).name('1:0 Ratio').onFinishChange(forceReset)
    shapeFolder.add(ANIMATION_CONFIG, 'BINARY_FLIP_CHANCE', 0, 0.1, 0.001).name('Flip Chance')
    
    // --- Movement ---
    const movementFolder = gui.addFolder('Organic Movement')
    movementFolder.add(ANIMATION_CONFIG, 'ORGANIC_MOVEMENT_X_SCALE', 0, 10, 0.5).name('X Scale')
    movementFolder.add(ANIMATION_CONFIG, 'ORGANIC_MOVEMENT_Y_SCALE', 0, 10, 0.5).name('Y Scale')
    movementFolder.add(ANIMATION_CONFIG, 'ORGANIC_MOVEMENT_X_SPEED', 0, 1, 0.05).name('X Speed')
    movementFolder.add(ANIMATION_CONFIG, 'ORGANIC_MOVEMENT_Y_SPEED', 0, 1, 0.05).name('Y Speed')

    // --- Opacity ---
    const opacityFolder = gui.addFolder('Opacity')
    opacityFolder.add(ANIMATION_CONFIG, 'BASE_OPACITY', 0, 1, 0.05).name('Base Opacity')
    opacityFolder.add(ANIMATION_CONFIG, 'OPACITY_VARIANCE', 0, 1, 0.05).name('Variance')
    opacityFolder.add(ANIMATION_CONFIG, 'OPACITY_CYCLE_SPEED', 0, 2, 0.05).name('Cycle Speed')

    // --- Color ---
    const colorFolder = gui.addFolder('Color Shifting')
    colorFolder.addColor(ANIMATION_CONFIG, 'COLOR_1').name('Color 1')
    colorFolder.addColor(ANIMATION_CONFIG, 'COLOR_2').name('Color 2')
    colorFolder.addColor(ANIMATION_CONFIG, 'COLOR_3').name('Color 3')
    colorFolder.add(ANIMATION_CONFIG, 'COLOR_SHIFT_SPEED', 0, 2, 0.05).name('Speed')
    colorFolder.add(ANIMATION_CONFIG, 'COLOR_SHIFT_DISTANCE_FACTOR', 0, 0.02, 0.001).name('Distance Factor')

    // Cleanup function to remove the GUI when the component unmounts
    return () => {
      gui.destroy()
    }
  }, [initAnimation])


  // Main animation effect. It re-runs whenever the configVersion or dimensions change.
  useEffect(() => {
    // Skip if dimensions haven't been initialized yet
    if (dimensions.width === 0 || dimensions.height === 0) return
    
    initAnimation()

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    const animate = () => {
      if (!ctx || !canvas) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      timeRef.current += 0.016
      
      particlesRef.current.forEach((particle, index) => {
        particle.time += 0.05
        
        // More organic, fluid movement
        const organicOffsetX = Math.sin(particle.time * ANIMATION_CONFIG.ORGANIC_MOVEMENT_X_SPEED + particle.organicPhase) * ANIMATION_CONFIG.ORGANIC_MOVEMENT_X_SCALE
        const organicOffsetY = Math.cos(particle.time * ANIMATION_CONFIG.ORGANIC_MOVEMENT_Y_SPEED + particle.organicPhase * 0.7) * ANIMATION_CONFIG.ORGANIC_MOVEMENT_Y_SCALE
        
        particle.targetX = particle.baseX + organicOffsetX
        particle.targetY = particle.baseY + organicOffsetY
        particle.opacity = ANIMATION_CONFIG.BASE_OPACITY + Math.sin(particle.time * ANIMATION_CONFIG.OPACITY_CYCLE_SPEED) * ANIMATION_CONFIG.OPACITY_VARIANCE
        
        // Smooth position updates with momentum
        const dx = particle.targetX - particle.x
        const dy = particle.targetY - particle.y
        particle.x += dx * particle.speed
        particle.y += dy * particle.speed
        
        // Smoother, more organic color shifting
        const distFromCenter = Math.hypot(particle.x - canvas.width * 0.5, particle.y - canvas.height * 0.5)
        const colorProgress = (Math.sin(particle.time * ANIMATION_CONFIG.COLOR_SHIFT_SPEED + distFromCenter * ANIMATION_CONFIG.COLOR_SHIFT_DISTANCE_FACTOR + particle.organicPhase) + 1) * 0.5
        particle.color = interpolateColor(colorProgress)
        
        // Occasionally flip binary value
        if (Math.random() < ANIMATION_CONFIG.BINARY_FLIP_CHANCE) {
          particle.char = particle.char === '1' ? '0' : '1'
        }
        
        // Render main particle
        ctx.save()
        ctx.globalAlpha = particle.opacity
        ctx.fillStyle = particle.color
        ctx.font = `bold ${particle.size}px "Courier New", monospace`
        ctx.fillText(particle.char, particle.x, particle.y)
        ctx.restore()
      })
      
      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [initAnimation, configVersion, dimensions])

  return (
    <CanvasContainer>
      <Canvas ref={canvasRef} />
    </CanvasContainer>
  )
}