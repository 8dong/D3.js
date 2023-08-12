import styled from '@emotion/styled'
import { FC, ReactNode } from 'react'

import NavigationContainer from '@components/containers/layouts/NavigationContainer'

interface IProps {
  children: ReactNode
}

const PageLayoutView: FC<IProps> = ({ children }) => {
  return (
    <$pageLayoutArea>
      <NavigationContainer />
      <$mainArea>{children}</$mainArea>
    </$pageLayoutArea>
  )
}

export default PageLayoutView

const $pageLayoutArea = styled.div`
  display: flex;
  height: calc(100vh - 160px);
  margin: 80px 50px 80px 0;
`

const $mainArea = styled.main`
  width: 100%;
  height: 100%;
  padding: 20px;
  border: solid 1px #eef0f5;
  border-radius: 20px;
  overflow: hidden;
  background-color: #f6f8fa;
`
