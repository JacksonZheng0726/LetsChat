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
import { AppProvider } from './AppContext';
import PostsView from '../app/post/View'

const Page: NextPage = () => {
  return <AppProvider>
    <PostsView />
  </AppProvider>;
}

export default Page
