import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { signInStart, singInSuccess, signInFailure } from '../redux/user/userSlice.js'

export default function SignIn() {
  const [formData, setFormData] = useState({})
  const { loading } = useSelector(state => state.user && state.user.user)
  const [showError, setShowError] = useState(false); // New state for error popup
  const [showSuccess, setShowSuccess] = useState(false); // New state for success popup
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  const handlerSubmit = async (e) => {
    e.preventDefault()
    try {
      dispatch(signInStart())

      const res = await fetch('https://blogs-sharing-ideas-api.onrender.com/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      const data = await res.json()
      if (data.success === false) {
        dispatch(signInFailure(setShowError(true)))
        return
      }
      dispatch(singInSuccess(data))
      setShowSuccess(true);
      setShowError(false); 
      navigate('/dashboard')

    } catch (error) {
      setShowError(true); // Show the Error component
      dispatch(signInFailure(setShowError(true)))
    }
  }
  return (
    <div>SignIn</div>
  )
}
