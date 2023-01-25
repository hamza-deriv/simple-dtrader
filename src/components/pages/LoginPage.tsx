// Not used (Template)

import "../styles/login.css";
import { useState } from "react";
  

const LoginPage = () => {

    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')


      const handleSubmit = () =>{
        fetch('https://reqres.in/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email ,
                password: password
            })
            })
            .then(response => {
                // setLoading(true)
                response.json()
            }
            )
            .then(data => {
                console.log(data)
            })
      }

    return (
        <div className="login">
            <div className="form">
            <form onSubmit={handleSubmit}>
                <span>Login</span>

                <input
                type="email"
                name="email"
                value= {email}
                onChange={(e)=> setEmail(e.target.value)}
                placeholder="Enter email id / username"
                className="form-control inp_text"
                id="email"
                />

                <input
                type="password"
                name="password"
                value={password}
                onChange={(e)=> setPassword(e.target.value)}
                placeholder="Enter password"
                className="form-control"
                />

                <button 
                type="submit"
                >Login</button>
            </form>
            </div>
        </div>
    )
}

export default LoginPage;