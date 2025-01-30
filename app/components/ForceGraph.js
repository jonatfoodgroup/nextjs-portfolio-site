"use client";
import React, { useEffect, useRef, useState } from "react";
import ForceGraph3D from "3d-force-graph";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass";
import * as THREE from "three";
import * as d3 from "d3-force";

const ForceGraph = ({ backgroundColor = "#000003", graphData }) => {
    const graphRef = useRef();
    const [hoveredNode, setHoveredNode] = useState(null); // To keep track of the hovered node

    useEffect(() => {
        if (typeof window !== "undefined") {
            const Graph = ForceGraph3D()(graphRef.current)
                .backgroundColor(backgroundColor)
                .nodeLabel("label") // Show node label
                .nodeAutoColorBy("group") // Color nodes based on their group
                .linkColor(() => "#ffffff") // Set link color
                .linkDirectionalParticles(1) // Set the number of particles
                .linkDirectionalParticleColor(() => 'cyan') // Set particle color
                .linkDirectionalParticleWidth(3); // Set particle width

            // Add Z-layer dynamics to nodes
            graphData.nodes.forEach((node) => {
                node.z = Math.random() * 800 - 150; // Random Z-axis placement for depth
            });

            // Load graph data
            Graph.graphData(graphData);

            // Node appearance
            Graph.nodeThreeObject((node) => {
                const material = new THREE.MeshStandardMaterial({
                    color: node.color || node.group,
                    emissive: node.color || node.group, // Glow effect
                    emissiveIntensity: 0.5,
                });
                const size = node.id === "entry-point" ? 15 : 7; // Highlight entry-point node
                const sphere = new THREE.Mesh(
                    new THREE.SphereGeometry(size, 32, 32), // Adjust size and detail
                    material
                );
                return sphere;
            });

            // Link appearance
            Graph.linkThreeObjectExtend(true); // Allow custom link objects
            Graph.linkThreeObject((link) => {
                const geometry = new THREE.BufferGeometry().setFromPoints([
                    new THREE.Vector3(
                        link.source.x,
                        link.source.y,
                        link.source.z || 0
                    ),
                    new THREE.Vector3(
                        link.target.x,
                        link.target.y,
                        link.target.z || 0
                    ),
                ]);

                const material = new THREE.LineBasicMaterial({
                    color: "#ffffff", // White links
                    linewidth: 1, // Link thickness
                });

                return new THREE.Line(geometry, material);
            });

            // Add UnrealBloomPass for glow effect
            const bloomPass = new UnrealBloomPass();
            bloomPass.strength = 2.5; // Glow intensity
            bloomPass.radius = 1.0; // Glow spread
            bloomPass.threshold = 0.2; // Glow threshold
            const composer = Graph.postProcessingComposer();
            composer.addPass(bloomPass);

            // Set initial camera position and focus
            Graph.cameraPosition(
                { x: 200, y: 300, z: 400 }, // Adjust these values to match your desired view
                { x: 0, y: 0, z: 0 }, // Target focus
                0 // No transition duration for immediate start position
            );

            // Adjust forces for better layout
            Graph.d3Force("charge", d3.forceManyBody().strength(-500)); // Spread nodes further
            Graph.d3Force("link", d3.forceLink().distance(200).strength(1)); // Longer link distances

            // Slowly rotate the camera around the center of the graph
            let angle = 0;
            const rotateGraph = () => {
                angle += 0.0002; // Control the speed of the rotation
                const x = Math.sin(angle) * 500; // X-coordinate for camera rotation
                const z = Math.cos(angle) * 500; // Z-coordinate for camera rotation
                Graph.cameraPosition({ x, y: 300, z }, { x: 0, y: 0, z: 0 }, 0); // Set new camera position
                requestAnimationFrame(rotateGraph); // Continuously update the position
            };
            // rotateGraph(); // Start rotating the graph

            // Show the label when hovering over a node
            Graph.onNodeHover((node) => {
                if (node) {
                    setHoveredNode(node.label); // Update hovered node state with the node's label
                } else {
                    setHoveredNode(null); // Reset label when hover is removed
                }
            });

            // Emit particles every few seconds at random nodes
            const emitParticlesPeriodically = () => {
                setInterval(() => {
                    const randomNode = graphData.nodes[Math.floor(Math.random() * graphData.nodes.length)];
                    console.log("Emitting particle from random node", randomNode);
                    Graph.emitParticle(randomNode); // Emit particle from random node
                }, 3000); // Adjust the interval (e.g., 3 seconds) to control how often particles are emitted
            };

            // Start emitting particles periodically
            emitParticlesPeriodically();

            // Cleanup on unmount
            return () => {
                composer.removePass(bloomPass);
                Graph.dispose();
            };
        }
    }, [backgroundColor, graphData]);

    return (
        <div style={{ position: "relative", width: "100%", height: "50vh" }}>
            <div ref={graphRef} />
            {/* Display label when a node is hovered */}
            {hoveredNode && (
                <div
                    style={{
                        position: "absolute",
                        top: "10px",
                        left: "10px",
                        padding: "5px 10px",
                        backgroundColor: "#fff",
                        borderRadius: "5px",
                        color: "#000",
                        fontWeight: "bold",
                        zIndex: 8
                    }}
                >
                    {hoveredNode}
                </div>
            )}
        </div>
    );
};

export default ForceGraph;