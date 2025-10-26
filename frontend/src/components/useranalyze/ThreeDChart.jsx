import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";

function ThreeDChart({
  fileData,
  xAxis,
  yAxis,
  selected3DChartType,
  canvasRef,
}) {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!fileData || !xAxis || !yAxis || selected3DChartType === "none") return;

    const container = mountRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0);

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 20, 30);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    if (canvasRef) canvasRef.current = renderer.domElement;
    container.appendChild(renderer.domElement);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    // Lights
    scene.add(new THREE.AmbientLight(0xffffff, 0.6));
    const dirLight = new THREE.DirectionalLight(0xffffff, 1);
    dirLight.position.set(10, 20, 10);
    dirLight.castShadow = true;
    scene.add(dirLight);

    // Helpers
    scene.add(new THREE.GridHelper(20, 20, 0x888888, 0xcccccc));
    scene.add(new THREE.AxesHelper(10));

    // Ground
    const plane = new THREE.Mesh(
      new THREE.PlaneGeometry(100, 100),
      new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.8 })
    );
    plane.rotation.x = -Math.PI / 2;
    plane.receiveShadow = true;
    scene.add(plane);

    // Data
    const values = fileData.data.map((r) => Number(r[yAxis]));
    const labels = fileData.data.map((r) => r[xAxis]);
    const maxVal = Math.max(...values);
    const barW = 1;
    const gap = 0.5;

    // Color gradient function
    const getColor = (val) => {
      const t = val / maxVal;
      return new THREE.Color().setHSL(0.6 * (1 - t), 0.7, 0.5);
    };

    // Font loader for labels
    // const loader = new FontLoader();
    // loader.load("./helvetiker_regular.typeface.json", (font) => {
    //   labels.forEach((label, idx) => {
    //     const textGeo = new TextGeometry(label, {
    //       font,
    //       size: 0.4,
    //       height: 0.05,
    //     });
    //     const textMat = new THREE.MeshBasicMaterial({ color: 0x333333 });
    //     const txt = new THREE.Mesh(textGeo, textMat);
    //     txt.position.set(
    //       idx * (barW + gap) - (labels.length * (barW + gap)) / 2,
    //       0,
    //       0.5
    //     );
    //     scene.add(txt);
    //   });
    // });

    // Chart types
    if (selected3DChartType === "bar3d") {
      values.forEach((val, i) => {
        const h = (val / maxVal) * 10;
        const geo = new THREE.BoxGeometry(barW, h, barW);
        const mat = new THREE.MeshStandardMaterial({
          color: getColor(val),
          metalness: 0.3,
          roughness: 0.6,
        });
        const mesh = new THREE.Mesh(geo, mat);
        mesh.castShadow = true;
        mesh.position.set(
          i * (barW + gap) - (values.length * (barW + gap)) / 2,
          h / 2,
          0
        );
        scene.add(mesh);
      });
    }
    else if (selected3DChartType === "line3d") {
      const points = values.map((val, i) => {
        const x = i * (barW + gap) - (values.length * (barW + gap)) / 2;
        const y = (val / maxVal) * 10;
        const z = 0;
        return new THREE.Vector3(x, y, z);
      });
    
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const material = new THREE.LineBasicMaterial({ color: 0x156289 });
      const line = new THREE.Line(geometry, material);
      scene.add(line);
    }
    else if (selected3DChartType === "scatter3d") {
      values.forEach((val, i) => {
        const x = i * (barW + gap) - (values.length * (barW + gap)) / 2;
        const y = (val / maxVal) * 10;
        const z = Math.random() * 5 - 2.5; // for slight Z variation
    
        const geometry = new THREE.SphereGeometry(0.2, 16, 16);
        const material = new THREE.MeshStandardMaterial({ color: getColor(val) });
        const sphere = new THREE.Mesh(geometry, material);
        sphere.position.set(x, y, z);
        scene.add(sphere);
      });
    }
    else if (selected3DChartType === "surface3d") {
      const size = Math.ceil(Math.sqrt(values.length));
      const geometry = new THREE.PlaneGeometry(10, 10, size - 1, size - 1);
    
      const positions = geometry.attributes.position.array;
      for (let i = 0; i < positions.length; i += 3) {
        const idx = Math.floor(i / 3);
        const val = values[idx] || 0;
        positions[i + 2] = (val / maxVal) * 5; // height in Z
      }
      geometry.computeVertexNormals();
    
      const material = new THREE.MeshStandardMaterial({
        color: 0x88ccee,
        side: THREE.DoubleSide,
        wireframe: true,
      });
    
      const surface = new THREE.Mesh(geometry, material);
      surface.rotation.x = -Math.PI / 2;
      surface.position.y = 0.1;
      scene.add(surface);
    }
            

    // Animate
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Cleanup
    return () => {
      renderer.dispose();
      container.removeChild(renderer.domElement);
    };
  }, [fileData, xAxis, yAxis, selected3DChartType]);

  return <div ref={mountRef} style={{ width: "100%", height: "400px" }} />;
}

export default ThreeDChart;
