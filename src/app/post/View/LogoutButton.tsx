'use client'

import { useRouter } from 'next/navigation'
import { IconButton } from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout'
import { logout } from '../../login/actions'

export default function LogoutButton() {
  const router = useRouter()
  
  const handleClick = async () => {
    await logout()
    window.sessionStorage.clear()
    router.push('/login')
  }

  return (
    <IconButton onClick={handleClick} aria-label="logoutButton">
      <LogoutIcon />
    </IconButton>
  )
}