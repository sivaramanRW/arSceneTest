import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import './MapModel.css';
import { FaTimes } from 'react-icons/fa';
import { graph, coordinates, dijkstra } from './graphData';

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

  const pointDetails = {
    "HB": [3.5, 5.3],
    "JB": [3.3, 1.7],
    "LB": [3.3, -1.5],
    "PB": [3.3, -4.2],
    "RB": [3.3, -7.5],
    "TB": [3.3, -10.2],
    "WB": [3.3, -12.7],
    "CH": [3.25, 11],
    "BL": [-3.5, 12.35],
    "RL": [-3.3, -6.5],
    "TO": [-3.5, -11.5],
    "G": [-2.5, 5.5],
    "DC": [-4.5, 9.5]
  };

  const containerRef = useRef(null);
  const modelRef = useRef(null);
  const ThreeDModelRed = useRef(null);
  const [modelVisible, setModelVisible] = useState(false);
  const userPos = modelCoordinates[path];
  const [selectedPoint, setSelectedPoint] = useState(null);

  useEffect(() => {
    if (!modelVisible) return;

    console.log('User position:', userPos);
    console.log(`Model name: ${path}, Coordinates: ${userPos}`);

    const container = containerRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      70,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(userPos[0], 5, userPos[1]);

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

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    let model;
    const loader = new GLTFLoader();
    loader.load(
      'floor3d.glb',
      (gltf) => {
        model = gltf.scene;
        scene.add(model);
        ThreeDModelRed.current = model;

        loader.load(
          'youherered.glb',
          (gltfMarker) => {
            const markerModel = gltfMarker.scene;
            markerModel.scale.set(0.5, 0.5, 0.5);
            markerModel.position.set(userPos[0], 0.6, userPos[1]);
            model.add(markerModel);
            modelRef.current = markerModel;

            const pointColors = {
              "HB": 0xff0000,
              "JB": 0x0000ff,
              "LB": 0x0000ff,
              "PB": 0x0000ff,
              "RB": 0x0000ff,
              "TB": 0x0000ff,
              "WB": 0x0000ff,
              "CA": 0xffff00,
              "BB": 0xff00ff,
              "RE": 0xffa500,
              "TD": 0X00ff00,
              "G": 0x00ffff,
              "DC": 0xB8860B
            };

            const points = Object.keys(pointColors);
            const clickableObjects = [];

            points.forEach((point) => {
              let boxGeometry;
              if (point === "HB") {
                boxGeometry = new THREE.BoxGeometry(4.5, 1, 4.3);
              } else if (point === "CA") {
                boxGeometry = new THREE.BoxGeometry(4.5, 0.5, 5.0);
              } else if (point === "G") {
                boxGeometry = new THREE.BoxGeometry(3.1, 0.5, 7.0);
              } else if (point === "TD") {
                boxGeometry = new THREE.BoxGeometry(4.7, 0.5, 4.5);
              } else if (point === "RE") {
                boxGeometry = new THREE.BoxGeometry(4.5, 0.5, 5.0);
              } else if (point === "BB") {
                boxGeometry = new THREE.BoxGeometry(4.9, 0.5, 4.4);
              } else if (point === "WB") {
                boxGeometry = new THREE.BoxGeometry(4.5, 0.7, 2.0);
              } else if (point === "DC") {
                boxGeometry = new THREE.BoxGeometry(1.5, 0.5, 7.0);
              } else {
                boxGeometry = new THREE.BoxGeometry(4.5, 0.5, 2.8);
              }

              const boxMaterial = new THREE.MeshBasicMaterial({
                color: pointColors[point],
                opacity: 0,
                transparent: true
              });

              const box = new THREE.Mesh(boxGeometry, boxMaterial);
              const [x, z] = modelCoordinates[point];
              box.position.set(x, 0.25, z);
              model.add(box);

              clickableObjects.push(box);
              box.userData = { point: point };
            });

            const onPointerClick = (event) => {
              const rect = renderer.domElement.getBoundingClientRect();
              mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
              mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

              raycaster.setFromCamera(mouse, camera);
              const intersects = raycaster.intersectObjects(clickableObjects);

              if (intersects.length > 0) {
                const clickedPoint = intersects[0].object.userData.point;
                const pointCoords = pointDetails[clickedPoint];
                console.log(`Clicked point: ${clickedPoint}, Coordinates: ${pointCoords}`);
                console.log(modelCoordinates[path]);
                
                const [shortestPath, distance] = dijkstra(graph, path, clickedPoint);
                console.log('Shortest path:', shortestPath);
                console.log('Total distance:', distance);

                for(let i = 0; i < shortestPath.length - 1; i++){
                  // console.log('kk', shortestPath[i]);
                  // console.log('jj',modelCoordinates[shortestPath[i]][0], modelCoordinates[shortestPath[i]][1] );
                  let one = {x: modelCoordinates[shortestPath[i]][0], y : modelCoordinates[shortestPath[i]][1] };
                  let two = {x:  modelCoordinates[shortestPath[i+1]][0], y : modelCoordinates[shortestPath[i+1]][1] };
                  createPathSegment(one,two);
                }
                //visualizeShortestPath(shortestPath);
              }
            };

            renderer.domElement.addEventListener('click', onPointerClick);
          },
          undefined,
          (error) => {
            console.error(error);
          }
        );
      },
      undefined,
      (error) => {
        console.error(error);
      }
    );

    // const visualizeShortestPath = (shortestPath) => {
    //   ThreeDModelRed.current.children.forEach((child) => {
    //     if (child.userData && child.userData.isPathSegment) {
    //       ThreeDModelRed.current.remove(child);
    //     }
    //   });

    //   for (let i = 0; i < shortestPath.length - 1; i++) {
    //     const start = coordinates[shortestPath[i]];
    //     const end = coordinates[shortestPath[i + 1]];
    //     createPathSegment(
    //       { x: start[0], y: start[1] },
    //       { x: end[0], y: end[1] }
    //     );
    //   }
    // };

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
          arrow.userData = { isPathSegment: true };
          ThreeDModelRed.current.add(arrow);
        }
      }, undefined, (error) => {
        console.error('An error happened', error);
      });
    }

    const animate = () => {
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
  }, [path, userPos, modelVisible]);

  const toggleModel = () => {
    setModelVisible(!modelVisible);
  };

  return (
    <div className="floor-map-container">
      <div className="main-content" ref={containerRef} style={{ display: modelVisible ? 'block' : 'none' }}></div>
      {!modelVisible && (
        <div className="text-message">
          Face your phone camera towards the floor and click start.
        </div>
      )}
      <button className="toggle-button" onClick={toggleModel}>
        {modelVisible ? <FaTimes /> : <img src="map.png" alt="mapicon" style={{ height: "20px", width: "20px" }} />}
      </button>
    </div>
  );
};

export default FloorMap;