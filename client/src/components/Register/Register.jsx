import React, {useState} from 'react';

const Register = ({onRouteChange, loadUser}) => {
    const [user, setUser] = useState({name: '', email: '', password: ''})

    const handleChange = ({target}) => {
        const {name, value} = target;
        setUser({...user, [name]: value});
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        await fetch("http://localhost:5000/api/auth/register", {
            method : "post",
            headers: {"Content-Type": "application/json"},
            body   : JSON.stringify(user),
        })
            .then(res => res.json())
            .then(user => {
                if (user.id) {
                    loadUser(user.data);
                    onRouteChange('home');
                }
            })
    }

    return (
        <div className='sign-in'>
            <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                <main className="pa4 black-80">
                    <form className="measure" onSubmit={handleSubmit}>
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f1 fw4 ph0 mh0">Register</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f4" htmlFor="name">Name</label>
                                <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                       type="text" name="name" id="name" onChange={handleChange}/>
                            </div>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f4" htmlFor="email">Email</label>
                                <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                       type="email" name="email" id="email" onChange={handleChange}/>
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f4" htmlFor="password">Password</label>
                                <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                       type="password" name="password" id="password" onChange={handleChange}/>
                            </div>
                        </fieldset>
                        <div className="">
                            <button className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f4 dib"
                                    type="submit">
                                Register
                            </button>
                        </div>
                    </form>
                </main>
            </article>
        </div>
    );
};

export default Register;
