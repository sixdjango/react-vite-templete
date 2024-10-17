import { Navigate, Route } from 'react-router-dom'
import { useGuards } from './guards'
import { AtSpinner } from '@yc-tech/react-component'
import { RouteConfig } from './type'
import { globSetting } from '~/configs/setting'
import DefaultLayout from '~/layouts/DefaultLayout'
import { RoutePathEnum } from '~/constants/RoutePathEnum'
import { HomePage } from '~/pages/home'
import { LoginPage } from '~/pages/login'

function RouteComponent({ ...props }: RouteConfig) {
  const { loading, allow, redirect } = useGuards({ to: props })

  if (loading) {
    return <AtSpinner />
  }

  if (redirect) {
    return <Navigate to={redirect} />
  }

  if (props.redirect) {
    return <Navigate to={props.redirect} replace />
  }

  if (!allow) {
    return <div>Not allowed</div>
  }
  return props.element
}

export function BaseRoute({ ...props }: RouteConfig) {
  return <Route element={<RouteComponent {...props} />} path={props.path} />
}

export const staticRouteConfigList: RouteConfig[] = [
  {
    path: globSetting.publicPath,
    element: <DefaultLayout />,
    routeKey: 'default-layout',
    children: [
      {
        path: globSetting.publicPath,
        routeKey: 'home-page-redirect',
        redirect: RoutePathEnum.HOME
      },
      {
        path: RoutePathEnum.HOME,
        element: <HomePage />,
        routeKey: 'home-page',
        meta: {
          auth: true
        }
      }
    ]
  },
  {
    path: RoutePathEnum.LOGIN,
    routeKey: 'login-page',
    element: <LoginPage />
  }
]

function GenerateRoutes(routes: RouteConfig[]): JSX.Element[] {
  return routes.map((route) => {
    return (
      <Route key={route.path} element={<RouteComponent {...route} />} path={route.path}>
        {!!route.children && GenerateRoutes(route.children)}
      </Route>
    )
  })
}

export const staticRoutes = GenerateRoutes(staticRouteConfigList)
