import React, { useState, useEffect } from 'react';

const CompassHeading = () => {
  const [heading, setHeading] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    // Request permission for iOS 13+ devices
    if (typeof DeviceOrientationEvent.requestPermission === 'function') {
      DeviceOrientationEvent.requestPermission()
        .then((response) => {
          if (response === 'granted') {
            window.addEventListener('deviceorientation', handleOrientation);
          } else {
            setError('Permission denied. Please allow access to sensors.');
          }
        })
        .catch((err) => {
          setError('Error while requesting permission: ' + err.message);
        });
    } else {
      // For other devices, add the event listener directly
      window.addEventListener('deviceorientation', handleOrientation);
    }

    return () => {
      window.removeEventListener('deviceorientation', handleOrientation);
    };
  }, []);

  const handleOrientation = (event) => {
    if (event.webkitCompassHeading !== undefined) {
      // iOS specific compass heading (in degrees)
      setHeading(event.webkitCompassHeading);
    } else if (event.alpha !== null) {
      // For devices that do not have webkitCompassHeading (Fallback)
      setHeading(360 - event.alpha); // alpha represents the device's rotation in degrees
    } else {
      setError('Compass not supported');
    }
  };

  return (
    <div>
      {heading !== null ? (
        <h1>Compass Heading: {heading.toFixed(2)}°</h1>
      ) : (
        <h1>{error ? error : 'Fetching compass data...'}</h1>
      )}
    </div>
  );
};

export default CompassHeading;
