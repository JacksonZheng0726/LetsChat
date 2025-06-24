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

import type { NextPage } from 'next'

import MemberView from './View'
import { AppProvider } from '../AppContext';

const Page: NextPage = () => {
  return (
    <AppProvider>
      <MemberView />
    </AppProvider>
  )
}

export default Page
