import React, { useEffect, useRef, useState } from 'react';
import './camera.css';
import { useNavigate } from 'react-router-dom';

const Camera = () => {
  const videoRef = useRef(null);
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [videoURL, setVideoURL] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(true);
  const [retake, setRetake] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    startCamera();
    // Cleanup on component unmount
    return () => {
      stopCamera();
    };
  }, []);

  useEffect(() => {
    let interval;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      setRecordingTime(0);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const startCamera = async () => {
    try {
      const constraints = {
        video: {
          facingMode: 'environment',
          advanced: [{ zoom: 2 }]
        }
      };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject;
      const tracks = stream.getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
  };

  const startRecording = () => {
    if (videoRef.current.srcObject) {
      setMessage(false);
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
    setLoading(true);
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
      
      // const res = await fetch('https://f009-103-13-40-98.ngrok-free.app/upload-video', {
      //   method: 'POST',
      //   body: formData,
      // });

      const data = await res.json();
      console.log('Response', data);
      const placeDetected = data.matches;
      if (placeDetected === 0) {
        setRetake(true);
      } else {
        const userRoom = data.userRoom;
        console.log('detectedPlaces', placeDetected);
        const located = { 'userLocDetected': placeDetected, 'userPosDetected': userRoom };
        stopCamera();
        navigate("/navwebxr", { state: located });
      }

    } catch (error) {
      console.error('Error uploading video:', error);
    } finally {
      setLoading(false);
    }
  };

  const retake_video = () => {
    if (mediaRecorder && isRecording) {
      mediaRecorder.stop();
      setIsRecording(false);
    }

    stopCamera();
    setVideoURL('');
    setMessage(true);
    setRetake(false);
    setRecordingTime(0);
    startCamera();
  };

  return (
    <div className='appCamera'>
      <video className="video-background-camera" ref={videoRef} autoPlay></video>
      {message && 
        <div className='message-container'>
          <div className='message'>Hold your phone straight and record a video of your surroundings, avoid facing direct walls.</div>
        </div>
      }
      {retake &&
         <div className='message-container'>
           <div className='message'>Please retake the video by keeping your phone steady and ensuring the camera captures the surroundings clearly.</div>
         </div>
      }
      <div className='controls-container'>
        {isRecording && (
          <div className="recording-indicator-container">
            <div className="recording-indicator"></div>
            <div className="recording-timer">
              {Math.floor(recordingTime / 60)}:{(recordingTime % 60).toString().padStart(2, '0')}
            </div>
          </div>
        )}
        <div className='button-section'>
          {!isRecording && !videoURL && <button className='start-record' onClick={startRecording}>Start Recording</button>}
          {isRecording && <button className='stop-record' onClick={stopRecording}>Stop Recording</button>}
          {videoURL && !isRecording && !retake && <button className='start-localizing' onClick={uploadVideo}>Start Localizing</button>}
          {retake && <button className='start-localizing' onClick={retake_video}>Retake</button>}
        </div>
      </div>
      {loading && (
        <div className="loading-overlay">
          <div className="loading-content">
            <div className="spinner"></div>
            <div className="loading-message">Please don't move while localizing...</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Camera;
