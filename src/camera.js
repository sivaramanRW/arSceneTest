import React, { useEffect, useRef, useState } from 'react';
import './camera.css'
import { useNavigate } from 'react-router-dom';

const Camera = () => {
  const videoRef = useRef(null);
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [videoURL, setVideoURL] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    startCamera();
  }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  const startRecording = () => {
    if (videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject;
      const recorder = new MediaRecorder(stream);

      const chunks = [];
      recorder.ondataavailable = (event) => {
        chunks.push(event.data);
      };

      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'video/mp4' });
        const url = URL.createObjectURL(blob);
        setVideoURL(url);
      };

      recorder.start();
      setMediaRecorder(recorder);
      setIsRecording(true);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setIsRecording(false);
    }
  };

  const uploadVideo = async () => {
    setLoading(true)
    try {
      const response = await fetch(videoURL);
      const blob = await response.blob();
      const file = new File([blob], 'video.mp4', { type: 'video/mp4' });

      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('http://localhost:8000/upload-video', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      console.log('Response', data);
      const placeDetected = data.matches;
      console.log('detectedPlaces',placeDetected)
      localStorage.setItem('userLocation',placeDetected)
      localStorage.setItem('UserPosition',placeDetected)
      navigate("/navwebxr");

    } catch (error) {
      console.error('Error uploading video:', error);
    }finally{
      setLoading(false)
    }
  };

  return (
    <div className='app'>
      <video className="video-background" ref={videoRef} autoPlay></video>
      {!videoURL && <div className='message-container'>
        <div className='message'>Hold your phone straight and record a video of your surrounding avoid facing direct walls.</div>
      </div>}
      <div className='button-section'>
        {!isRecording && !videoURL && <button className = 'start-record' onClick={startRecording}>Start Recording</button>}
        {isRecording && <button className='stop-record' onClick={stopRecording}>Stop Recording</button>}
        {videoURL && !isRecording && <button className = 'stop-record' onClick={uploadVideo}>start localizing</button>}
      </div>
      {loading && (
        <div className="loading-overlay">
          <div className="loading-content">
            <div className="spinner"></div>
            <div className="loading-message">localizing</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Camera;