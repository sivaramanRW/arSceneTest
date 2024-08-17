import React, { useEffect, useRef, useState } from 'react';
import './camera.css'

const Camera = () => {
  const videoRef = useRef(null);
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [videoURL, setVideoURL] = useState('');
  const [loading, setLoading] = useState(false);

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
    } catch (error) {
      console.error('Error uploading video:', error);
    }finally{
      setLoading(false)
    }
  };

  return (
    <div className='app'>
      <video className="video-background" ref={videoRef} autoPlay></video>
      {!isRecording && <button onClick={startRecording}>Start Recording</button>}
      {isRecording && <button onClick={stopRecording}>Stop Recording</button>}
      {videoURL && !isRecording && <button onClick={uploadVideo}>Upload Video</button>}
      {loading && (
        <div className="loading-overlay">
          <div className="loading-content">
            <div className="spinner"></div>
            <div className="loading-message">Uploading video...</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Camera;
