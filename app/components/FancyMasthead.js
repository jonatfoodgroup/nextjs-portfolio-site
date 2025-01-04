"use client";
import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import services from "../data/services";
import articles from "../data/articles";
// Define a color mapping for parent categories
// const colorMapping = {
//     Home: "#ff6347",
//     "What We Do": "#00bcd4",
//     "What We Think": "#8b0000",
//     "Who We Are": "#4caf50",
//     default: "#888888", // Default color if no parent is matched
// };

// // Node Component with Glow and Text
// const Node = ({ position, id, isCentral, onHover, onBlur, isHighlighted }) => {
//     const glow = useRef();

//     // Pulsing glow animation
//     useFrame(() => {
//         if (glow.current) {
//             const scale = 1 + Math.sin(Date.now() / 500) * 0.1; // Pulsing glow
//             glow.current.scale.set(scale, scale, scale);
//         }
//     });

//     return (
//         <group position={position}>
//             {/* Main Node */}
//             <mesh
//                 onPointerOver={() => onHover(id)}
//                 onPointerOut={onBlur}
//             >
//                 <sphereGeometry args={[isCentral ? 0.35 : 0.25, 32, 32]} />
//                 <meshStandardMaterial
//                     emissive={isHighlighted ? "#ff9900" : isCentral ? "#ff6347" : "#00bcd4"}
//                     emissiveIntensity={isHighlighted ? 1.2 : 0.8}
//                     color={isCentral ? "#8b0000" : "#004d40"}
//                 />
//             </mesh>
//             {/* Glow Effect */}
//             <mesh ref={glow}>
//                 <sphereGeometry args={[isCentral ? 0.45 : 0.3, 32, 32]} />
//                 <meshBasicMaterial
//                     color={isHighlighted ? "#ffcc00" : "#00ffff"}
//                     transparent
//                     opacity={0.4}
//                 />
//             </mesh>
//             {/* Text Label */}
//             <Text
//                 position={[0, isCentral ? 0.6 : 0.4, 0]} // Position above the node
//                 fontSize={isCentral ? 0.3 : 0.2}
//                 color="#ffffff"
//                 anchorX="center"
//                 anchorY="middle"
//             >
//                 {id}
//             </Text>
//         </group>
//     );
// };

// // Link Component
// const Link = ({ source, target, isConnected }) => {
//     const lineColor = isConnected ? "#ff9900" : "#00bcd4";

//     return (
//         <line>
//             <bufferGeometry>
//                 <bufferAttribute
//                     attach="attributes-position"
//                     array={new Float32Array([...source, ...target])}
//                     count={2}
//                     itemSize={3}
//                 />
//             </bufferGeometry>
//             <lineBasicMaterial color={lineColor} linewidth={isConnected ? 2 : 1.5} />
//         </line>
//     );
// };

// // Sitemap Visualization Component
// const SitemapVisualization = ({ data }) => {
//     const [nodes, setNodes] = useState([]);
//     const [links, setLinks] = useState([]);
//     const [hoveredNode, setHoveredNode] = useState(null);

//     useEffect(() => {
//         // Create Nodes with Balanced 3D Layout
//         const parsedNodes = data.map((page, index) => {
//             // Define sectors
//             const sectors = {
//                 Home: { center: [-2, 0, -3], radius: 5 },
//                 "What We Do": { center: [10, 0, 0], radius: 5 },
//                 "What We Think": { center: [-10, 0, 0], radius: 5 },
//                 "Who We Are": { center: [0, 10, 0], radius: 5 },
//             };

//             const sector = sectors[page.id] || { center: [Math.random() * 20 - 10, Math.random() * 20 - 10, Math.random() * 5], radius: 4 };

//             const phi = Math.acos(-1 + (2 * index) / data.length); // Polar angle
//             const theta = Math.sqrt(data.length * Math.PI) * phi; // Azimuthal angle
//             const [centerX, centerY, centerZ] = sector.center;

//             return {
//                 id: page.id,
//                 position: [
//                     centerX + sector.radius * Math.sin(phi) * Math.cos(theta), // X
//                     centerY + sector.radius * Math.sin(phi) * Math.sin(theta), // Y
//                     centerZ + sector.radius * Math.cos(phi), // Z
//                 ],
//                 isCentral: page.id === "Home", // Highlight central node
//             };
//         });

//         // Create Links Between Nodes
//         const parsedLinks = data.flatMap((page) =>
//             page.links
//                 .map((link) => {
//                     const sourceNode = parsedNodes.find((n) => n.id === page.id);
//                     const targetNode = parsedNodes.find((n) => n.id === link);
//                     if (!sourceNode || !targetNode) return null; // Skip invalid links
//                     return { source: sourceNode.position, target: targetNode.position, sourceId: page.id, targetId: link };
//                 })
//                 .filter(Boolean)
//         );

//         setNodes(parsedNodes);
//         setLinks(parsedLinks);
//     }, [data]);

//     const handleHover = (id) => {
//         setHoveredNode(id);
//     };

//     const handleBlur = () => {
//         setHoveredNode(null);
//     };

//     return (
//         <Canvas style={{ height: "80vh", width: "100%", background: "#000" }}>
//             <ambientLight intensity={0.5} />
//             <pointLight position={[10, 10, 10]} />
//             <Stars radius={50} depth={50} count={5000} factor={4} fade speed={1} />

