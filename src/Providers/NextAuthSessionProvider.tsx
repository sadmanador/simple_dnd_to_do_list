"use client"
import { SessionProvider } from "next-auth/react"
import type { SessionProviderProps } from "next-auth/react"

export default function NextAuthSessionProvider({children}: SessionProviderProps) {
  return (
    <SessionProvider  >
      {children}
    </SessionProvider>
  )
}