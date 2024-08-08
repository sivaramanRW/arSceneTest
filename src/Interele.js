import React from 'react'
import { useNavigate } from 'react-router-dom';
import './Interele.css';

const Interele = () => {

    const navigate = useNavigate();

    const Openarjs = () =>{
        navigate ("/userupload");
    }

  return (
    <div className='landing-container' style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
      <div className='content-wrapper'>
        <img src='randomwalkLogo.svg' className='randomwalkLogo' alt="RandomWalk logo"/>
        <img src='3d Model.svg' style={{ marginRight: '-40px' }} alt="RandomWalk logo"/>
        <h2 id='head'>AR Office Guide</h2>
            <p className='subtitle' style={{ paddingBottom: '40px' }}>Locate office spaces effortlessly with AR Indoor Navigation..</p>
            <button onClick={Openarjs} className='location-button'>Get Started</button>
        </div>
    </div>
  )
}

export default Interele
