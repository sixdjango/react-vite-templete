import { AtButton } from '@yc-tech/react-component'
import { useNavigate } from 'react-router'
import { RoutePathEnum } from '~/constants/RoutePathEnum'

export function LoginPage() {
  const nav = useNavigate()
  const onLogin = () => {
    nav(RoutePathEnum.HOME)
  }
  return (
    <div className="w-full flex-col flex items-center justify-center">
      <h1>Login Page</h1>
      <AtButton onClick={onLogin}>login</AtButton>
    </div>
  )
}
