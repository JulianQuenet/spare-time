import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Capsule, PointerLockControls,} from "@react-three/drei/core";
import { useThree, useFrame } from "@react-three/fiber";
import { RigidBody, CapsuleCollider} from "@react-three/rapier";
import usePlayerControls from "./Compenents/inputs";
import { Hands } from "./Compenents/Pistol";





export const Controls = ()=>{
const { camera} = useThree();
const { forward, backward, left, right} = usePlayerControls();
const playerRef = useRef<any>();
const handsRef = useRef<any>();
const direction = new THREE.Vector3();
const frontVector = new THREE.Vector3();
const sideVector = new THREE.Vector3();
const SPEED = 4.5



useEffect(() => {
  camera.rotation.y = -14.125;
  camera.rotation.x = 0;
  camera.rotation.z = 0;
}, []);

useFrame(()=>{
  // Player movement base on camera direction/rotation
  const time = Date.now() * 0.00095;
  frontVector.set(0, 0, Number(backward) - Number(forward));
  sideVector.set(Number(left) - Number(right), 0, 0);
  direction
    .subVectors(frontVector, sideVector)
    .normalize()
    .multiplyScalar(SPEED)
    .applyEuler(camera.rotation);

    if (playerRef.current) {
        playerRef.current.setAdditionalMass(0.5)
        playerRef.current.lockRotations(true, true); //Locks rotation because of capsule body
        const position = playerRef.current.translation();
        // Setting camera position and creating walking/breathing affect
        camera.position.x = position.x;
        camera.position.z = position.z;
        if (right || left || forward || backward) {
           
        } else {
          camera.position.y = position.y + Math.sin(time * 4.5) * 0.0095 + 3
        }
        
        playerRef.current.setLinvel(
          { x: direction.x, y: 0, z: direction.z },
          true
        );
        
        setHands();

        }
       

        
     
})

function setHands(){
    const time = Date.now() * 0.00035;
    handsRef.current.rotation.copy(camera.rotation)
    handsRef.current.position.copy(camera.position)
    handsRef.current.translateY(-0.285 + Math.sin(time * 5.5) * 0.0095 )
    handsRef.current.translateZ(-0.075)
    handsRef.current.translateX(-0.075)
    
  }


return (
    <> 
    <PointerLockControls camera={camera}/>
    <RigidBody
        gravityScale={0}
        position={[10, 1, 0]}
        ref={playerRef}
        colliders={false}
        userData={
          {name : "player"}
        }
      >
        <CapsuleCollider args={[0.0 ,1.2]}>
        </CapsuleCollider>
      </RigidBody>
     
      <mesh ref={handsRef} >
     
        <Hands />
      </mesh>
     
    </>
   
)};