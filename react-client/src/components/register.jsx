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

  const [errors, setErrors] = useState({})

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
      .catch((err) => setErrors(err.response.data.error.errors))
  }

  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  );
}

export default Register;
