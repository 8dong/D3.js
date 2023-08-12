import { FC, useCallback, useMemo } from 'react'
import { useRouter } from 'next/router'

import NavigationView from '@components/view-assets/layouts/NavigationView'

const NavigationContainer: FC = () => {
  const router = useRouter()

  const navItems: { name: string; pathname: string }[] = useMemo(
    () => [
      {
        name: 'Bar',
        pathname: '/bar-chart'
      }
    ],
    []
  )

  const handleClickNavItem = useCallback((pathname: string) => {
    router.push(pathname)
  }, [])

  return (
    <NavigationView
      navItems={navItems}
      currentPath={router.pathname}
      handleClickNavItem={handleClickNavItem}
    />
  )
}

export default NavigationContainer
