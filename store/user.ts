import { defineStore } from 'pinia'

interface State {
  user: UserInfo | null,
  authInfo: AuthInfo,
  loadedUserInfo: boolean
}

export const useUserStore = defineStore('user', {
  state: (): State => {
    return {
      loadedUserInfo: false,
      user: null,
      authInfo: {
        token: undefined,
        email: undefined
      }
    }
  },
  actions: {
    setUser(user: UserInfo) {
      this.user = user
      this.loadedUserInfo = true
    },
    setUserAuthorization(email: string, token: string) {
      this.authInfo.email = email;
      this.authInfo.token = token;
      this.loadedUserInfo = true;
    }
  },
  getters: {
    userName: (state) => state.user?.name || '',
    isLoaded: (state) => state.loadedUserInfo,
    email: (state) => state.authInfo.email,
  }
})

interface UserInfo {
  name: string,
  email: string
  id?: number,
}

interface AuthInfo {
  token: string | undefined,
  email: string | undefined
}