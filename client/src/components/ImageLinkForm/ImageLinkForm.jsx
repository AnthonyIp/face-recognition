import React from 'react';
import './form.scss';

const ImageLinkForm = ({handleChange, handleSubmit}) => {
    return (
        <div className={`image-link-form`}>
            <p className="f3">
                {'This magic brain will detect faces in your pictures. Give it a try'}
            </p>
            <div className='center'>
                <div className="form center pa4 br3 shadow-5 ">
                    <input className="f4 pa2 w-70 center" type="text" onChange={handleChange}/>
                    <button className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple"
                            onClick={handleSubmit}>Detect!
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ImageLinkForm;
