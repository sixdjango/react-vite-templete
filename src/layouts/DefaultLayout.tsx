import React from 'react'
import { Outlet } from 'react-router'

export interface DefaultLayoutProps {
  children?: React.ReactNode
}

export default function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    <div>
      {children}
      <Outlet />
    </div>
  )
}
