import React,{useState,useEffect} from 'react'
import Axios from "axios"


function Register() {
  const [registerLogin,setLogin]=useState("");
  const [registerPassword,setPassword]=useState("");
  const [registerPassword2,setPassword2]=useState("");
  const [registerStatus, setRegisterStatus] = useState("");


  const createAccount = ()=>
  {
    Axios.post("http://localhost:5000/api/createAccount",
    {
      registerLogin : registerLogin,
      registerPassword : registerPassword,
      registerPassword2 : registerPassword2,
    }).then((res) => {
      if (res.data.message) {
        setRegisterStatus(res.data.message);
      }
    })
  }

  return (
    <div className='center'>
      <div className='homeClass'> <h3>Rejestracja</h3>
        <h4>{registerStatus}</h4>
        <div className='form-group'>
          <label>Login :</label>
          <input type="text" name="registerLogin" placeholder="Podaj login" onChange={(e=>{setLogin(e.target.value)})}>

          </input>
        </div>
        <div className='form-group'>
          <label>Hasło :</label>
          <input type="password" name="registerPassword"  placeholder="Podaj hasło" onChange={(e=>{setPassword(e.target.value)})}>

          </input>
          <label>Powtórz hasło :</label>
          <input type="password" name="registerPassword2"  placeholder="Powtórz hasło" onChange={(e=>{setPassword2(e.target.value)})}>

          </input>
        </div>
        <button type="submit" class="btn btn-primary" onClick={createAccount}>Zarejestruj</button>
      </div>
    </div>
  )
}

export default Register