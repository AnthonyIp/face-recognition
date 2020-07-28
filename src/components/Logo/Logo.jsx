import React from 'react';
import Tilt  from 'react-tilt'
import brain from './brain.png';
import './logo.scss';

const Logo = () => {
    return (
        <div className="logo ma4 mt0 center">
            <Tilt className="Tilt br2 shadow-2" options={{max: 55}} style={{height: 150, width: 150}}>
                <div className="Tilt-inner flex justify-center items-center h-100">
                    <img className="pt2" src={brain} alt="brain"/>
                </div>
            </Tilt>
        </div>
    );
};

export default Logo;