//             <group>
//                 {/* Render Nodes */}
//                 {nodes.map((node) => (
//                     <Node
//                         key={node.id}
//                         position={node.position}
//                         id={node.id}
//                         isCentral={node.isCentral}
//                         onHover={handleHover}
//                         onBlur={handleBlur}
//                         isHighlighted={
//                             hoveredNode === node.id ||
//                             links.some((link) => link.sourceId === hoveredNode || link.targetId === hoveredNode)
//                         }
//                     />
//                 ))}
//                 {/* Render Links */}
//                 {links.map((link, index) => (
//                     <Link
//                         key={index}
//                         source={link.source}
//                         target={link.target}
//                         isConnected={hoveredNode === link.sourceId || hoveredNode === link.targetId}
//                     />
//                 ))}
//             </group>

//             <OrbitControls autoRotate autoRotateSpeed={0.05} enableZoom enablePan={false} />
//         </Canvas>
//     );
// };

export default function FancyMasthead() {
    let sitemapData = [
        { id: "Home", links: ["What We Do", "What We Think", "Who We Are"] },
        { id: "What We Do", links: [] },
        { id: "What We Think", links: ["Service1", "Service2"] },
        { id: "Who We Are", links: ["Post1", "Post2"] },
    ];

    //   add services to sitemapData
    services.forEach(service => {
        sitemapData.push({ id: service.title, links: [] });
    });

    //   add articles to sitemapData
    articles.forEach(article => {
        sitemapData.push({ id: article.title, links: [] });
    });

    // update what we do links to have the services
    sitemapData.find(page => page.id === "What We Do").links = services.map(service => service.title);

    // update what we think links to have the articles
    sitemapData.find(page => page.id === "What We Think").links = articles.map(article => article.title);

    // add links to AI Strategy & Implementation in What We Do to the articles
    sitemapData.find(page => page.id === "AI Strategy & Implementation").links = articles.map(article => article.title);


    return (
        <div
            className="masthead-container"
            style={{
                height: "80vh",
                width: "100%",
                overflow: "hidden",
                backgroundColor: "#000",
            }}
        >
            {/* <TestComponent /> */}
            <div className="bg-overlay" style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(0, 0, 0, 0)" }}>
            </div>
        </div>
    );
}

const TestComponent = () =>  {
    const containerRef = useRef(null);
    
    useEffect(() => {
        // Define sitemap data
        const sitemapData = [
            { id: "Home", links: ["What We Do", "What We Think", "Who We Are"] },
            { id: "What We Do", links: ["AI Strategy & Implementation", "Cloud Services"] },
            { id: "What We Think", links: ["Article1", "Article2"] },
            { id: "Who We Are", links: ["About Us", "Contact"] },
            { id: "AI Strategy & Implementation", links: ["Article1"] },
        ];

        // Initialize Three.js
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        containerRef.current.appendChild(renderer.domElement);

        camera.position.z = 25;

        // Add Lights
        const ambientLight = new THREE.AmbientLight(0x404040, 2);
        scene.add(ambientLight);

        const pointLight = new THREE.PointLight(0xffffff, 1);
        pointLight.position.set(10, 10, 10);
        scene.add(pointLight);

        // Helper: Generate Random Positions
        const getRandomPosition = () => [
            Math.random() * 30 - 15,
            Math.random() * 30 - 15,
            Math.random() * 10 - 5,
        ];

        // Node and Link Storage
        const nodes = [];
        const links = [];
        const nodeMap = new Map();

        // Define Sectors for Layout
        const sectors = {
            Home: { center: [0, 0, 0], radius: 10 },
            "What We Do": { center: [10, 10, 0], radius: 7 },
            "What We Think": { center: [-10, -10, 0], radius: 7 },
            "Who We Are": { center: [0, 15, 0], radius: 7 },
        };

        // Create Nodes
        sitemapData.forEach((page) => {
            const sector = sectors[page.id] || { center: getRandomPosition(), radius: 5 };
            const position = [
                sector.center[0] + Math.random() * sector.radius - sector.radius / 2,
                sector.center[1] + Math.random() * sector.radius - sector.radius / 2,
                sector.center[2] + Math.random() * sector.radius - sector.radius / 2,
            ];

            const geometry = new THREE.SphereGeometry(page.id === "Home" ? 1 : 0.5, 16, 16);
            const material = new THREE.MeshStandardMaterial({
                color: page.id === "Home" ? 0xff6347 : 0x00bcd4,
            });
            const sphere = new THREE.Mesh(geometry, material);

            sphere.position.set(...position);
            sphere.userData = { id: page.id };
            scene.add(sphere);

            nodes.push({ id: page.id, object: sphere });
            nodeMap.set(page.id, sphere);
        });

        // Create Links
        sitemapData.forEach((page) => {
            const sourceNode = nodeMap.get(page.id);
            if (!sourceNode) return;

            page.links.forEach((linkId) => {
                const targetNode = nodeMap.get(linkId);
                if (!targetNode) return;

                const geometry = new THREE.BufferGeometry().setFromPoints([
                    sourceNode.position,
                    targetNode.position,
                ]);
                const material = new THREE.LineBasicMaterial({ color: 0xffffff });
                const line = new THREE.Line(geometry, material);

                scene.add(line);
                links.push(line);
            });
        });

        // Animation Loop
        const animate = () => {
            renderer.render(scene, camera);
            requestAnimationFrame(animate);
        };
        animate();

        // Handle Window Resize
        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };
        window.addEventListener("resize", handleResize);

        // Cleanup
        return () => {
            window.removeEventListener("resize", handleResize);
            containerRef.current.removeChild(renderer.domElement);
            renderer.dispose();
        };
    }, []);

    return (
        <div
            ref={containerRef}
            style={{
                height: "100vh",
                width: "100%",
                overflow: "hidden",
                position: "relative",
                backgroundColor: "#000",
            }}
        />
    );
}