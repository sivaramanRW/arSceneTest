import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ARScene.css';
 
export const detectedImagesGlobal = {};
 
const ARScene = () => {
  const navigate = useNavigate();
  const [detectedImages, setDetectedImages] = useState({});
 
  const markers = [

    //ZPATH/Z
    { id: 'Zone', name: 'Z', url: 'collections/ZPATH/Z/Z1', place : 'Z1'},
    { id: 'Ztwo', name: 'Z', url: 'collections/ZPATH/Z/Z2', place : 'Z2'},
    { id: 'Zthree', name: 'Z', url: 'collections/ZPATH/Z/Z2', place : 'Z3'},
    { id: 'Zfour', name: 'Z', url: 'collections/ZPATH/Z/Z3', place : 'Z4'},

    //AA
    { id: 'AAone', name: 'AA', url: 'collections/AA/aa1', place : 'AA1'},
    { id: 'AAtwo', name: 'AA', url: 'collections/AA/aa2', place : 'AA2'},
    { id: 'AAthree', name: 'AA', url: 'collections/AA/aa3', place : 'AA3'},

    //AB
    { id: 'ABone', name: 'AB', url: 'collections/AB/ab1', place : 'AB1'},
    { id: 'ABtwo', name: 'AB', url: 'collections/AB/ab2', place : 'AB2'},
    { id: 'ABthree', name: 'AB', url: 'collections/AB/ab3', place : 'AB3'},

    //AC
    { id: 'ACone', name: 'AC', url: 'collections/AC/ac1', place : 'AC1'},
    { id: 'ACtwo', name: 'AC', url: 'collections/AC/ac2', place : 'AC2'},
    { id: 'ACthree', name: 'AC', url: 'collections/AC/ac3', place : 'AC3'},
    { id: 'ACfour', name: 'AC', url: 'collections/AC/ac4', place : 'AC4'},

    //AD
    { id: 'ADone', name: 'AD', url: 'collections/AD/ad1', place : 'AD1'},
    { id: 'ADtwo', name: 'AD', url: 'collections/AD/ad2', place : 'AD2'},
    { id: 'ADthree', name: 'AD', url: 'collections/AD/ad3', place : 'AD3'},
    { id: 'ADfour', name: 'AD', url: 'collections/AD/ad4', place : 'AD4'},

    //AE
    { id: 'AEone', name: 'AE', url: 'collections/AE/ae1', place : 'AE1'},
    { id: 'AEtwo', name: 'AE', url: 'collections/AE/ae2', place : 'AE2'},
    { id: 'AEthree', name: 'AE', url: 'collections/AE/ae3', place : 'AE3'},
    { id: 'AEfour', name: 'AE', url: 'collections/AE/ae4', place : 'AE4'},

    //D PATH
    //D
    { id: 'Done', name: 'D', url: 'collections/DPATH/D/D1', place : 'D'},
    { id: 'Dtwo', name: 'D', url: 'collections/DPATH/D/D2', place : 'D'},
    { id: 'Dthree', name: 'D', url: 'collections/DPATH/D/D3', place : 'D'},
    { id: 'Dfour', name: 'D', url: 'collections/DPATH/D/D4', place : 'D'},
    { id: 'Dfive', name: 'D', url: 'collections/DPATH/D/D5', place : 'D'},
    { id: 'Dsix', name: 'D', url: 'collections/DPATH/D/D6', place : 'D'},
    { id: 'Dseven', name: 'D', url: 'collections/DPATH/D/D7', place : 'D'},
    { id: 'Deight', name: 'D', url: 'collections/DPATH/D/D8', place : 'D'},

    //DA
    { id: 'DAone', name: 'DA', url: 'collections/DPATH/DA/DA1', place : 'DA'},
    { id: 'DAtwo', name: 'DA', url: 'collections/DPATH/DA/DA2', place : 'DA'},
    { id: 'DAthree', name: 'DA', url: 'collections/DPATH/DA/DA3', place : 'DA'},
    { id: 'DAfour', name: 'DA', url: 'collections/DPATH/DA/DA4', place : 'DA'},
    { id: 'DAfive', name: 'DA', url: 'collections/DPATH/DA/DA5', place : 'DA'},
    { id: 'DAsix', name: 'DA', url: 'collections/DPATH/DA/DA6', place : 'DA'},
    { id: 'DAseven', name: 'DA', url: 'collections/DPATH/DA/DA7', place : 'DA'},
    
    //DB
    { id: 'DBone', name: 'DB', url: 'collections/DPATH/DB/DB1', place : 'DB'},
    { id: 'DBtwo', name: 'DB', url: 'collections/DPATH/DB/DB2', place : 'DB'},
    { id: 'DBthree', name: 'DB', url: 'collections/DPATH/DB/DB3', place : 'DB'},
    { id: 'DBfour', name: 'DB', url: 'collections/DPATH/DB/DB4', place : 'DB'},
    { id: 'DBfive', name: 'DB', url: 'collections/DPATH/DB/DB5', place : 'DB'},
    { id: 'DBsix', name: 'DB', url: 'collections/DPATH/DB/DB6', place : 'DB'},
    { id: 'DBseven', name: 'DB', url: 'collections/DPATH/DB/DB7', place : 'DB'},
    { id: 'DBeight', name: 'DB', url: 'collections/DPATH/DB/DB8', place : 'DB'},

    //DC
    { id: 'DCone', name: 'DC', url: 'collections/DPATH/DC/DC1', place : 'DC'},
    { id: 'DCtwo', name: 'DC', url: 'collections/DPATH/DC/DC2', place : 'DC'},
    { id: 'DCthree', name: 'DC', url: 'collections/DPATH/DC/DC3', place : 'DC'},
    { id: 'DCfour', name: 'DC', url: 'collections/DPATH/DC/DC4', place : 'DC'},

    //L PATH
    //L
    { id: 'Lone', name: 'L', url: 'collections/LPATH/L/L1', place : 'L'},
    { id: 'Ltwo', name: 'L', url: 'collections/LPATH/L/L2', place : 'L'},
    { id: 'Lthree', name: 'L', url: 'collections/LPATH/L/L3', place : 'L'},
    { id: 'Lfour', name: 'L', url: 'collections/LPATH/L/L4', place : 'L'},
    { id: 'Lfive', name: 'L', url: 'collections/LPATH/L/L5', place : 'L'},
    { id: 'Lsix', name: 'L', url: 'collections/LPATH/L/L6', place : 'L'},
    { id: 'Lseven', name: 'L', url: 'collections/LPATH/L/L7', place : 'L'},
    { id: 'Leight', name: 'L', url: 'collections/LPATH/L/L8', place : 'L'},

    //LA
    { id: 'LAone', name: 'LA', url: 'collections/LPATH/LA/LA1', place : 'LA'},
    { id: 'LAtwo', name: 'LA', url: 'collections/LPATH/LA/LA2', place : 'LA'},
    { id: 'LAthree', name: 'LA', url: 'collections/LPATH/LA/LA3', place : 'LA'},
    { id: 'LAfour', name: 'LA', url: 'collections/LPATH/LA/LA4', place : 'LA'},
    { id: 'LAfive', name: 'LA', url: 'collections/LPATH/LA/LA5', place : 'LA'},
    { id: 'LAsix', name: 'LA', url: 'collections/LPATH/LA/LA6', place : 'LA'},
    { id: 'LAseven', name: 'LA', url: 'collections/LPATH/LA/LA7', place : 'LA'},
    { id: 'LAeight', name: 'LA', url: 'collections/LPATH/LA/LA8', place : 'LA'},

    //LB
    { id: 'LBone', name: 'LB', url: 'collections/LPATH/LB/LB1', place : 'LB'},
    { id: 'LBtwo', name: 'LB', url: 'collections/LPATH/LB/LB2', place : 'LB'},
    { id: 'LBthree', name: 'LB', url: 'collections/LPATH/LB/LB3', place : 'LB'},
    { id: 'LBfour', name: 'LB', url: 'collections/LPATH/LB/LB4', place : 'LB'},
    { id: 'LBfive', name: 'LB', url: 'collections/LPATH/LB/LB5', place : 'LB'},
    { id: 'LBsix', name: 'LB', url: 'collections/LPATH/LB/LB6', place : 'LB'},
    { id: 'LBseven', name: 'LB', url: 'collections/LPATH/LB/LB7', place : 'LB'},

    //LC
    { id: 'LCone', name: 'LC', url: 'collections/LPATH/LC/LC1', place : 'LC'},
    { id: 'LCtwo', name: 'LC', url: 'collections/LPATH/LC/LC2', place : 'LC'},
    { id: 'LCthree', name: 'LC', url: 'collections/LPATH/LC/LC3', place : 'LC'},
    { id: 'LCfour', name: 'LC', url: 'collections/LPATH/LC/LC4', place : 'LC'},
    { id: 'LCfive', name: 'LC', url: 'collections/LPATH/LC/LC5', place : 'LC'},
    { id: 'LCsix', name: 'LC', url: 'collections/LPATH/LC/LC6', place : 'LC'},
    { id: 'LCseven', name: 'LC', url: 'collections/LPATH/LC/LC7', place : 'LC'},
    { id: 'LCeight', name: 'LC', url: 'collections/LPATH/LC/LC8', place : 'LC'},
    { id: 'LCnine', name: 'LC', url: 'collections/LPATH/LC/LC9', place : 'LC'},

  ];
 
  useEffect(() => {
    const scene = document.querySelector('a-scene');
 
    const handleMarkerFound = (markerName, place) => {
      if (!detectedImages[markerName]) {
        alert(`${place} image detected`);
        setDetectedImages(prev => ({ ...prev, [markerName]: true }));
        localStorage.setItem('userLocation',markerName);
        localStorage.setItem('UserPosition',place)
        detectedImagesGlobal[markerName] = true;
        navigateAndCleanup();
      }
    };
 
    const navigateAndCleanup = () => {
      const video = document.querySelector('video');
      if (video) {
        const stream = video.srcObject;
        if (stream) {
          const tracks = stream.getTracks();
          tracks.forEach(track => track.stop());
          video.srcObject = null;
        }
      }
 
      if (scene) {
        scene.parentNode.removeChild(scene);
        navigate("/navwebxr");
        window.location.reload();
      }
    };
 
    markers.forEach(marker => {
      const markerElement = document.querySelector(`#${marker.id}`);
      if (markerElement) {
        const boundHandleMarkerFound = () => handleMarkerFound(marker.name, marker.place);
        markerElement.addEventListener('markerFound', boundHandleMarkerFound);
        markerElement.boundHandleMarkerFound = boundHandleMarkerFound;
      }
    });
 
    return () => {
      markers.forEach(marker => {
        const markerElement = document.querySelector(`#${marker.id}`);
        if (markerElement && markerElement.boundHandleMarkerFound) {
          markerElement.removeEventListener('markerFound', markerElement.boundHandleMarkerFound);
        }
      });
    };
  }, [navigate]);
 
  return (
    <div className = "arjsmaindiv">
      <a-scene embedded arjs="sourceType: webcam; debugUIEnabled: false;">
        {markers.map(marker => (
          <a-nft
            key={marker.id}
            id={marker.id}
            type="nft"
            url={marker.url}
            smooth="true"
            smoothCount="10"
            smoothTolerance=".01"
            smoothThreshold="5"
          >
            <a-box position="0 0 -2" scale="20 20 20"></a-box>
          </a-nft>
        ))}
        <a-entity camera></a-entity>
      </a-scene>
      <div className = "arjsmsg">
        Please turn around and point your camera at the environment
      </div>
    </div>
  );
};
 
export default ARScene;
