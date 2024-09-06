import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import './MapModel.css';
import { FaTimes } from 'react-icons/fa';

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
    "CA": [2, 11],
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
    "G": [-2.5, 7.3],
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
    "RD": [-1.6, -7.5],
    "RE": [-2.5, -7.5],
    "RF": [-3.5, -7.5],
    "RG": [-4.5, -7.5],
    "RI": [-1.6, -8.5],
    "RH": [-4.5, -8.5],
    "RJ": [-1.6, -5],
    "RL": [-3.3, -5],
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

  const containerRef = useRef(null);
  const [modelVisible, setModelVisible] = useState(false);
  const userPos = modelCoordinates[path];

  useEffect(() => {
    if (!modelVisible) return;

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

    let model;
    const loader = new GLTFLoader();
    
    loader.load(
      'floor3d.glb',
      function (gltf) {
        model = gltf.scene;
        scene.add(model);

        loader.load(
          'youherered.glb',
          function (gltfMarker) {
            const markerModel = gltfMarker.scene;
            markerModel.scale.set(0.5, 0.5, 0.5);
            markerModel.position.set(userPos[0], 0.6, userPos[1]);
            model.add(markerModel);
          },
          undefined,
          function (error) {
            console.error(error);
          }
        );
      },
      undefined,
      function (error) {
        console.error(error);
      }
    );

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
  }, [path, userPos, modelVisible]);

  const toggleModel = () => {
    setModelVisible(!modelVisible);
  };

  return (
    <div className="floor-map-container">
      <div className="main-content" ref={containerRef} style={{ display: modelVisible ? 'block' : 'none' }}></div>
      {!modelVisible && <div className="text-message">Face your phone camera towards the floor and click start</div>}
      <button className="toggle-button" onClick={toggleModel}>
        {modelVisible ? <FaTimes /> : <img src="map.png" alt="mapicon" style={{ height: '20px', width: '20px' }} />}
      </button>
    </div>
  );
};

export default FloorMap;
