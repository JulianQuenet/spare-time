import { useState, Suspense } from 'react'
import { Canvas } from "@react-three/fiber";
import { Physics, RigidBody } from "@react-three/rapier";
import { Controls } from './Controls';
import { Box } from '@react-three/drei';
import { Scene } from './Compenents/Scene';
function Game() {
 

  return (
    <>
    <Canvas  shadows camera={{ fov: 50, position: [5, 3, 2] }}>
    <directionalLight intensity={1} position={[2,10,2]}/>
    <ambientLight />
    <color attach="background" args={["lightblue"]} />
    <Suspense>
    <Physics debug>
    <Controls />
    <Scene/>
    <RigidBody type='fixed'>
    <Box args={[100,1,100]}>
      <meshStandardMaterial color={"grey"}/>
    </Box>
    </RigidBody>
    </Physics>
    </Suspense>
    </Canvas > 

    </>
  )
}

export default Game
