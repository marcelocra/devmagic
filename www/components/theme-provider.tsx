'use client'

import { useEffect } from 'react'

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const getThemePreference = (): 'dark' | 'light' => {
      if (typeof localStorage !== 'undefined' && localStorage.getItem('theme')) {
        const stored = localStorage.getItem('theme')
        if (stored === 'dark' || stored === 'light') {
          return stored
        }
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }

    const theme = getThemePreference()

    // Remove both classes first
    document.documentElement.classList.remove('dark', 'light')
    // Add the current theme class
    document.documentElement.classList.add(theme)

    if (typeof localStorage !== 'undefined') {
      const observer = new MutationObserver(() => {
        const isDark = document.documentElement.classList.contains('dark')
        const theme = isDark ? 'dark' : 'light'
        localStorage.setItem('theme', theme)
      })
      observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })

      return () => observer.disconnect()
    }
  }, [])

  return <>{children}</>
}
