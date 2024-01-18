import { Canvas } from "@react-three/fiber";
import { motion } from "framer-motion-3d"

const ThreeComponent = () => {
  return (
    <Canvas className="absolute inset-0">
      <motion.group>
        <motion.mesh>
          <boxGeometry />
          <meshBasicMaterial />
        </motion.mesh>
      </motion.group>
    </Canvas>
  )
}

export default ThreeComponent