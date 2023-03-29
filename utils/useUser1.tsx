/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-no-constructed-context-values */
import React, { useEffect, useState, createContext, useContext } from 'react'
import {
  useUser as useSupaUser,
  useSessionContext,
  User,
} from '@supabase/auth-helpers-react'
import { UserDetails } from '../types/types'

type UserContextType = {
  username(username: any): [any, any]
  full_name(full_name: any): [any, any]
  avatar_url(avatar_url: any): [any, any]
  id(arg0: string, id: any): { error: any } | PromiseLike<{ error: any }>
  accessToken: string | null
  user: User | null
  userDetails: UserDetails | null
  isLoading: boolean
  updateUserDetails: (newDetails: UserDetails) => void;
}

export const UserContext = createContext<UserContextType | undefined>(
  undefined,
)

export type Props = {
  [propName: string]: any
}

export const MyUserContextProvider = (props: Props) => {
  const {
    session,
    isLoading: isLoadingUser,
    supabaseClient: supabase,
  } = useSessionContext()
  const user = useSupaUser()
  const accessToken = session?.access_token ?? null
  const [isLoadingData, setIsloadingData] = useState(false)
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null)

  const updateUserDetails=( newDetails: UserDetails) => setUserDetails(newDetails)

  const getUserDetails = () => supabase.from('profiles').select('*').single()
  useEffect(() => {
    if (user && !isLoadingData && !userDetails) {
      setIsloadingData(true)
      Promise.allSettled([getUserDetails()]).then(
        (results) => {
          const userDetailsPromise = results[0]

          if (userDetailsPromise.status === 'fulfilled') { setUserDetails({...userDetailsPromise.value.data[0]}) }
            if(userDetailsPromise.value && userDetailsPromise.value.data.length>0) {
              setUserDetails(userDetailsPromise.value.data[0])
            } else {
              console.error("No user details found")
              setUserDetails(null)
            }
          setIsloadingData(false)
        },
      )
    } else if (!user && !isLoadingUser && !isLoadingData) {
      setUserDetails(null)
    }
  }, [user, isLoadingUser])

  const value = {
    accessToken,
    user,
    userDetails,
    isLoading: isLoadingUser || isLoadingData,
    updateUserDetails
  }

  return <UserContext.Provider value={value} {...props} />
}

export const useUser = () => {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUser must be used within a MyUserContextProvider.')
  }
  return context
}
