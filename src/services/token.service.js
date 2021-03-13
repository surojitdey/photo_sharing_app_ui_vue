const TokenService = {
  getAccessToken() {
    return localStorage.getItem("access_token")
  },

  saveAccessToken(accessToken) {
    localStorage.setItem("access_token", accessToken)
  },

  removeAccessToken() {
    localStorage.removeItem("access_token")
  },

  getRefreshToken() {
    return localStorage.getItem("refresh_token")
  },

  saveRefreshToken(refreshToken) {
    localStorage.setItem("refresh_token", refreshToken)
  },

  removeRefreshToken() {
    localStorage.removeItem("refresh_token")
  },

  isAdmin() {
    return localStorage.getItem("is_admin")
  },

  setAdmin(userIsAdmin) {
    localStorage.setItem("is_admin", userIsAdmin)
  },

  removeIsAdmin() {
    localStorage.removeItem("is_admin")
  }
};

export { TokenService }
