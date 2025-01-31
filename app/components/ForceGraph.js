"use client";
import React, { useEffect, useRef, useState } from "react";
import ForceGraph3D from "3d-force-graph";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass";
import * as THREE from "three";
import * as d3 from "d3-force";

const generateSampleData = () => {
    const N = 300; // Number of nodes
    const clusters = 6; // Number of groups/clusters
    const nodes = [];
    const links = [];

    // Generate nodes with groups
    for (let i = 0; i < N; i++) {
        nodes.push({
            id: i,
            group: i % clusters, // Assign each node a group
            label: `Node ${i}`,
        });
    }

    // Generate links with logical structure
    for (let i = 1; i < N; i++) {
        links.push({
            source: i,
            target: Math.floor(Math.random() * i), // Random parent node from previous nodes
        });

        // Add additional inter-cluster links for a more connected graph
        if (i % clusters === 0) {
            const randomConnection = Math.floor(Math.random() * N);
            links.push({
                source: i,
                target: randomConnection !== i ? randomConnection : (i + 1) % N,
            });
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
                .nodeAutoColorBy("group")
                .linkColor(() => "#ffffff")
                .linkDirectionalParticles(1)
                .linkDirectionalParticleColor(() => "cyan")
                .linkDirectionalParticleWidth(3);

            // Call generateSampleData() to get the returned object with nodes and links
            const sampleData = generateSampleData();

            sampleData.nodes.forEach((node) => {
                node.z = Math.random() * 800 - 150;
            });

            Graph.graphData(sampleData);


            // Node appearance
            Graph.nodeThreeObject((node) => {
                const material = new THREE.MeshStandardMaterial({
                    color: node.color || node.group,
                    emissive: node.color || node.group,
                    emissiveIntensity: 0.5,
                });
                const size = node.id === "entry-point" ? 15 : 7;
                return new THREE.Mesh(new THREE.SphereGeometry(size, 32, 32), material);
            });

            // Link appearance
            Graph.linkThreeObjectExtend(true);
            Graph.linkThreeObject((link) => {
                const geometry = new THREE.BufferGeometry().setFromPoints([
                    new THREE.Vector3(link.source.x, link.source.y, link.source.z || 0),
                    new THREE.Vector3(link.target.x, link.target.y, link.target.z || 0),
                ]);

                return new THREE.Line(geometry, new THREE.LineBasicMaterial({ color: "#ffffff" }));
            });

            // Glow Effect
            const bloomPass = new UnrealBloomPass();
            bloomPass.strength = 2.5;
            bloomPass.radius = 1.0;
            bloomPass.threshold = 0.2;
            const composer = Graph.postProcessingComposer();
            composer.addPass(bloomPass);

            // Set initial camera position
            Graph.cameraPosition({ x: 200, y: 300, z: 1400 }, { x: 0, y: 0, z: 0 }, 0);

            // Force layout adjustments
            Graph.d3Force("charge", d3.forceManyBody().strength(-500));
            Graph.d3Force("link", d3.forceLink().distance(200).strength(1));

            // Handle node click
            Graph.onNodeClick((node) => {
                setSelectedNode(node.label);
                console.log("Node Clicked:", node);
            });

            // Handle node hover
            Graph.onNodeHover((node) => setHoveredNode(node ? node.label : null));

            // Cleanup
            return () => {
                if (Graph) {
                    Graph.pauseAnimation();
                    Graph._destructor && Graph._destructor();
                }
                composer.removePass(bloomPass);
            };
        }
    }, [backgroundColor, graphData]);

    return (
        <div style={{ position: "relative", width: "100%", height: "50vh" }}>
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