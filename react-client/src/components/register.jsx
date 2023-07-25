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

  const submitHandler = (e) => {
    e.preventDefault()

    axios.post(`https://localhost:8000/api/auth/register`, user, {
      withCredentials: true
    })
      .then((res) => {
        console.log(res.data)
        navigate('/dashboard')
      })
  }

  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  );
}

export default Register;
