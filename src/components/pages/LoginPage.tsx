import { Formik, Field, Form, ErrorMessage } from "formik";
import { observer } from "mobx-react";
import "../styles/login.css";
import { useState } from "react";

interface RouterProps {
    history: string;
  }

type LoginToken = {
    token: string,
    is_logged_in: boolean

}
  
//   type Props = RouteComponentProps<RouterProps>;
  
  type State = {
    username: string,
    password: string,
    loading: boolean,
    message: string
  };
  
  

const LoginPage = () => {

    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    // const [is_disabled, setIsDisabled] = useState<boolean>(false)
    // const [loading, setLoading] = useState<boolean>(false)
    // const [message, setMessage] = useState<string>('')


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
                // setLoading(false)
                // setMessage(data)
                console.log(data)
            })
        // e.preventDefault();
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
                // disabled={true}
                // disabled
                >Login</button>
            </form>
            </div>
        </div>
    )
}

// export default observer(LoginPage);
export default LoginPage;