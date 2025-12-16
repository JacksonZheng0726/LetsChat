/*
#######################################################################
#
# Copyright (C) 2025 David C. Harrison. All right reserved.
#
# You may not use, distribute, publish, or modify this code without
# the express written permission of the copyright holder.
#
#######################################################################
*/

'use client';

import React from 'react'
import { useState,ChangeEvent } from 'react'
import { useRouter } from 'next/navigation'
import { 
  Container, 
  Typography, 
  Box, 
  Button, 
  TextField
} from '@mui/material'
import { login, signUp, Googlelogin} from './actions'
import { GoogleLogin, CredentialResponse } from '@react-oauth/google'
// import {jwtDecode} from 'jwt-decode'
// import { Gradient } from '@mui/icons-material'

export default function LoginView() {
  const [credentials, setCredentials] = useState({email: '', password: '', name: ''})
  const [IssignUp, setsignUp] = useState(false)
  const router = useRouter()

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {value, name} = event.currentTarget
    const u = credentials
    if (name == 'email') {
      u.email = value
    } else if (name == 'password') {
      u.password = value
    } else {
      u.name = value
    }
    setCredentials(u)
  }

  const handleLoginin = async () => {
    const authenticated = await login(credentials)
    console.log('[Login Result]', authenticated)
  
    if (authenticated) {
      window.sessionStorage.setItem('name', authenticated.name || 'undefined')
      router.push('/')
    } else {
      alert('Login failed!')
    }
  }
  const handleSignUp = async () => {
    const createAccount = await signUp(credentials)
    if (!createAccount) {
      alert('signUp failed!')
    } else {
      alert('signUp Success!')
    }
  }
  const handleGoogleSuccess = async (credentialResponse: CredentialResponse) => {
    // console.log('Google Login Success:', jwtDecode(credentialResponse.credential!))
    if (!credentialResponse.credential) {
      return null
    }
    const result = await Googlelogin(credentialResponse.credential)
    if (result) {
      window.sessionStorage.setItem('name', result.name)
      window.sessionStorage.setItem('email', result.email)
      router.push('/')
    } else {
      alert('google login failed!')
    }
  }


  return (
    <Box
      sx={{
        minHeight:"100vh",
        background: "linear-gradient(to bottom, #E6D5F5, mediumslateblue)",
        display:'flex',
        alignItems:'center',
        justifyContent:'center'
      }}
    >
      <Container
        maxWidth="xs"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor:'whitesmoke',
          borderRadius: 2,
          padding:2
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            // alignItems: 'center',
            mt: 4,
          }}
        >
          <Typography variant="h5">
            {'Welcome to LetsChat'}
          </Typography>
          <>
            <GoogleLogin 
            onSuccess={handleGoogleSuccess}
            useOneTap={false} 
            auto_select={false}
            />
          </>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'flex-start',
              mt: 5,
              gap: 10
            }}
          >
            <Button
              variant={!IssignUp ? "contained": "outlined"}
              onClick={() => setsignUp(false)}
              aria-label="sign in Switcher"
              sx={{
                backgroundColor: !IssignUp ? 'MediumPurple' : 'transparent', 
                color: !IssignUp ? 'white' : 'MediumPurple',
                borderColor: 'MediumPurple',
              }}
            >
              Sign in
            </Button>
            <Button
              variant={IssignUp ? "contained": "outlined"}
              onClick={() => setsignUp(true)}
               aria-label="sign up Switcher"
              sx={{
                backgroundColor: !IssignUp ? 'transparent': 'MediumPurple', 
                color: !IssignUp ?  'MediumPurple': 'white',
                borderColor: 'MediumPurple',
              }}
            >
              Sign up
            </Button>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              mt: 5,
              gap: 4
            }}
          >
          {IssignUp && (
            <TextField
              name="name"
              type="userName"
              placeholder="UserName"
              onChange={handleInputChange}
              fullWidth
              required
            />
          )}
            <TextField
              name="email"
              type="email"
              placeholder="Email Address"
              onChange={handleInputChange}
              fullWidth
              required
            />
            <TextField
              name="password"
              type="password"
              placeholder="Password"
              onChange={handleInputChange}
              fullWidth
              required
            />
          </Box>
          
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              mt: 5,
            }}
          >
            <Button
              variant="contained"
              onClick={IssignUp ? handleSignUp: handleLoginin}
              aria-label= {IssignUp? "sign up button": "sign in button"}
              // sx={{
              //   backgroundColor: !IssignUp ? 'transparent': 'MediumPurple', 
              //   color: !IssignUp ?  'MediumPurple': 'white',
              //   borderColor: 'MediumPurple',
              // }}
            >
              {IssignUp ? 'Sign Up' : 'Sign In'}
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}
