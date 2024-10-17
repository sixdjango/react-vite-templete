export interface RouteMeta {
  title?: string
  icon?: string
  hidden?: boolean
  auth?: boolean
  activeMenu?: string
  ignoreOrg?: boolean
  permission?: string[]
}

export interface RouteConfig {
  path?: string
  routeKey?: string
  element?: React.ReactNode
  children?: RouteConfig[]
  redirect?: string
  meta?: RouteMeta
}

export type GuardOptions = {
  next: () => Promise<any>
  from?: RouteConfig
  to: RouteConfig
  [key: string]: any
}
