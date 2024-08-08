import React, { useEffect, useRef, useState } from 'react';
import './UserUpload.css';
import { useNavigate } from 'react-router-dom';

const UserUpload = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [photo, setPhoto] = useState(null);
  const [response, setResponse] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    startCamera();
  }, []);

  const startCamera = async () => {
    try {
      // const stream = await navigator.mediaDevices.getUserMedia({ video: {facingMode: { exact: 'environment' }} });
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
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
    setPhoto(canvasRef.current.toDataURL('image/png'));
  };

  const uploadPhoto = async () => {
    const response = await fetch(photo);
    const blob = await response.blob();
    const file = new File([blob], 'photo.png', { type: 'image/png' });

    const formData = new FormData();
    formData.append('file', file);

    try {
      console.log('one');
      const res = await fetch('http://localhost:8000/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      const placeDetected = data['best_match'].replace(/(\d+)(\.[^\.]+)$/, '$2').replace(/\.(jpg|jpeg|png)$/, '');
      console.log('placeDetected',placeDetected)
      localStorage.setItem('userLocation',placeDetected)
      localStorage.setItem('UserPosition','IDK')
      navigate("/navwebxr");
      setResponse(data);

    } catch (error) {
      console.error('Error uploading file:', error);
      setResponse({ message: 'Upload failed' });
    }
  };

  return (
    <div className='app'>
      <video ref={videoRef} className='video-background' autoPlay></video>
      <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
      <div className='capture-main'>

        {!photo &&(
        <div className = 'capture-but' onClick={capturePhoto}> 
          <img className = 'camIcon' src='camIcon.svg'/>
        </div>)}

        {photo && (
        <div className = 'capture-but' onClick={uploadPhoto}> 
          <img className = 'camIcon' src='uploadArrow.png'/>
        </div>)}

      </div>
    </div>
  );
};

export default UserUpload;

