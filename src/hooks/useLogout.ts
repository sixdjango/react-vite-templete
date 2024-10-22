export const useLogout = () => {
  const [removeToken] = useUserStore((s) => [s.removeToken])

  const logout = () => {
    removeToken()
  }

  return { logout }
}
