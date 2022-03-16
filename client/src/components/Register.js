import React from 'react'



function Register() {
  return (
    <div className='center'>
      <div className='homeClass'> <h3>Rejestracja</h3>
      <form>
        <div className='form-group'>
      <label>Login :</label>
      <input type="text" name="registerLogin" placeholder="Podaj login"></input>
      </div>
      <div className='form-group'>
      <label>Hasło :</label>
      <input type="password" name="registerPassword"  placeholder="Podaj hasło"></input>
      </div>
      <button type="submit" class="btn btn-primary">Zarejestruj</button>
      </form>
      </div>
    </div>
  )
}

export default Register