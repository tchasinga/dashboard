import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice.js'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { CircularProgress } from '@mui/material'

export default function SignIn() {
  const [formData, setFormData] = useState({})
  const { loading } = useSelector(state => state.user && state.user.user)
  const [showError, setShowError] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  const handleSubmit = async (e) => {
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
      if (!data.success) {
        dispatch(signInFailure())
        setShowError(true)
        return
      }
      dispatch(signInSuccess(data))
      setShowSuccess(true)
      setShowError(false)
      navigate('/dashboard')

    } catch (error) {
      setShowError(true)
      dispatch(signInFailure())
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="">
        <div className="flex ml-20 uppercase text-xl font-bold w-full">
          <h1 className="text-red-500">Sign in here</h1>
          <h1 className='text-sm'>ba</h1>
        </div>
        <TextField label="Set your email" required className="w-2/3" id="email" onChange={handleChange} variant='outlined' type='email' />
        <TextField label="Set your password" id="password" onChange={handleChange} helperText="Don't share your password" className="w-2/3" variant='outlined' type='password' />
        <Button type="submit" variant="contained" disabled={loading}>
          {loading ? (
            <div className="flex items-center justify-center gap-2">
              <span className="text-xs"><CircularProgress /></span>
              <p>Loading...</p>
            </div>
          ) : "Sign-In now"}
        </Button>
      </form>
      {showSuccess && (
        <h1>Welcom</h1>
      )}
      {showError && (
        <p>Please check your credentials.</p>
      )}
    </div>
  )
}
