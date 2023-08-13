import { FC, ReactNode, useCallback, useMemo } from 'react'
import { useRouter } from 'next/router'

import NavigationView from '@components/view-assets/layouts/NavigationView'
import BarChartIcon from '@images/icons/BarChart'
import LineChartIcon from '@images/icons/LineChart'

const NavigationContainer: FC = () => {
  const router = useRouter()

  const navItems: { name: string; pathname: string; icon: ReactNode }[] = useMemo(
    () => [
      {
        name: 'Bar',
        pathname: '/bar-chart',
        icon: <BarChartIcon />
      },
      {
        name: 'Line',
        pathname: '/line-chart',
        icon: <LineChartIcon />
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
