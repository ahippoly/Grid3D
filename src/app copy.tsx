
import './app.scss'
import { Canvas } from '@react-three/fiber'
import { Stats, OrbitControls } from '@react-three/drei'
import { useEffect, useRef, useState } from 'react'
import { BoxGeometry } from 'three'

type Vec3 = { x: number, y: number, z: number}
type coordinateStr = string
const pixelGeometry = new BoxGeometry(1, 1, 0.2)

export function App () {
  const [addedPixels, setAddedPixels] = useState<Record<coordinateStr, Vec3[]> >({ })
  console.log('🚀 ~ App ~ addedPixels:', addedPixels)
  const orbitControlRef = useRef(null)

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
      <Canvas
        camera={{
          position: [0, 0, 50],
          near: 0.001,
          far: 1000,
        }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight color='red' position={[0, 0, 2]} />
        <gridHelper
          args={[40, 40]}
          rotation={[Math.PI * 0.5, 0, 0]}
        />
        <mesh
          onClick={(event) => {
            console.log('🚀 ~ App ~ event:', event)
            console.log('🚀 ~ App ~ event:', event.uv?.x, event.uv?.y)

            if (!event.uv) { return }

            const newPixel = { x: Math.floor((event.uv?.x * 40)) - 19.5, y: Math.floor((event.uv?.y * 40)) - 19.5, z: 0.1 }

            console.log('🚀 ~ App ~ newPixel:', newPixel)
            // orbitControlRef.current?.reset()
            setAddedPixels((prev) => {
              const key = `${newPixel.x} ${newPixel.y} ${newPixel.z}`
              if (prev[key]) {
                return { ...prev, [key]: [...prev[key], newPixel] }
              }
              return { ...prev, [key]: [newPixel] }
            })
          }}
        >
          <planeGeometry args={[40, 40]} />
          <shadowMaterial />
        </mesh>

        {Object.keys(addedPixels).map((key) => {
          const pixels = addedPixels[key]
          return (
            <group key={key}>
              {pixels.map((pixel, pixelHistoryIndex) => {
                return (
                  <mesh
                    key={`${pixel.x} ${pixel.y} ${pixelHistoryIndex}`}
                    position={[pixel.x, pixel.y, pixel.z * pixelHistoryIndex]}
                    geometry={pixelGeometry}
                  >
                    <meshStandardMaterial color='red' />
                  </mesh>
                )
              })}
            </group>
          )
        })}

        {/* <mesh>
          <boxGeometry />
          <meshStandardMaterial />
        </mesh> */}
        <OrbitControls
          enableZoom
          enablePan
          enableRotate
          enableDamping
          ref={orbitControlRef}
        />
      </Canvas>
    </div>

  )
}
