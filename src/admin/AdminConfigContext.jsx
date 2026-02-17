import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { DEFAULT_CONFIG } from './defaultConfig'

const STORAGE_KEY = 'klasse-admin-config'

const AdminConfigContext = createContext(null)

function deepMerge(defaults, overrides) {
  const result = { ...defaults }
  for (const key in overrides) {
    if (
      overrides[key] !== null &&
      typeof overrides[key] === 'object' &&
      !Array.isArray(overrides[key]) &&
      typeof defaults[key] === 'object' &&
      !Array.isArray(defaults[key])
    ) {
      result[key] = deepMerge(defaults[key], overrides[key])
    } else {
      result[key] = overrides[key]
    }
  }
  return result
}

function setNestedValue(obj, path, value) {
  const result = JSON.parse(JSON.stringify(obj))
  const keys = path.split('.')
  let current = result
  for (let i = 0; i < keys.length - 1; i++) {
    const key = isNaN(keys[i]) ? keys[i] : Number(keys[i])
    current = current[key]
  }
  const lastKey = isNaN(keys[keys.length - 1]) ? keys[keys.length - 1] : Number(keys[keys.length - 1])
  current[lastKey] = value
  return result
}

export function AdminConfigProvider({ children }) {
  const [config, setConfig] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored)
        return deepMerge(DEFAULT_CONFIG, parsed)
      }
    } catch {}
    return DEFAULT_CONFIG
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config))
  }, [config])

  // Dynamic font loading for brand and body fonts
  useEffect(() => {
    const builtIn = ['Plus Jakarta Sans', 'DM Sans', 'Inter']
    const fontsToLoad = [config.typography.brandFont, config.typography.bodyFont]
      .filter(f => f && !builtIn.includes(f))
      .filter((f, i, arr) => arr.indexOf(f) === i)

    document.querySelectorAll('[data-admin-font]').forEach(el => el.remove())
    fontsToLoad.forEach(font => {
      const link = document.createElement('link')
      link.setAttribute('data-admin-font', font)
      link.rel = 'stylesheet'
      link.href = `https://fonts.googleapis.com/css2?family=${font.replace(/ /g, '+')}:wght@400;500;600;700;800&display=swap`
      document.head.appendChild(link)
    })
  }, [config.typography.brandFont, config.typography.bodyFont])

  const updateConfig = useCallback((path, value) => {
    setConfig(prev => setNestedValue(prev, path, value))
  }, [])

  const resetConfig = useCallback(() => {
    setConfig(DEFAULT_CONFIG)
    localStorage.removeItem(STORAGE_KEY)
  }, [])

  const exportConfig = useCallback(() => {
    return JSON.stringify(config, null, 2)
  }, [config])

  const importConfig = useCallback((jsonString) => {
    try {
      const parsed = JSON.parse(jsonString)
      const merged = deepMerge(DEFAULT_CONFIG, parsed)
      setConfig(merged)
      return true
    } catch {
      return false
    }
  }, [])

  return (
    <AdminConfigContext.Provider value={{ config, updateConfig, resetConfig, exportConfig, importConfig }}>
      {children}
    </AdminConfigContext.Provider>
  )
}

export function useAdminConfig() {
  const ctx = useContext(AdminConfigContext)
  if (!ctx) throw new Error('useAdminConfig must be used within AdminConfigProvider')
  return ctx
}
