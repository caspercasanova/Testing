import React, { useRef, useMemo } from "react";
import { Canvas, useFrame, extend, useThree } from "react-three-fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import Effects from "./Effects";

function GlobeMesh() {
	const earthRef = useRef();
	const moonRef = useRef();

	useFrame(({ clock }) => {
		earthRef.current.position.z = Math.sin(clock.getElapsedTime()) * 10; //holyshit i cant believe this works
		earthRef.current.position.x = Math.cos(clock.getElapsedTime()) * 10;
		moonRef.current.position.z = earthRef.current.position.z + Math.cos(clock.getElapsedTime() / 1.5);
		moonRef.current.position.x = earthRef.current.position.x + Math.sin(clock.getElapsedTime() / 1.5);
	});
	
	return (
		<>
			<Stars />
			<mesh>
				<sphereBufferGeometry attach='geometry' args={[2, 64, 64]} />
				<meshBasicMaterial attach='material' color='gold' />
			</mesh>
			<mesh position={[0, 0, -5]} ref={earthRef}>
				<sphereBufferGeometry attach='geometry' args={[0.5, 64, 64]} />
				<meshBasicMaterial attach='material' color='green' />
			</mesh>
			<mesh position={[0, 0, -7]} ref={moonRef}>
				<sphereBufferGeometry attach='geometry' args={[0.1, 64, 64]} />
				<meshBasicMaterial attach='material' color='cyan' />
			</mesh>
		</>
	);
}

function Stars({ count = 5000 }) {
	const positions = useMemo(() => {
		let positions = [];
		for (let i = 0; i < count; i++) {
			positions.push(Math.random() * 10 * (Math.round(Math.random()) ? -40 : 40));
			positions.push(Math.random() * 10 * (Math.round(Math.random()) ? -40 : 40));
			positions.push(Math.random() * 10 * (Math.round(Math.random()) ? -40 : 40));
		}
		return new Float32Array(positions);
	}, [count]);
	return (
		<points>
			<bufferGeometry attach='geometry'>
				<bufferAttribute
					attachObject={["attributes", "position"]}
					count={positions.length / 3}
					array={positions}
					itemSize={3}
				/>
			</bufferGeometry>
			<pointsMaterial attach='material' size={1} sizeAttenuation color='white' transparent opacity={0.7} />
		</points>
	);
}

/* CONTROLS AND CANVAS */

extend({ OrbitControls });
function Controls(props) {
	const { camera, gl } = useThree();
	const orbitRef = useRef();
	return <orbitControls autorotate args={[camera, gl.domElement]} ref={orbitRef} />;
}


function GlobeCanvas() {
	return (
		<div className='globe_canvas'>
			<Canvas camera={{ position: [0, 0, 10] }}>
				<Effects />
				<Controls />
				<GlobeMesh />
			</Canvas>
		</div>
	);
}

export default GlobeCanvas;


