import React, { useEffect, useRef, useState } from 'react';
import './UserUpload.css';
import { useNavigate } from 'react-router-dom';
 
const UserUpload = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [photos, setPhotos] = useState([]);
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
 
  useEffect(() => {
    startCamera();
  }, []);
 
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      //const stream = await navigator.mediaDevices.getUserMedia({ video: {facingMode: { exact: 'environment' }} });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current.play();
        };
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };
 
  const capturePhoto = () => {
    const context = canvasRef.current.getContext('2d');
    const video = videoRef.current;
    canvasRef.current.width = 1637;
    canvasRef.current.height = 2048;
    context.drawImage(video, 0, 0, canvasRef.current.width, canvasRef.current.height);
    const newPhoto = canvasRef.current.toDataURL('image/png');
    setPhotos(prevPhotos => [...prevPhotos, newPhoto]);
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject;
      const tracks = stream.getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
  };

 
  const uploadPhotos = async () => {
    stopCamera()
    setLoading(true);
    console.log('Uploading photos...');
   
    const formData = new FormData();
 
    try {
      console.log('1')
      await Promise.all(photos.map(async (photo, index) => {
        const response = await fetch(photo);
        const blob = await response.blob();
        formData.append('files', blob, `photo${index + 1}.png`);
      }));

      console.log('2')
 
      const res = await fetch('http://127.0.0.1:8000/upload', {
        method: 'POST',
        body: formData,
      });

 
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
 
      const data = await res.json();
      console.log('Data',data)
      const values = data.matches;
      console.log('values', values)
      const detectedPlaces = [];
      for(var i = 0; i < values.length; i++){
        const placeDetected = values[i].replace(/(\d+)(\.[^\.]+)$/, '$2').replace(/\.(jpg|jpeg|png)$/, '');
        detectedPlaces.push(placeDetected);
      }
      console.log('detectedPlaces',detectedPlaces)
      const located = mostFrequentElement(detectedPlaces)
      console.log('located',located)
      
      localStorage.setItem('userLocation',located)
      localStorage.setItem('UserPosition',located)
      navigate("/navwebxr");
      setResponse(data);
      
    } catch (error) {
      console.error('Error uploading files:', error);
      setResponse({ message: 'Upload failed: ' + error.message });
    } finally {
      setLoading(false);
    }
  };

  const mostFrequentElement = (arr) =>{
    const count = {};
    arr.forEach(item => {
      count[item] = (count[item] || 0) + 1;
    });
    
    let maxCount = 0;
    let mostFrequent = null;
    for (const [item, itemCount] of Object.entries(count)) {
      if (itemCount > maxCount) {
        maxCount = itemCount;
        mostFrequent = item;
      }
    }
    return mostFrequent;
  }
 
  return (
    <div className='app'>
      <video ref={videoRef} className='video-background' autoPlay></video>
      <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
     
      {photos.length > 0 && (
        <div className='photo-preview'>
          {photos.map((photo, index) => (
            <img key={index} src={photo} alt={`Captured ${index + 1}`} className='preview-image' />
          ))}
        </div>
      )}
     
      <div className='capture-main'>
        {photos.length < 4 && (
          <div className='capture-but' onClick={capturePhoto}>
            <img className='camIcon' src='camIcon.svg' alt='Capture'/>
          </div>
        )}
        {photos.length === 4 && (
          <div className='capture-but' onClick={uploadPhotos}>
            <img className='camIcon' src='uploadArrow.png' alt='Upload'/>
          </div>
        )}
      </div>
      {loading && (
        <div className='loading'>
          <div className='spinner'></div>
        </div>
      )}
    </div>
  );
};
 
export default UserUpload;