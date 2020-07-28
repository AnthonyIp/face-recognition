import Clarifai          from 'clarifai';
import React, {useState} from 'react';
import Particles         from 'react-particles-js';
import './App.css';
import FaceRecognition   from './components/FaceRecognition/FaceRecognition';
import ImageLinkForm     from './components/ImageLinkForm/ImageLinkForm';
import Logo              from './components/Logo/Logo';
import Navigation        from './components/Navigation/Navigation';
import Rank              from './components/Rank/Rank';

const app = new Clarifai.App({
    apiKey: 'cb2d9d886fc54771929b68168ae831a9'
});

const particlesOptions = {
    particles: {
        number     : {
            value  : 150,
            density: {
                enable    : true,
                value_area: 800
            }
        },
        line_linked: {
            shadow: {
                enable: true,
                color : "#3CA9D1",
                blur  : 5
            }
        },
        move       : {
            speed: 8
        }
    }
};

const App = () => {
    const [input, setInput] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [box, setBox] = useState({});

    const calculateFaceLocation = (data) => {
        const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
        const image = document.getElementById('input-image');
        const width = Number(image.width);
        const height = Number(image.height);
        return {
            leftCol  : clarifaiFace.left_col * width,
            topRow   : clarifaiFace.top_row * height,
            rightCol : width - (clarifaiFace.right_col * width),
            bottomRow: height - (clarifaiFace.bottom_row * height),
        }
    }

    const displayFaceBox = async (box) => {
        await setBox(box);
    }

    const handleChange = ({target}) => {
        setInput(target.value);
    };

    const handleSubmit = async () => {
        setImageUrl(input);
        try {
            const result = await app.models.predict(Clarifai.FACE_DETECT_MODEL, imageUrl);
            await displayFaceBox(calculateFaceLocation(result));
        } catch (err) {
            console.log(err)
        }
    };

    return (
        <div className="App">
            <Particles className={'particles'} params={particlesOptions}/>
            <Navigation/>
            <Logo/>
            <Rank/>
            <ImageLinkForm handleChange={handleChange} handleSubmit={handleSubmit}/>
            <FaceRecognition box={box} imageUrl={imageUrl}/>
        </div>
    );
}

export default App;
