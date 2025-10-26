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

// import { PostProvider } from './AppContext';
import { GoogleOAuthProvider } from '@react-oauth/google'
const ClientID = process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID

export const metadata = {
  title: 'CSE187 Assignment 3',
  icons: {
    icon: [
      { url: '/favicon.ico' },
    ]
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
          <GoogleOAuthProvider clientId={ClientID!}> 
            {children}
          </GoogleOAuthProvider>
      </body>
    </html>
  );
}

