import React, {useState} from 'react';
import Particles         from 'react-particles-js';
import './App.css';
import FaceRecognition   from "./components/FaceRecognition/FaceRecognition";
import ImageLinkForm     from "./components/ImageLinkForm/ImageLinkForm";
import Logo              from './components/Logo/Logo';
import Navigation        from './components/Navigation/Navigation';
import Rank              from "./components/Rank/Rank";
import Register          from "./components/Register/Register";
import SignIn            from "./components/SignIn/SignIn";
import particlesOptions  from './config/particlesConfig';

const App = () => {
    const [input, setInput] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [box, setBox] = useState({});
    const [route, setRoute] = useState('signin');
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [user, setUser] = useState({id: '', name: '', email: '', entries: 0, joined: ''})

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
            let result = await fetch('http://localhost:5000/api/user/imageUrl', {
                method : 'post',
                headers: {'Content-Type': 'application/json'},
                body   : JSON.stringify({input: input})
            }).then(response => response.json())
            if (result) {
                try {
                    await fetch('http://localhost:5000/api/user/image', {
                        method : 'put',
                        headers: {'Content-Type': 'application/json'},
                        body   : JSON.stringify({id: user.id})
                    })
                        .then(res => res.json())
                        .then(count => {
                            setUser({...user, entries: count});
                        })
                } catch (error) {
                    console.error(error);
                }
            }
            await displayFaceBox(calculateFaceLocation(result));
        } catch (err) {
            console.log(err)
        }
    };

    const handleRouteChange = (route) => {
        if (route === 'signout') {
            setInput('');
            setImageUrl('');
            setBox({});
            setRoute('signin');
            setUser({id: '', name: '', email: '', entries: 0, joined: ''});
            setIsSignedIn(false);
        } else if (route === 'home') {
            setIsSignedIn(true);
        }
        setRoute(route);
    }

    const loadUser = (data) => {
        setUser({
            id     : data.id,
            name   : data.name,
            email  : data.email,
            entries: data.entries,
            joined : data.joined
        })
    }
    return (
        <div className="App">
            <Particles className={'particles'} params={particlesOptions}/>
            <Navigation isSignedIn={isSignedIn} onRouteChange={handleRouteChange}/>
            {
                route === 'home' ? (
                    <div>
                        <Logo/>
                        <Rank name={user.name} entries={user.entries}/>
                        <ImageLinkForm handleChange={handleChange} handleSubmit={handleSubmit}/>
                        <FaceRecognition box={box} imageUrl={imageUrl}/>
                    </div>
                ) : (
                    route === 'signin'
                    ? <SignIn loadUser={loadUser} onRouteChange={handleRouteChange}/>
                    : <Register loadUser={loadUser} onRouteChange={handleRouteChange}/>
                )
            }

        </div>
    );
}

export default App;
