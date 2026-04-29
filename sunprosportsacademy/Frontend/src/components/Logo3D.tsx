import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'

// Setup Draco Decoder (needed for compressed models)
const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/')
const gltfLoader = new GLTFLoader()
gltfLoader.setDRACOLoader(dracoLoader)

// Global Cache to prevent re-loading on remount
let cachedModel: THREE.Group | null = null

interface Logo3DProps {
    spinProgress?: number // 0→1: drives the 360 spin
    tilt?: number         // Target Z rotation tilt (side-lean)
}

export default function Logo3D({ spinProgress = 0, tilt = 0 }: Logo3DProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    const spinRef = useRef(spinProgress)
    const tiltRef = useRef(tilt)

    useEffect(() => {
        spinRef.current = spinProgress
        tiltRef.current = tilt
    }, [spinProgress, tilt])

    useEffect(() => {
        if (!containerRef.current) return
        const container = containerRef.current

        const scene = new THREE.Scene()
        const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000)
        camera.position.set(0, 0, 6)

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
        renderer.setSize(container.clientWidth, container.clientHeight)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        renderer.outputColorSpace = THREE.SRGBColorSpace
        container.appendChild(renderer.domElement)

        // Lights
        scene.add(new THREE.AmbientLight(0xffffff, 2))
        const sun = new THREE.DirectionalLight(0xffd6a0, 3)
        sun.position.set(5, 10, 5)
        scene.add(sun)
        scene.add(new THREE.HemisphereLight(0x87CEEB, 0xffffff, 2))

        // ── Nested Group Architecture ───────────────────────────────
        // pivot (parent) handles TILT (Left/Right lean)
        // model (child) handles SPIN (Y rotation)
        // pivot (parent) handles TILT (Left/Right lean)
        // model (child) handles SPIN (Y rotation)
        const pivot = new THREE.Group()
        scene.add(pivot)

        let model: THREE.Group | null = null
        const BASE_Y = -Math.PI / 2

        const setupModel = (loadedModel: THREE.Group) => {
            model = loadedModel.clone() // Clone from cache
            const box = new THREE.Box3().setFromObject(model)
            model.position.sub(box.getCenter(new THREE.Vector3()))
            const size = box.getSize(new THREE.Vector3())
            model.scale.setScalar(3.5 / Math.max(size.x, size.y, size.z))
            model.rotation.y = BASE_Y
            pivot.add(model)
        }

        if (cachedModel) {
            setupModel(cachedModel)
        } else {
            gltfLoader.load('/logo-3d.glb', (gltf) => {
                cachedModel = gltf.scene
                setupModel(cachedModel)
            })
        }

        let animId: number
        const animate = (time: number) => {
            animId = requestAnimationFrame(animate)

            // Apply TILT to parent (always side-to-side relative to camera)
            const breathTilt = Math.sin(time * 0.0007) * 0.03
            pivot.rotation.z = breathTilt + tiltRef.current

            if (model) {
                // Apply SPIN to child
                model.rotation.y = BASE_Y + spinRef.current * Math.PI * 2
                // Floating base
                pivot.position.y = Math.sin(time * 0.001) * 0.15
            }

            renderer.render(scene, camera)
        }
        animId = requestAnimationFrame(animate)

        const onResize = () => {
            if (!container) return
            camera.aspect = container.clientWidth / container.clientHeight
            camera.updateProjectionMatrix()
            renderer.setSize(container.clientWidth, container.clientHeight)
        }
        window.addEventListener('resize', onResize)

        // ── Robust Cleanup ──────────────────────────────────────────
        return () => {
            cancelAnimationFrame(animId)
            window.removeEventListener('resize', onResize)

            // Dispose of everything in the scene
            scene.traverse((object) => {
                if (object instanceof THREE.Mesh) {
                    object.geometry.dispose()
                    if (object.material instanceof THREE.Material) {
                        object.material.dispose()
                    } else if (Array.isArray(object.material)) {
                        object.material.forEach(m => m.dispose())
                    }
                }
            })

            // Dispose of renderer
            renderer.dispose()
            renderer.forceContextLoss()

            if (container && container.contains(renderer.domElement)) {
                container.removeChild(renderer.domElement)
            }
        }
    }, [])

    return <div ref={containerRef} style={{ width: '100%', height: '100%' }} />
}
