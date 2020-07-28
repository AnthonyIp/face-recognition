import React from 'react';
import './face-recognition.scss';

const FaceRecognition = ({imageUrl, box}) => {
    return (
        <div className={`face-recognition center ma`}>
            <div className="absolute mt2">
                <img id='input-image' alt='' src={imageUrl} width='500px' height='auto'/>
                <div className='absolute bounding-box'
                     style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}
                />
            </div>
        </div>
    );
};

export default FaceRecognition;
