import  Axios  from 'axios';
import React, {useEffect,useState} from 'react'
import {useNavigate } from 'react-router-dom'


function Login() {
  const navigate = useNavigate();
  const [loginLogin,getLogin]=useState("");
  const [loginPassword,getPassword]=useState("");
  const [loginStatus, setLoginStatus] = useState("");
  Axios.defaults.withCredentials=true
  const loginToAccount = ()=>
  {
    Axios.post("http://localhost:5000/api/loginToAccount",
    {
      loginLogin : loginLogin,
      loginPassword : loginPassword,
    }).then((res) => {
      if (res.data.message) {
        setLoginStatus(res.data.message);
      }
    })
  }

  useEffect(()=>
  {
    Axios.get("http://localhost:5000/api/loginToAccount").then((res)=>{
      if(res.data.logged== true)
      {
       //navigate("/account");
      }
      
    }
    )
  })
  return (
    <div className='center'>
    <div className='homeClass'> <h3>Logowanie</h3>
    <h4>{loginStatus}</h4>
      <div className='form-group'>
    <label>Login :</label>
    <input type="text" name="loginLogin" placeholder="Podaj login" onChange={(e=>{getLogin(e.target.value)})}>

    </input>
    </div>
    <div className='form-group'>
    <label>Hasło :</label>
    <input type="password" name="loginPassword"  placeholder="Podaj hasło" onChange={(e=>{getPassword(e.target.value)})} required>

    </input>
    </div>
    <button type="submit" class="btn btn-primary" onClick={loginToAccount}>Zaloguj</button>
    </div>
  </div>
  )
}

export default Login