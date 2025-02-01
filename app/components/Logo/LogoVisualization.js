"use client"; // Ensure this runs only on the client-side
import React, { useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import * as THREE from "three";

// Dynamically import Canvas to prevent SSR issues
const Canvas = dynamic(() => import("@react-three/fiber").then((mod) => mod.Canvas), { ssr: false });
const useFrame = dynamic(() => import("@react-three/fiber").then((mod) => mod.useFrame), { ssr: false });

// Node Component
const Node = React.forwardRef(({ position, id }, ref) => {
    useFrame(({ clock }) => {
        if (!ref.current) return; // Ensure ref is valid before using

        const time = clock.getElapsedTime();
        const randomFactor = id % 5;

        ref.current.position.set(
            position[0] + Math.sin(time * 1.5 + randomFactor) * 0.1,
            position[1] + Math.cos(time * 1.3 + randomFactor) * 0.1,
            position[2] + Math.sin(time * 1.1 + randomFactor) * 0.1
        );
    });

    return (
        <mesh ref={ref} position={position}>
            <sphereGeometry args={[0.13, 32, 32]} />
            <meshStandardMaterial color="white" />
        </mesh>
    );
});

// Edge Component
const Edge = ({ startNode, endNode }) => {
    const ref = useRef();

    useFrame(({ clock }) => {
        if (!ref.current || !startNode.current || !endNode.current) return;

        const start = startNode.current.position.clone();
        const end = endNode.current.position.clone();
        const midPoint = new THREE.Vector3().lerpVectors(start, end, 0.5);
        const direction = new THREE.Vector3().subVectors(end, start).normalize();
        const length = start.distanceTo(end);

        const quaternion = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction);

        ref.current.position.copy(midPoint);
        ref.current.quaternion.copy(quaternion);
        ref.current.scale.y = length;

        // Pulsing effect
        ref.current.material.opacity = Math.abs(Math.sin(clock.getElapsedTime()));
    });

    return (
        <mesh ref={ref}>
            <cylinderGeometry args={[0.02, 0.02, 1, 16]} />
            <meshStandardMaterial color="white" transparent opacity={1} />
        </mesh>
    );
};

// 3D Circular Structure
const CircularStructure = () => {
    const nodes = [];
    const edges = [];
    const radius = 2.4; // Increased radius for larger network
    const nodeCount = 9;

    // Distribute nodes uniformly in 3D space
    for (let i = 0; i < nodeCount; i++) {
        const phi = Math.acos(-1 + (2 * i) / nodeCount);
        const theta = Math.sqrt(nodeCount * Math.PI) * phi;
        const x = radius * Math.cos(theta) * Math.sin(phi);
        const y = radius * Math.sin(theta) * Math.sin(phi);
        const z = radius * Math.cos(phi);
        nodes.push({ position: [x, y, z], ref: React.createRef(), id: i });
    }

    // Connect nodes with edges
    for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
            if (Math.random() > 0.5) {
                edges.push({ startNode: nodes[i], endNode: nodes[j] });
            }
        }
    }

    return (
        <>
            {nodes.map((node, idx) => (
                <Node key={idx} ref={node.ref} position={node.position} id={node.id} />
            ))}
            {edges.map((edge, idx) => (
                <Edge key={idx} startNode={edge.startNode.ref} endNode={edge.endNode.ref} />
            ))}
        </>
    );
};

// Rotating Group
const RotatingGroup = ({ children }) => {
    const groupRef = useRef();

    useFrame(({ clock }) => {
        if (!groupRef.current) return;

        const time = clock.getElapsedTime();
        groupRef.current.rotation.x = Math.sin(time * 0.8) * 0.2 + Math.PI / 8;
        groupRef.current.rotation.y = time * 0.3;
    });

    return <group ref={groupRef} scale={1.8}>{children}</group>; // Increased scale
};

// Main Logo Component
const LogoVisualization = ({ color = "white" }) => {
    return (
        <div
            style={{
                width: "125px",
                height: "125px",
                background: "black",
                borderRadius: "50%",
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
            }}
        >
            <Canvas
                style={{
                    width: "100%",
                    height: "100%",
                }}
            >
                <ambientLight intensity={5} />
                <RotatingGroup>
                    <CircularStructure />
                </RotatingGroup>
            </Canvas>
        </div>
    );
};

export default LogoVisualization;