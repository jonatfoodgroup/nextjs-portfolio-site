"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars, Text } from "@react-three/drei";
import { useEffect, useState, useRef } from "react";
import * as THREE from "three";
import services from "../data/services";

// Node Component with Glow and Text
const Node = ({ position, id, isCentral }) => {
    const glow = useRef();
  
    // Pulsing glow animation
    useFrame(() => {
      if (glow.current) {
        const scale = 1 + Math.sin(Date.now() / 500) * 0.1; // Pulsing glow
        glow.current.scale.set(scale, scale, scale);
      }
    });
  
    return (
      <group position={position}>
        {/* Main Node */}
        <mesh>
          <sphereGeometry args={[isCentral ? 0.35 : 0.25, 32, 32]} />
          <meshStandardMaterial
            emissive={isCentral ? "#ff6347" : "#00bcd4"} // Highlight central node
            emissiveIntensity={0.8}
            color={isCentral ? "#8b0000" : "#004d40"}
          />
        </mesh>
        {/* Glow Effect */}
        <mesh ref={glow}>
          <sphereGeometry args={[isCentral ? 0.45 : 0.3, 32, 32]} />
          <meshBasicMaterial color="#00ffff" transparent opacity={0.4} />
        </mesh>
        {/* Text Label */}
        <Text
          position={[0, isCentral ? 0.6 : 0.4, 0]} // Position above the node
          fontSize={isCentral ? 0.3 : 0.2}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
        >
          {id}
        </Text>
      </group>
    );
  };

// Link Component
const Link = ({ source, target, highlight }) => {
  const lineColor = highlight ? "#ff9900" : "#00bcd4";

  return (
    <line>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={new Float32Array([...source, ...target])}
          count={2}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial color={lineColor} linewidth={highlight ? 2 : 1.5} />
    </line>
  );
};

// Sitemap Visualization Component
const SitemapVisualization = ({ data }) => {
  const [nodes, setNodes] = useState([]);
  const [links, setLinks] = useState([]);
  const [highlightedNode, setHighlightedNode] = useState(null);

  useEffect(() => {
    // Create Nodes with Balanced 3D Layout
    const parsedNodes = data.map((page, index) => {
        // Define sectors
        const sectors = {
          Home: { center: [0, 0, 0], radius: 3 },
          "What We Do": { center: [10, 0, 0], radius: 5 },
          "What We Think": { center: [-10, 0, 0], radius: 5 },
          "Who We Are": { center: [0, 10, 0], radius: 5 },
        };
      
        // Assign nodes to sectors
        const sector = sectors[page.id] || { center: [Math.random() * 20 - 10, Math.random() * 20 - 10, Math.random() * 5], radius: 4 };
      
        // Spread nodes dynamically within the sector
        const phi = Math.acos(-1 + (2 * index) / data.length); // Polar angle
        const theta = Math.sqrt(data.length * Math.PI) * phi; // Azimuthal angle
        const [centerX, centerY, centerZ] = sector.center;
      
        return {
          id: page.id,
          position: [
            centerX + sector.radius * Math.sin(phi) * Math.cos(theta), // X
            centerY + sector.radius * Math.sin(phi) * Math.sin(theta), // Y
            centerZ + sector.radius * Math.cos(phi), // Z
          ],
          isCentral: page.id === "Home", // Highlight central node
        };
      });

    // Create Links Between Nodes
    // Create Links Between Nodes
const parsedLinks = data.flatMap((page) =>
    page.links
      .map((link) => {
        const sourceNode = parsedNodes.find((n) => n.id === page.id);
        const targetNode = parsedNodes.find((n) => n.id === link);
        if (!sourceNode || !targetNode) {
          console.warn("Missing node for link:", { source: page.id, target: link });
          return null; // Skip invalid links
        }
        return { source: sourceNode.position, target: targetNode.position };
      })
      .filter(Boolean) // Remove null links
  );

    setNodes(parsedNodes);
    setLinks(parsedLinks);
  }, [data]);

  return (
    <Canvas style={{ height: "100vh", width: "100%", background: "#000" }}>
      {/* Ambient light for general illumination */}
      <ambientLight intensity={0.5} />
      {/* Point light for depth */}
      <pointLight position={[10, 10, 10]} />

      {/* Stars for background */}
      <Stars radius={50} depth={50} count={5000} factor={4} fade speed={1} />

      <group>
        {/* Render Nodes */}
        {nodes.map((node) => (
          <Node
            key={node.id}
            position={node.position}
            id={node.id}
            isCentral={node.isCentral}
            onHover={(id) => setHighlightedNode(id)}
            onBlur={() => setHighlightedNode(null)}
          />
        ))}
        {/* Render Links */}
        {links.map((link, index) => (
          <Link
            key={index}
            source={link.source}
            target={link.target}
            highlight={
              highlightedNode &&
              (nodes.find((n) => n.position === link.source)?.id === highlightedNode ||
                nodes.find((n) => n.position === link.target)?.id === highlightedNode)
            }
          />
        ))}
      </group>

      {/* Camera Controls with Auto-Rotate */}
      <OrbitControls autoRotate autoRotateSpeed={.1} enableZoom enablePan={false} />
    </Canvas>
  );
};

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

    // update what we do links to have the services
    sitemapData.find(page => page.id === "What We Do").links = services.map(service => service.title);

  return (
    <div
      className="masthead-container"
      style={{
        height: "100vh",
        width: "100%",
        overflow: "hidden",
        backgroundColor: "#000",
      }}
    >
      <SitemapVisualization data={sitemapData} />
    </div>
  );
}