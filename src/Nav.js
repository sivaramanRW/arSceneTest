import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { FaTimes, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import './Nav.css';
import { graph, coordinates, dijkstra } from './graphData.js';
import { transformCoordinatesPath } from './coordiantesTransform.js';
import { findTurningPoints } from './TurningPoints.js';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { CoordinatesChange } from './CoordinatesChange.js';
import { useLocation } from 'react-router-dom';
import './Nav.css';
import MapModel from './MapModel.js'; 
import PathModel from './PathModel.js'; 
import PositionModel from './PositionModel.js';

let selectedContent = {};
let modelPath = [];
let count = 0;

const Nav = () => {

    const location = useLocation();
    const { userLocDetected, userPosDetected} = location.state || {};
    const mountRef = useRef(null);
    const sceneRef = useRef(null);
    const modelRef = useRef(null);
    const cameraRef = useRef(null);
    const [activeButton, setActiveButton] = useState('All');
    const [showContainer, setShowContainer] = useState(false);
    const [floor, setFloor] = useState(true);
    const [goDisBut, setDis] = useState(false);
    const [messageBack, setMessage] = useState('');
    const [arStarted, setArStarted] = useState(false);
    const [distance, setDistance] = useState(0);
    const [userPosition, setUserPosition] = useState({ x: 0, y: 0, z: 0 });
    const [foundPathPoints, setFoundPathPoints] = useState([]);
    const [visiblePathPoints, setVisiblePathPoints] = useState([]);
    const [currentSegmentIndex, setCurrentSegmentIndex] = useState(0);
    const labels = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));
    const [destinationReached, setDestinationReached] = useState(false);
    const [showDistance, setShowDistance] = useState(false);
    const [showBottomSection, setShowBottomSection] = useState(true);
    const [turnDirection, setTurnDirection] = useState('');
    const [announcedDirection, setAnnouncedDirection] = useState(null);
    const [navigationStarted, setNavigationStarted] = useState(false);
    const [heading, setHeading] = useState(80);
    const [headingStored, setHeadingStored] = useState(false);
    const [offset, setOffset] = useState(0);
    const [mapView, setmapView] = useState(false);
    const [rotatedPoints, setRotatedPoints] = useState([]);
    const [originalPoints, setOriginalPoints] = useState({});
    const [isRotated, setIsRotated] = useState(false);
    const [showScanInstructions, setShowScanInstructions] = useState(false);
    const [PositionModelShow, setPositionModelShow] = useState(false);
    const [totalRotationAngle, setTotalRotationAngle] = useState(0);
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    const isAndroid = () => /Android/i.test(navigator.userAgent);
    let firstAdjust = useRef(null);
    let secondAdjust = useRef(null);
    let [Finalpoints, setFinalPoints] = useState(0);
    const angle = (2 * Math.PI) / 180;
    const [headingAdjust, setHeadingAdjust] = useState(0);

  const speakTurnDirection = (direction) => {
    if ('speechSynthesis' in window && navigationStarted) {
      const utterance = new SpeechSynthesisUtterance();
      switch(direction) {
        case 'left':
          utterance.text = "Turn left";
          break;
        case 'right':
          utterance.text = "Turn right";
          break;
        case 'straight':
          utterance.text = "Go straight";
          break;
        case 'U turn':
          utterance.text = "Make a U-turn";
          break;
        default:
          utterance.text = "Recalculating route";
      }
      utterance.volume = 1;
      utterance.rate = 1;
      utterance.pitch = 1;
      speechSynthesis.speak(utterance);
    }
  };
  
  const addLabel = (text, x, y, z) => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = 300;
    canvas.height = 64;
    context.fillStyle = 'rgba(255, 255, 255, 0.8)';
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.font = 'bold 28px Arial';
    context.fillStyle = 'black';
    context.textAlign = 'center';
    context.fillText(text, canvas.width / 2, 40);

    const texture = new THREE.CanvasTexture(canvas);
    const planeGeometry = new THREE.PlaneGeometry(1.5, 0.75);
    const planeMaterial = new THREE.MeshBasicMaterial({ map: texture, transparent: true });
    const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
   
    planeMesh.position.set(x, y + -0.5, z);
    planeMesh.lookAt(cameraRef.current.position);

    sceneRef.current.add(planeMesh);
    return planeMesh;
  };

  const checkXRSupport = async () => {
    if ('xr' in navigator) {
      try {
        return await navigator.xr.isSessionSupported('immersive-ar');
      } catch (e) {
        console.error('Error checking XR support:', e);
        return false;
      }
    }
    console.error('XR not available in navigator');
    return false;
  };

  const startAR = async () => {
    const supported = await checkXRSupport();
    if (!supported) {
      console.error('WebXR AR is not supported in this browser.');
      alert('WebXR AR is not supported in this browser.');
      return;
    }
    try {
      const session = await navigator.xr.requestSession('immersive-ar', {
        requiredFeatures: ['local-floor'],
        optionalFeatures: ['dom-overlay'],
        domOverlay: { root: document.body}
      });
      console.log('session :', session);
      initializeARScene(session);
      GetHeading();
    } catch (e) {
      console.error('Error starting AR session:', e);
      alert('Failed to start AR',e);
    }
  };

  const initializeARScene = (session) => {

    console.log('loc',userLocDetected);
    console.log('pos',userPosDetected);

    const scene = new THREE.Scene();
    sceneRef.current = scene;
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    cameraRef.current = camera;
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(0, 1, 1).normalize();
    scene.add(directionalLight);
 
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.xr.enabled = true;
    mountRef.current = renderer;
    renderer.xr.setSession(session);

    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

    const setReferenceSpace = async () => {
      try {
        await session.requestReferenceSpace('local-floor');
        renderer.xr.setReferenceSpaceType('local-floor');
      } catch (e) {
        console.error('Error setting reference space:', e);
      }
    };

    renderer.xr.addEventListener('sessionstart', () => {
      setArStarted(true);
      setShowContainer(true);
    });
    
    renderer.xr.addEventListener('sessionend', () => {
      setArStarted(false);
      setShowContainer(false);
    });

    const animate = () => {
      renderer.setAnimationLoop((timestamp, frame) => {
          if (frame) {
              const viewerPose = frame.getViewerPose(renderer.xr.getReferenceSpace());
              if (viewerPose) {
                  const position = viewerPose.transform.position;
                  setUserPosition({ x: position.x, y: position.y, z: position.z });
              }
          }
          renderer.render(scene, camera);

          if (modelRef.current) {
              modelRef.current.rotation.y += 0.01;
          }
      });
    };
    
    animate();
    setReferenceSpace();
    
    const positionInterval = setInterval(() => {
      if (renderer.xr.isPresenting) {
          const pose = renderer.xr.getCamera(camera).getWorldPosition(new THREE.Vector3());
          setUserPosition({ x: pose.x, y: pose.y, z: pose.z });
      }
    }, 100);
    
    return () => {
      clearInterval(positionInterval);
    };
  }

  const sections = [
    //{ id: 1, image: "anant.jpeg", content: "Anant Cabin", name: "AnantCabin", category: "Executive", path : 'Proceed to 4th floor', room  : 'same'},
    //{ id: 2, image: "ashish.jpeg", content: "Ashish Cabin", name: "AshishCabin", category: "Executive", path : 'Proceed to 4th floor',room  : 'same' },
    { id: 3, image: "chan.jpeg", content: "Chan Cabin", name: "ChanCabin", category: "Executive", path : "HB", room : ['HA', 'HB', 'HC', 'HD', 'HE', 'HF', 'HG', 'HH']},
    //{ id: 4, image: "prabhu.jpeg", content: "Prabhu Cabin", name: "PrabhuCabin", category: "Executive", path : 'IDK his cabin', room  : 'same'},
    { id: 5, image: "designer.jpeg", content: "Designers Room", name: "DesignersRoom", category: "Department", path : "BA", room : ['BA', 'BB', 'BC', 'BD', 'BE', 'BF', 'BG', 'BH', 'BI', 'BJ', 'BK']},
    { id: 6, image: "developers.jpeg", content: "Developers Room", name: "DevelopersRoom", category: "Department", path : "L", room : ['JA', 'JB', 'JC', 'J0', 'AE', 'L', 'LA', 'LB', 'LC', 'AF', 'N', 'P', 'PA', 'PB', 'PC', 'AG', 'R', 'RA', 'RB', 'RC', 'AH', 'AI', 'T', 'TA', 'TB', 'TC', 'W', 'WA', 'WB', 'WC']},
    { id: 7, image: "developers.jpeg", content: "Marketers Room", name: "MarketersRoom", category: "Department", path : "CA", room : ['CA', 'CB', 'CC', 'CD', 'CE', 'CF', 'CG']},
    { id: 8, image: "conference.jpeg", content: "Conference", name: "Conference", category: "Common Areas", path : "TE", room : ['TD', 'TE', 'TF', 'TG', 'TH', 'TI', 'TJ', 'TK', 'TL', 'TM', 'TN']},
    { id: 9, image: "server.jpeg", content: "Server Room", name: "ServerRoom", category: "Common Areas", path : "O", room : ['O'] },
    //{ id: 10, image: "cafe.jpeg", content: "Cafeteria", name: "Cafeteria", category: "Common Areas", path : 'Proceed to 5th floor', room  : 'same' },
    { id: 11, image: "meeting.jpeg", content: "Sales and Marketing Room", name: "MeetingRoom", category: "Common Areas", path : 'RF', room : ['RD', 'RE', 'RF', 'RG', 'RH', 'RI', 'RJ', 'RL', 'RK']},
    { id: 12, image: "restroom.jpeg", content: "Rest Room", name: "RestRoom", category: "Common Areas", path : "DC", room : ['DA' ,'DB', 'DC']},
    { id: 13, image: "server.jpeg", content: "PC Room", name: "PCRoom", category: "Common Areas", path : "G", room : ['G']},
  ];
  
  const filteredSections = activeButton === 'All' ? sections : sections.filter(section => section.category === activeButton);
  const groupedSections = [];
  for (let i = 0; i < filteredSections.length; i += 3) {
    groupedSections.push(filteredSections.slice(i, i + 3));
  }
  
  const handleCloseClickTwo = () => {
    setFloor(true);
    setShowContainer(true);
    setDis(false);
    setShowDistance(false);

    while (sceneRef.current.children.length > 0) {
      sceneRef.current.remove(sceneRef.current.children[0]);
    }

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    sceneRef.current.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(0, 1, 1).normalize();
    sceneRef.current.add(directionalLight);
  };

  const transformCoordinates = (coords, labels) => {
    const transformed = {};
    coords.forEach((coord, index) => {
      transformed[labels[index]] = { x: coord[0], y: coord[1] };
    });
    return transformed;
  };

  const handleSectionClick = async (contents) => {
    console.log('selectedContent', contents);
    setShowContainer(false);
    selectedContent = contents;
    setShowDistance(false);
  
    console.log('start', userLocDetected);
    console.log('end', selectedContent.path);
  
    const rooms = selectedContent.room;
    console.log('userPosDetected', userPosDetected);
  
    if (selectedContent.path.length === 1 || selectedContent.path.length === 2) {
      if (rooms.includes(userLocDetected)) {
        console.log(selectedContent.path);
        setFloor(false);
        setMessage('You are at ' + selectedContent.content);
      } else {
        const [foundPath, totalDistance] = dijkstra(graph, userLocDetected, selectedContent.path);
        console.log('Found Path', foundPath);
        console.log('Distance', totalDistance);
        modelPath = foundPath;
        const foundPathPointsTemp = foundPath.map(point => coordinates[point]);
        console.log('Path points', foundPathPointsTemp);
        const transformed = transformCoordinates(foundPathPointsTemp, labels);
        console.log('Alphabet assigned', transformed);
        
        const keys = Object.keys(transformed);
        const lastKey = keys[keys.length - 1];
        
        const transmatrix = transformCoordinatesPath(transformed, 'A', lastKey);
        console.log('Transformed', transmatrix.transformedPoints);
  
        const InterKeys = findTurningPoints(transmatrix.transformedPoints);
        const pointsInterKeys = []
        for (var i = 0; i < InterKeys.length; i++) {
          pointsInterKeys.push(transmatrix.transformedPoints[InterKeys[i]]);
        }
  
        const degree = heading.toFixed(0);
        const degreebasedPoints = CoordinatesChange(pointsInterKeys, degree);
        console.log('degreebasedPoints', degreebasedPoints)
  
        const convertedObject = labels.slice(0, degreebasedPoints.length).reduce((acc, label, index) => {
          acc[label] = { x: degreebasedPoints[index][0], y: degreebasedPoints[index][1] };
          return acc;
        }, {});
  
        console.log('converted', convertedObject);
  
        setFoundPathPoints(convertedObject);
        setOriginalPoints(convertedObject);
        setDistance(totalDistance);
        setDis(true);
        const result = Object.values(convertedObject).map(({ x, y }) => [x, y]);
        setFinalPoints(result);
        adjustmentPath(convertedObject);
  
        if (keys.length >= 3) {
          const prevPoint = convertedObject[keys[0]];
          const currentPoint = convertedObject[keys[1]];
          const nextPoint = convertedObject[keys[2]];
          const initialDirection = calculateTurnDirection(prevPoint, currentPoint, nextPoint);
          setTurnDirection(initialDirection);
          speakTurnDirection(initialDirection);
          setAnnouncedDirection(initialDirection);
        }
      }
    } else {
      setFloor(false);
      setMessage(selectedContent.path);
    }
    setmapView(true);
  };

  const adjustmentPath = (points) => {
    
    const geometry = new THREE.SphereGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0xb83ff });

    const firstPoint = new THREE.Mesh(geometry, material);
    firstPoint.scale.set(0.3, 0.3, 0.3);
    firstPoint.position.set(points['A'].x, -2, points['A'].y);
    sceneRef.current.add(firstPoint);
    const secondPoint = new THREE.Mesh(geometry, material);
    secondPoint.scale.set(0.3, 0.3, 0.3);
    secondPoint.position.set(points['B'].x, -2, points['B'].y);
    sceneRef.current.add(secondPoint);

    firstAdjust.current = firstPoint;
    secondAdjust.current = secondPoint;

    createPathSegment(points['A'], points['B']);
  }

  const rotatePoint = (point, center, theta) => {
    const [x, y] = point;
    const [cx, cy] = center;
    const newX = Math.cos(theta) * (x - cx) - Math.sin(theta) * (y - cy) + cx;
    const newY = Math.sin(theta) * (x - cx) + Math.cos(theta) * (y - cy) + cy;
    return [newX, newY];
  };
  
  const rotate = (direction) => {
    while (sceneRef.current.children.length > 0) {
      sceneRef.current.remove(sceneRef.current.children[0]);
    }
  
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    sceneRef.current.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(0, 1, 1).normalize();
    sceneRef.current.add(directionalLight);
  
    const center = Finalpoints[0]; 
    const theta = direction === 'left' ? angle : -angle;
    
    setTotalRotationAngle(prevAngle => {
      const newAngle = prevAngle + (direction === 'left' ? angle : -angle);
      console.log('Total rotation angle:', newAngle * (180 / Math.PI), 'degrees');
      return newAngle;
    });


    const newPoints = Finalpoints.map((point, index) => {
      return index === 0 ? point : rotatePoint(point, center, theta);
    });
  
    setFinalPoints(newPoints);
    
    const rotatedPoints = labels.slice(0, newPoints.length).reduce((acc, label, index) => {
      acc[label] = { x: newPoints[index][0], y: newPoints[index][1] };
      return acc;
    }, {});
    
    setFoundPathPoints(rotatedPoints);
    setRotatedPoints(rotatedPoints);
    setIsRotated(true);
  
    const firstPoint = {x: newPoints[0][0], y: newPoints[0][1]};
    const secondPoint = {x: newPoints[1][0], y: newPoints[1][1]};
    
    if (secondAdjust.current) {
      secondAdjust.current.position.set(secondPoint.x, -2, secondPoint.y);
    }
    
    createPathSegment(firstPoint, secondPoint);
  
    const keys = findTurningPoints(rotatedPoints);
    if (currentSegmentIndex < keys.length - 2) {
      const prevPoint = rotatedPoints[keys[currentSegmentIndex]];
      const currentPoint = rotatedPoints[keys[currentSegmentIndex + 1]];
      const nextPoint = rotatedPoints[keys[currentSegmentIndex + 2]];
      
      const newTurnDirection = calculateTurnDirection(prevPoint, currentPoint, nextPoint);
      setTurnDirection(newTurnDirection);
      if (newTurnDirection !== announcedDirection) {
        speakTurnDirection(newTurnDirection);
        setAnnouncedDirection(newTurnDirection);
      }
    }
  };

  const handleGo = () => {
    console.log('FP', foundPathPoints);
    const keys = findTurningPoints(foundPathPoints);
    console.log('interkeys', keys);

    setVisiblePathPoints([foundPathPoints[keys[0]], foundPathPoints[keys[1]]]);
    setCurrentSegmentIndex(0);

    while (sceneRef.current.children.length > 0) {
        sceneRef.current.remove(sceneRef.current.children[0]);
    }

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    sceneRef.current.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(0, 1, 1).normalize();
    sceneRef.current.add(directionalLight);

    createPathSegment(foundPathPoints[keys[0]], foundPathPoints[keys[1]]);
   
    setShowDistance(true);
    setShowContainer(false);
    setShowBottomSection(false);
    setNavigationStarted(true);
  }

  const createPathSegment = (start, end) => {
    
    const geometry = new THREE.SphereGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0xb83ff });

    const sphere1 = new THREE.Mesh(geometry, material);
    sphere1.scale.set(0.3, 0.3, 0.3);
    sphere1.position.set(start.x, -2, start.y);
    sceneRef.current.add(sphere1);

    const sphere2 = new THREE.Mesh(geometry, material);
    sphere2.scale.set(0.3, 0.3, 0.3);
    sphere2.position.set(end.x, -2, end.y);
    sceneRef.current.add(sphere2);

    createArrowPath([
        new THREE.Vector3(start.x, -2, start.y),
        new THREE.Vector3(end.x, -2, end.y)
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
            arrow.scale.set(0.1, 0.1, 0.1);

            const direction = new THREE.Vector3().subVectors(points[1], points[0]).normalize();
            const quaternion = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 0, 1), direction);
            arrow.setRotationFromQuaternion(quaternion);
            arrow.rotateY(Math.PI);
            arrow.traverse((child) => {
                if (child.isMesh) {
                    child.material.color.set(0xb83ff);
                }
            });
            sceneRef.current.add(arrow);
        }
    }, undefined, (error) => {
        console.error('An error happened', error);
    });
  }

  const calculateTurnDirection = (prev, current, next) => {
    if (prev.x === current.x && current.x === next.x) {
      return (next.y > prev.y) ? 'U turn' : 'straight';
    }
    if (prev.y === current.y && current.y === next.y) {
      return (next.x > prev.x) ? 'U turn' : 'straight';
    }

    const dx1 = current.x - prev.x;
    const dy1 = current.y - prev.y;
    const dx2 = next.x - current.x;
    const dy2 = next.y - current.y;

    const crossProduct = dx1 * dy2 - dy1 * dx2;

    if (crossProduct > 0) {
      return 'right';
    } else if (crossProduct < 0) {
      return 'left';
    } else {
      return 'straight';
    }
  };

  useEffect(() => {
    if (sceneRef.current && cameraRef.current && navigationStarted) {
      const positionUpdateInterval = setInterval(() => {
        const pose = new THREE.Vector3();
        cameraRef.current.getWorldPosition(pose);
        setUserPosition({ x: pose.x, y: pose.y, z: pose.z });
        
        const points = isRotated ? rotatedPoints : originalPoints;
        const keys = findTurningPoints(points);
        if (currentSegmentIndex < keys.length - 1) {
          const prevPoint = points[keys[Math.max(0, currentSegmentIndex - 1)]];
          const currentPoint = points[keys[currentSegmentIndex]];
          const nextPoint = points[keys[currentSegmentIndex + 1]];
          
          const distance = Math.sqrt(
            Math.pow(pose.x - nextPoint.x, 2) +
            Math.pow(pose.z - nextPoint.y, 2)
          );
          
          setDistance(distance);
          
          const newTurnDirection = calculateTurnDirection(prevPoint, currentPoint, nextPoint);
          if (newTurnDirection !== turnDirection) {
            setTurnDirection(newTurnDirection);
            if (newTurnDirection !== announcedDirection) {
              speakTurnDirection(newTurnDirection);
              setAnnouncedDirection(newTurnDirection);
            }
          }
          
          if (distance < 1) {
            setCurrentSegmentIndex(currentSegmentIndex + 1);
            setAnnouncedDirection(null);
            if (currentSegmentIndex + 2 < keys.length) {
              const newVisiblePoints = [...visiblePathPoints, points[keys[currentSegmentIndex + 2]]];
              setVisiblePathPoints(newVisiblePoints);
              createPathSegment(points[keys[currentSegmentIndex + 1]], points[keys[currentSegmentIndex + 2]]);
              
              if (currentSegmentIndex + 3 === keys.length) {
                const lastPoint = points[keys[keys.length - 1]];
                addDestinationMarker(lastPoint.x, lastPoint.y);
              }
            } else {
              setDestinationReached(true);
            }
          }
        }
      }, 100);

      return () => clearInterval(positionUpdateInterval);
    }
  }, [sceneRef, cameraRef, currentSegmentIndex, visiblePathPoints, rotatedPoints, originalPoints, announcedDirection, navigationStarted, isRotated]);

  useEffect(() => {
    if (arStarted && !showContainer && !destinationReached && !showDistance) {
      setShowScanInstructions(true);
    } else {
      setShowScanInstructions(false);
    }
  }, [arStarted, showContainer, destinationReached, showDistance]);

  const addDestinationMarker = (x, y) => {
    const loader = new GLTFLoader();
    loader.load('map_pointer_3d_icon.glb', (gltf) => {
        const model = gltf.scene;
        model.scale.set(0.2, 0.2, 0.2);
        model.name = 'mapPointer';
        modelRef.current = model;
        model.position.set(x, -1.2, y);
        const clock = new THREE.Clock();
        const rotateSpeed = 1;
        const animateModel = () => {
            const delta = clock.getDelta();
            model.rotateY(delta * rotateSpeed);
            requestAnimationFrame(animateModel);
        };
        animateModel();
        sceneRef.current.add(model);
    }, undefined, (error) => {
        console.error('An error happened', error);
    });
   
    const labelText = selectedContent.content || 'Unknown Room';
    addLabel(labelText, x, 0.7, y); 
  }

  const GetHeading = () => {
    if(/android/i.test(userAgent)){
      if (!headingStored && window.DeviceOrientationEvent) {
        if (typeof DeviceOrientationEvent.requestPermission !== 'function') {
          window.addEventListener('deviceorientationabsolute', handleOrientationAndroid, true);
        }
      } else if (!headingStored) {
        alert("Sorry, your browser doesn't support Device Orientation");
      }
      return () => {
        window.removeEventListener('deviceorientationabsolute', handleOrientationAndroid);
      };
    } else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream){
      if (!headingStored && window.DeviceOrientationEvent) {
        if (typeof DeviceOrientationEvent.requestPermission === 'function') {
          DeviceOrientationEvent.requestPermission()
            .then((response) => {
              if (response === 'granted') {
                window.addEventListener('deviceorientation', handleOrientationIos, true);
              } else {
                alert('Permission to access device orientation was denied.');
              }
            })
            .catch((error) => {
              console.error('Error requesting device orientation permission:', error);
              alert('Permission request failed.');
            });
        } else {
          window.addEventListener('deviceorientation', handleOrientationIos, true);
        }
      } else if (!headingStored) {
        alert("Sorry, your browser doesn't support Device Orientation");
      }
    
      return () => {
        window.removeEventListener('deviceorientation', handleOrientationIos);
      };
    }else{
      console.log('Compass not Supported');
      alert('Compass not Supported');
    }
  }

  const handleOrientationAndroid = (event) => {
    let direction;
      if (event.webkitCompassHeading) {
        direction = event.webkitCompassHeading;
      } else if (event.absolute && event.alpha !== null) {
        direction = 360 - event.alpha;
      }
      
      if (direction !== undefined && count === 0) {
        direction = (direction + offset + 360) % 360;
        setHeading(direction);
        count = count + 1;
        setHeadingStored(true);
        window.removeEventListener('deviceorientationabsolute', handleOrientationAndroid);
      }else{
        direction = (direction + offset + 360) % 360;
        setHeadingAdjust(direction);
        window.removeEventListener('deviceorientationabsolute', handleOrientationAndroid);
      }
  }
 
  const handleOrientationIos = (event) => {
    
    let direction;
    if (event.webkitCompassHeading) {
      direction = event.webkitCompassHeading;
    } else if (event.absolute && event.alpha !== null) {
      direction = 360 - event.alpha;
      if (isAndroid()) {
        const screenOrientation = window.screen.orientation.angle || window.orientation || 0;
        direction = (direction + screenOrientation) % 360;
      }
    } else if (event.alpha !== null && !isAndroid()) {
      direction = 360 - event.alpha;
    } else if (event.gamma !== null && event.beta !== null) {
      const radians = Math.atan2(event.gamma, event.beta);
      const degrees = radians * 180 / Math.PI;
      direction = (360 - degrees + 90) % 360;
    }
      
    if (direction !== undefined && count === 0) {
      direction = (direction + offset + 360) % 360;
      setHeading(direction);
      count = count + 1;
      setHeadingStored(true);
      window.removeEventListener('deviceorientation', handleOrientationIos);
    }else{
      direction = (direction + offset + 360) % 360;
      setHeadingAdjust(direction);
      window.removeEventListener('deviceorientation', handleOrientationIos);
    }
    
  };
  
  const showMap = () => setmapView(true);
  const hideMap = () => setmapView(false);
  const ShowModelposition = () => setPositionModelShow(true);
  const HideModelposition = () => setPositionModelShow(false);

  return (
  <div ref={mountRef} className='app'>
    {arStarted ? (
      <>
        {arStarted && !showContainer && !destinationReached && showDistance && (
          <div className="navigationCard">
            <div className="navigationInfo">
              <div className="arrival">
                <div className="arrivalTime">Arrive in</div>
                <div className="distance">{distance.toFixed(2)} m</div>
              </div>
              <div className="direction">
                <i className={`fas fa-arrow-${turnDirection} fa-lg`}></i>
                <div className="turn">{turnDirection}</div>
              </div>
              <div className="department">
                <div className="departmentName">{selectedContent.content}</div>
              </div>
            </div>
          </div>
        )}

        {arStarted && !showContainer && !destinationReached && showDistance &&(
          <div style={{height : "30%", width : "100%", display : "flex", justifyContent : "flex-start", paddingLeft : "85%", placeItems : "center"}}>
            <div className = "position-map-icon" onClick={ShowModelposition}>
              <img src='map.png' alt = "map" style={{height : "25px", width : "25px"}}></img>
            </div>
          </div>
        )}

        {PositionModelShow &&(
          <div className='position-model'>
            <div style={{position : "relative", height : "100%", width : "100%"}}>
              <div className = "position-model-close" onClick={HideModelposition}>
                <img src = 'ARviewIcon.png' style={{height : "30px", width : "30px"}}></img>
              </div>
              <PositionModel path = {modelPath} userPosCurr = {userPosition} rotateAngle = {heading.toFixed(0)} adjustAngle = {totalRotationAngle} />
            </div>
          </div>
        )}
  
        {destinationReached && (
          <div className="navigationCard destination-reached">
            <div className="navigationInfo">
              <div className="status">Reached</div>
              <div className="userInfo">
                <img
                  src={selectedContent.image}
                  alt={selectedContent.content}
                  className="profileImage"
                />
                <div className="userDetails">
                  <div className="userName">{selectedContent.content}</div>
                </div>
              </div>
            </div>
          </div>
        )}
  
        {showContainer && (
          <div className="container">
            {/* <div>{heading.toFixed(2)}</div> */}
            <div className="header">
              <div className="title-line">
                <h2 className="title">Explore</h2>
              </div>
              <div className="subtitle">
                <h2>RandomWalk</h2>
              </div>
              <div className="button-row">
                <button
                  className={`button ${activeButton === 'All' ? 'active' : ''}`}
                  onClick={() => setActiveButton('All')}
                >
                  All
                </button>
                <button
                  className={`button ${
                    activeButton === 'Executive' ? 'active' : ''
                  }`}
                  onClick={() => setActiveButton('Executive')}
                >
                  Executive
                </button>
                <button
                  className={`button ${
                    activeButton === 'Department' ? 'active' : ''
                  }`}
                  onClick={() => setActiveButton('Department')}
                >
                  Department
                </button>
                <button
                  className={`button ${
                    activeButton === 'Common Areas' ? 'active' : ''
                  }`}
                  onClick={() => setActiveButton('Common Areas')}
                >
                  Common Areas
                </button>
              </div>
            </div>
            <div className="sections-container">
              {groupedSections.map((sectionRow, rowIndex) => (
                <div className="section-row" key={rowIndex}>
                  {sectionRow.map((section) => (
                    <div
                      className="section"
                      key={section.id}
                      onClick={() => handleSectionClick(section)}
                    >
                      <img src={section.image} alt={section.content} />
                      <div className="section-content">{section.content}</div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}

        {mapView &&
        <div className = "leftRight">
          <div className = "close-icon-twos" onClick={hideMap}>
            <div className='close-icon-twos-close'><FaTimes /></div>
          </div>
          <div style={{width : "96%", display : "flex", justifyContent : "space-between", placeItems : "center"}}>
            <div onClick={() => rotate('right')} className = "rotateArrowIcon"><FaArrowLeft /></div>
            <div onClick={() => rotate('left')} className='rotateArrowIcon'><FaArrowRight /></div>
          </div>
          <div className='user-orientation'>
            <img src='compassArrow.png' style={{height : "80px", width : "80px", transform: `rotate(${headingAdjust.toFixed(0)}deg)`}}></img>
          </div>
        </div>
        }

        {mapView && 
        <div className='map-container'>
          <PathModel path = {modelPath} userPosCurr = {userPosition} />
        </div>
        }

        {!showContainer && showBottomSection && !mapView &&(
          <div className="bottom-section">
            <div className="close-icon-two" onClick={handleCloseClickTwo}>
              <FaTimes />
            </div>
            <div className="bottom-content">
              <img
                src={selectedContent.image}
                alt={selectedContent.content}
                className="profile-picture"
              />
              <div className="text">
                <h4>{selectedContent.content}</h4>
                {!floor && <p>{messageBack}</p>}
              </div>
            </div>
  
            {floor && !showDistance && (
              <button
                className="go-button"
                id="enter-ar"
                disabled={!goDisBut}
                onClick={handleGo}
              >
                Go
              </button>
            )}
          </div>
        )}
      </>
    ) : (
      <div className="landing-container" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)',}}>
        <div className='floor-map-container'>
          <MapModel path = {userLocDetected} />
        </div>
         <button className="custom-ar-button" onClick={startAR}> Start</button>
      </div>
    )}
  </div>
  );
};

export default Nav;