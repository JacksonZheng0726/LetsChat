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

'use client'

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
import { login } from './actions'

export default function LoginView() {
  const [credentials, setCredentials] = useState({email: '', password: ''})
  const router = useRouter()

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {value, name} = event.currentTarget
    const u = credentials
    if (name == 'email') {
      u.email = value
    } else {
      u.password = value
    }
    setCredentials(u)
  }

  const handleClick = async () => {
    const authenticated = await login(credentials)
    console.log('[Login Result]', authenticated)
  
    if (authenticated) {
      window.sessionStorage.setItem('name', authenticated.name || 'undefined')
      router.push('/')
    } else {
      alert('Login failed!')
    }
  }  

  return (
    <Container
      maxWidth="xs"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mt: 4,
        }}
      >
        <Typography variant="h5">
          {'CSE187 Assignment 3'}
        </Typography>
        
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mt: 5,
          }}
        >
          <TextField
            name="email"
            type="email"
            placeholder="Email Address"
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
            onClick={handleClick}
          >
            Sign in
          </Button>
        </Box>
      </Box>
    </Container>
  )
}
