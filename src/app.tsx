
import './app.scss'
import { Canvas } from '@react-three/fiber'
import { Stats, OrbitControls } from '@react-three/drei'
import { useEffect, useRef, useState } from 'react'
import { BoxGeometry, Vector3 } from 'three'

type Vec3 = { x: number, y: number, z: number}
type coordinateStr = string
const pixelGeometry = new BoxGeometry(1, 1, 0.2)

type Pixel = { color: string }

const randomColor = () => {
  const letters = '0123456789ABCDEF'
  let color = '#'
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}

export function App () {
  const orbitControlRef = useRef(null)

  const [pixels, setPixels] = useState<Record<coordinateStr, Pixel[]>>({ })

  return (
    <div
      id='canvas-container' style={{
        width: '100vw',
        height: '100vh',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 0,
      }}
    >
      <Canvas>
        <mesh
          onClick={(event) => {
            console.log('🚀 ~ App ~ event:', event)
            // orbitControlRef.current?.reset()

            if (!event.uv) { return }

            const newPixel = { color: randomColor() }

            const posStr = `${Math.floor(event.uv.x * 40) - 19.5} ${Math.floor(event.uv.y * 40) - 19.5} 0`

            setPixels((prev) => {
              if (prev[posStr]) {
                return { ...prev, [posStr]: [...prev[posStr], newPixel] }
              }
              return { ...prev, [posStr]: [newPixel] }
            })
          }}
        >
          <planeGeometry args={[40, 40]} />
          <shadowMaterial />
        </mesh>
        <ambientLight intensity={0.5} />
        <directionalLight color='red' position={[1, 3, 2]} />

        <gridHelper
          args={[40, 40]} rotation={[Math.PI * 0.5, 0, 0]} position={[0, 0, -10]}
        />
        {Object.entries(pixels).map(([key, value]) => {
          const [x, y, z] = key.split(' ').map(Number)

          return value.map((pixel, index) => {
            return (
              <mesh
                key={index}
                position={[x, y, 0.1 + index * 0.2]}
                geometry={pixelGeometry}
              >
                <meshStandardMaterial color={pixel.color} />
              </mesh>
            )
          })
        })}

        <OrbitControls
          ref={orbitControlRef}
        />
      </Canvas>
    </div>

  )
}
