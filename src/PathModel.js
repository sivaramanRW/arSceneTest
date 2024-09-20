import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import './PathModel.css';
import { useState } from 'react';
import { findTurningPoints } from './TurningPoints';

const FloorMap = ({ path }) => {

  const modelCoordinates = {
    "BF": [0.1, 13],
    "BG": [-1, 13],
    "BH": [-2, 13],
    "BI": [-3, 13],
    "BJ": [-4, 13],
    "BK": [-5, 13],
    "B": [0.1, 11],
    "BA": [-1, 11],
    "BB": [-2, 11],
    "BC": [-3, 11],
    "BD": [-4, 11],
    "BE": [-5, 11],
    "BL": [-3.5, 12.35],
    "CA": [2, 11],
    "CH": [3.25, 11],
    "CB": [2, 13],
    "CC": [2, 9],
    "CD": [3.5, 9],
    "CE": [4.5, 9],
    "CF": [4.5, 11],
    "CG": [4.5, 13],
    "D": [0.1, 9.5],
    "DA": [-1.5, 9.5],
    "DB": [-3.5, 9.5],
    "DC": [-4.5, 9.5],
    "F": [0.1, 7.3],
    "G": [-2.5, 5.5],
    "H": [0.1, 5.3],
    "AC": [0.1, 4],
    "HA": [2, 5.3],
    "HH": [2, 7],
    "HD": [2, 4],
    "HE": [3.5, 4],
    "HF": [4.5, 4],
    "HB": [3.5, 5.3],
    "HC": [4.5, 5.3],
    "HG": [4.5, 7],
    "J": [0.1, 1.7],
    "JA": [2, 1.7],
    "JB": [3.3, 1.7],
    "JC": [4.5, 1.7],
    "L": [0.1, -1.5],
    "LA": [2, -1.5],
    "LB": [3.3, -1.5],
    "LC": [4.5, -1.5],
    "P": [0.1, -4.2],
    "PA": [2, -4.2],
    "PB": [3.3, -4.2],
    "PC": [4.5, -4.2],
    "R": [0.1, -7.5],
    "RA": [2, -7.5],
    "RB": [3.3, -7.5],
    "RC": [4.5, -7.5],
    "T": [0.1, -10.2],
    "TA": [2, -10.2],
    "TB": [3.3, -10.2],
    "TC": [4.5, -10.2],
    "W": [0.1, -12.7],
    "WA": [2, -12.7],
    "WB": [3.3, -12.7],
    "WC": [4.5, -12.7],
    "TD": [-1.6, -10.2],
    "TE": [-2.4, -10.2],
    "TF": [-3.3, -10.2],
    "TG": [-4.2, -10.2],
    "TH": [-5, -10.2],
    "TI": [-1.6, -12],
    "TJ": [-1.6, -13.1],
    "TK": [-2.4, -13.1],
    "TL": [-3.3, -13.1],
    "TM": [-4.2, -13.1],
    "TN": [-5, -13.1],
    "TO": [-3.5, -11.5],
    "RD": [-1.6, -7.5],
    "RE": [-2.5, -7.5],
    "RF": [-3.5, -7.5],
    "RG": [-4.5, -7.5],
    "RI": [-2.5, -8.5],
    "RH": [-4.5, -8.5],
    "RJ": [-2.5, -5],
    "RL": [-3.5, -6],
    "RK": [-4.5, -5],
    "AA": [0.1, 6.3],
    "AB": [0.1, 4.5],
    "AD": [0.1, 3],
    "AE": [0.1, 0],
    "AF": [0.1, -2.5],
    "N": [0.1, -3.3],
    "AH": [0.1, -8],
    "AI": [0.1, -9],
    "O": [-3, -3.3],
    "AG": [0.1, -6]
  };

  const labels = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));

  const transformCoordinates = (coords, labels) => {
    const transformed = {};
    coords.forEach((coord, index) => {
      transformed[labels[index]] = { x: coord[0], y: coord[1] };
    });
    return transformed;
  };

  const ModelPathTemp = [];
  const containerRef = useRef(null);
  const modelRef = useRef(null);
  const cubeRef = useRef(null);
  const [button, setButton] = useState(true);
  let userPos = modelCoordinates[path];
  const pathCoordinates = path.map(point => modelCoordinates[point]);
  const modelApla = transformCoordinates(pathCoordinates, labels);
  const InterKeys = findTurningPoints(modelApla);
  for (let i = 0; i < InterKeys.length; i++) {
    ModelPathTemp.push(modelApla[InterKeys[i]]);
  }
  const convertedCoordinates = ModelPathTemp.map(coord => [coord.x, coord.y]);

  useEffect(() => {

    setButton(false);

    const container = containerRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(120, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.set(convertedCoordinates[0][0], 0.15, convertedCoordinates[0][1]);

    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(0, 1, 1).normalize();
    scene.add(directionalLight);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.screenSpacePanning = false;
    controls.minDistance = 1;
    controls.maxDistance = 100;

    const firstPoint = new THREE.Vector3(convertedCoordinates[0][0], 0, convertedCoordinates[0][1])
    const nextPoint = new THREE.Vector3(convertedCoordinates[1][0], 0, convertedCoordinates[1][1])
   
    let distance = 0.1;
    let direction = [nextPoint.x - firstPoint.x, nextPoint.z - firstPoint.z];
    let magnitude = Math.sqrt(direction[0] ** 2 + direction[1] ** 2);
    let unitVector = [direction[0] / magnitude, direction[1] / magnitude];
    let movement = [unitVector[0] * distance, unitVector[1] * distance];
    let newPosition = [firstPoint.x + movement[0], firstPoint.z + movement[1]];
    controls.target.set(newPosition[0], 0, newPosition[1]);
    
    const loader = new GLTFLoader();
    loader.load('floor3d2.glb', function (gltf) {
      const model = gltf.scene;
      scene.add(model);
      modelRef.current = model;

      const geometry = new THREE.BoxGeometry();
      const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
      const cube = new THREE.Mesh(geometry, material);
      cube.scale.set(0.1, 0.1, 0.1);
      cube.position.set(convertedCoordinates[0][0], 0.6, convertedCoordinates[0][1]);
      model.add(cube);
      cubeRef.current = cube;
      
      for(let i = 0; i < convertedCoordinates.length; i++){
        let one = {x: convertedCoordinates[i][0], y : convertedCoordinates[i][1]};
        let two = {x: convertedCoordinates[i+1][0], y : convertedCoordinates[i+1][1]};
        createPathSegment(one,two);
      }

    }, undefined, function (error) {  
      console.error(error);
    });

    const createPathSegment = (start, end) => {
      createArrowPath([
          new THREE.Vector3(start.x, 0.5, start.y),
          new THREE.Vector3(end.x, 0.5, end.y)
      ]);
    }
  
    const createArrowPath = (points) => {
      const loader = new GLTFLoader();
      loader.load('carArrow.glb', (gltf) => {
          const arrowModel = gltf.scene;
  
          const distance = points[0].distanceTo(points[1]);
          const arrowSpacing = 0.5;
          const numArrows = Math.ceil(distance / arrowSpacing);
  
          for (let i = 0; i < numArrows; i++) {
              const t = i / (numArrows - 1);
              const position = new THREE.Vector3().lerpVectors(points[0], points[1], t);
              const arrow = arrowModel.clone();
              arrow.position.copy(position);
              arrow.scale.set(0.06, 0.06, 0.06);
  
              const direction = new THREE.Vector3().subVectors(points[1], points[0]).normalize();
              const quaternion = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 0, 1), direction);
              arrow.setRotationFromQuaternion(quaternion);
              arrow.rotateY(Math.PI);
              arrow.traverse((child) => {
                  if (child.isMesh) {
                      child.material.color.set(0xb83ff);
                  }
              });
              modelRef.current.add(arrow);
          }
      }, undefined, (error) => {
          console.error('An error happened', error);
      });
    }

    const animate = function () {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    const onWindowResize = () => {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener('resize', onWindowResize);

    return () => {
      window.removeEventListener('resize', onWindowResize);
      container.removeChild(renderer.domElement);
      renderer.dispose();
      controls.dispose();
    };

  }, []);

  return (
    <div className='path-map-containers' ref={containerRef}></div>
  );
};

export default FloorMap;