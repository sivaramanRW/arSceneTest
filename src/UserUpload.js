import React, { useEffect, useRef, useState } from 'react';
import './UserUpload.css';
import { useNavigate } from 'react-router-dom';
 
const UserUpload = () => {
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedVideo, setRecordedVideo] = useState(null);
  const [videoBlob, setVideoBlob] = useState(null);
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
 
  useEffect(() => {
    startCamera();
  }, []);
 
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
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
 
  const startRecording = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject;
      mediaRecorderRef.current = new MediaRecorder(stream);
      let chunks = [];
 
      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };
 
      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(chunks, { type: 'video/webm' });
        setRecordedVideo(URL.createObjectURL(blob));
        setVideoBlob(blob);
      };
 
      mediaRecorderRef.current.start();
      setIsRecording(true);
    }
  };
 
  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };
 
  const uploadVideo = async () => {
    if (!videoBlob) return;
 
    setLoading(true);
    console.log('Uploading video...');
   
    const formData = new FormData();
    formData.append('file', videoBlob, 'recorded_video.webm');
 
    try {
      const res = await fetch('http://localhost:8000/upload-video', {
        method: 'POST',
        body: formData,
      });
 
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
 
      const data = await res.json();
      console.log('Data',data)
      const values = data.matches.map(match => match.image);
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
 
      console.log('Upload response:', data);
      setResponse(data);
    } catch (error) {
      console.error('Error uploading video:', error);
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
      <video ref={videoRef} className='video-background' autoPlay muted></video>
     
      {recordedVideo && (
        <div className='video-preview'>
          <video src={recordedVideo} controls className='preview-video'></video>
        </div>
      )}
     
      <div className='capture-main'>
        {!isRecording && !recordedVideo && (
          <div className='capture-but' onClick={startRecording}>
            <img className='camIcon' src='recordicon.png' alt='Start Recording'/>
          </div>
        )}
        {isRecording && (
          <div className='capture-but' onClick={stopRecording}>
            <img className='camIcon' src='stopicon.png' alt='Stop Recording'/>
          </div>
        )}
        {recordedVideo && (
          <div className='capture-but' onClick={uploadVideo}>
            <img className='camIcon' src='uploadArrow.png' alt='Upload'/>
          </div>
        )}
      </div>
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
 
export default UserUpload;