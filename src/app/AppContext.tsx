'use client';
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getPost } from '../app/post/actions'
import { getPotentialFriend} from '../app/potentialFriend/actions'
import type { Post } from '../post/index';
import type { member } from '../friend/index';
// import type { member } from '../friend/index';

// import { getPotentialFriend } from '../app/potentialFriend/actions'
/* reference: https://codedamn.com/news/reactjs/usestate-hook-typescript
https://stackoverflow.com/questions/70322174/typescript-function-with-generic-type-in-usestate-allow-nullable */
interface AppContextType {
  posts: Post[] | null;
  inputPost: () => void;
  potentialFriend: member[] | null;
  potentialFriendLoad: () => void;
}
/* reference: https://react.dev/reference/react/useCallback */
const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  /* reference: https://devtrium.com/posts/react-typescript-using-generics-in-react */
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [potentialFriend, setpotentialFriend] = useState<member[] | null>(null);

  const loadPosts = useCallback(async () => {
    const result = await getPost(1);
    if (result) {
      setPosts(result);
    }
  }, []);

  const potentialFriendLoad = useCallback(async () => {
    const result = await getPotentialFriend();
    if (result) {
      setpotentialFriend(result as unknown as member[]);
    }
  }, []);

  useEffect(() => {
    loadPosts();
    potentialFriendLoad();
  }, [loadPosts, potentialFriendLoad]);

  const inputPost = () => {
    loadPosts();
  };


  return (
    <AppContext.Provider value={{ posts, inputPost, potentialFriend,potentialFriendLoad }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('context usage issue');
  }
  return context;
}

