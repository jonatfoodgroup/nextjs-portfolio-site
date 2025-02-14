"use client";
import React, { useEffect, useRef, useState } from "react";
import ForceGraph3D from "3d-force-graph";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass";

import * as THREE from "three";
import * as d3 from "d3-force";

const colorPalette = [
    "#6A5ACD", "#8A2BE2", "#00CED1", "#9370DB",
    "#7B68EE", "#32CD32", "#4169E1", "#20B2AA",
    "#9370DB", "#008B8B"
];
const generateSampleData = () => {
    const N = 600; // Reduce node count slightly for clarity
    const clusters = 10; // Number of galaxies
    const nodes = [];
    const links = [];

    // Define separate clusters ("galaxies") with extreme spread
    const galaxyCenters = Array.from({ length: clusters }, () => ({
        x: Math.random() * 12000 - 6000, // Huge spread
        y: Math.random() * 12000 - 6000,
        z: Math.random() * 12000 - 6000
    }));

    // Generate nodes within separate galaxies
    for (let i = 0; i < N; i++) {
        const galaxy = i % clusters;
        nodes.push({
            id: i,
            group: galaxy,
            label: `Node ${i}`,
            color: colorPalette[galaxy % colorPalette.length],
            x: galaxyCenters[galaxy].x + Math.random() * 800 - 400, // Increased spread within galaxies
            y: galaxyCenters[galaxy].y + Math.random() * 800 - 400,
            z: galaxyCenters[galaxy].z + Math.random() * 800 - 400
        });
    }

    // Generate minimal intra-galaxy links
    for (let i = 0; i < N; i++) {
        if (Math.random() < 0.4) { // 40% chance of a connection
            const target = Math.floor(Math.random() * (N / clusters)) + (Math.floor(i / (N / clusters)) * (N / clusters));
            links.push({ source: i, target });
        }
    }

    // Very sparse inter-galaxy links
    for (let i = 0; i < clusters; i++) {
        for (let j = i + 1; j < clusters; j++) {
            if (Math.random() < 0.1) { // 10% chance of cross-galaxy link
                const source = Math.floor(Math.random() * (N / clusters)) + (i * (N / clusters));
                const target = Math.floor(Math.random() * (N / clusters)) + (j * (N / clusters));
                links.push({ source, target });
            }
        }
    }

    return { nodes, links };
};



const ForceGraph = ({ backgroundColor = "#000003", graphData }) => {
    const graphRef = useRef();
    const [hoveredNode, setHoveredNode] = useState(null);
    const [selectedNode, setSelectedNode] = useState(null);

    useEffect(() => {
        if (typeof window !== "undefined" && graphRef.current) {
            const Graph = ForceGraph3D()(graphRef.current)
                .backgroundColor(backgroundColor)
                .nodeLabel("label")
                .nodeColor(node => node.color)
                .nodeRelSize(64) // **Increase size for larger dots**
                .linkColor(() => "rgba(255, 255, 255, .2)") // Softer links
                .linkDirectionalParticles(2)
                .linkDirectionalParticleWidth(1)
                .linkHoverPrecision(10)
                .linkOpacity(0.2); // Reduce link brightness for contrast
    
            // **Generate and apply spread-out galaxy data**
            const sampleData = generateSampleData();
            Graph.graphData(sampleData);
    
            // 🌟 **Brighter & Glowing Nodes**
            Graph.nodeThreeObject((node) => {
                const material = new THREE.MeshStandardMaterial({
                    color: node.color,
                    emissive: node.color, // **Adds glow**
                    emissiveIntensity: 2.5, // **Boost glow effect**
                    transparent: true,
                    opacity: 1
                });
    
                const size = node.id === "entry-point" ? 25 : 14; // **Larger node size**
                return new THREE.Mesh(new THREE.SphereGeometry(size, 32, 32), material);
            });
    
            // 🌌 **Add Unreal Bloom Glow Effect**
            const bloomPass = new UnrealBloomPass(
                new THREE.Vector2(window.innerWidth, window.innerHeight),
                2.0, // **Increase glow intensity**
                1.0,
                0.1
            );
            bloomPass.strength = 10.5; // **Stronger glow**
            bloomPass.radius = 0.8;
            bloomPass.threshold = 0.01; // **Glow at low brightness too**
            const composer = Graph.postProcessingComposer();
            composer.addPass(bloomPass);
    
            // 🌠 **Improve galaxy separation**
            Graph.d3Force("charge", d3.forceManyBody().strength(-2000)); // More repulsion
            Graph.d3Force("link", d3.forceLink().distance(900).strength(0.05)); // Looser, more natural
            Graph.d3Force("x", d3.forceX().strength(0.005));
            Graph.d3Force("y", d3.forceY().strength(0.005));
    
            // 🚀 **Pull camera back for a grander view**
            Graph.cameraPosition(
                { x: 0, y: 0, z: 10000 }, // Zoom out
                { x: 0, y: 0, z: 0 },
                0
            );

            // 🎨 **Hover Effects*
            Graph.onNodeHover(node => {
                setHoveredNode(node ? node.label : null);
            });

           // 🔥 **Emit Particles Randomly at Intervals**
        function emitParticlesRandomly() {
            const link = sampleData.links[Math.floor(Math.random() * sampleData.links.length)];
            if (link) {
                Graph.emitParticle(link);
            }
        }


        // Set up interval for automatic particle emission
        const particleInterval = setInterval(() => {
            [...Array(10).keys()].forEach(() => emitParticlesRandomly());
        }, 3000); // Emits particles every 3 seconds

        return () => {
            clearInterval(particleInterval);
            if (Graph) {
                Graph.pauseAnimation();
                Graph._destructor && Graph._destructor();
            }
        };
        }
    }, [backgroundColor, graphData]);
    
    

    return (
        <div style={{ position: "relative", width: "100%", height: "100vh", cursor: "pointer" }}>
            <div ref={graphRef} />

            {/* Display hovered node label */}
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
                        zIndex: 8,
                    }}
                >
                    {hoveredNode}
                </div>
            )}

            {/* Display selected node label */}
            {selectedNode && (
                <div
                    style={{
                        position: "absolute",
                        bottom: "10px",
                        left: "10px",
                        padding: "5px 10px",
                        backgroundColor: "#ffcc00",
                        borderRadius: "5px",
                        color: "#000",
                        fontWeight: "bold",
                        zIndex: 8,
                    }}
                >
                    Selected: {selectedNode}
                </div>
            )}
        </div>
    );
};

export default ForceGraph;