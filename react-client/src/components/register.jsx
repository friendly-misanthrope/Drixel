import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'

const Register = (props) => {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const navigate = useNavigate()

  const changeHandler = (e) => {
    setUser(prevState => {return {...prevState, [e.target.name]: e.target.value}})
  }

  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  );
}

export default Register;
