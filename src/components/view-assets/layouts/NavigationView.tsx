import { FC, ReactNode } from 'react'
import styled from '@emotion/styled'

interface IProps {
  navItems: {
    name: string
    pathname: string
    icon: ReactNode
  }[]
  currentPath: string
  handleClickNavItem: (url: string) => void
}

const NavigationView: FC<IProps> = ({ navItems, currentPath, handleClickNavItem }) => {
  return (
    <$navArea>
      <$navListArea>
        {navItems.map((navItem) => (
          <$navItemArea
            key={navItem.name}
            onClick={() => handleClickNavItem(navItem.pathname)}
            isActive={currentPath === navItem.pathname}
          >
            {navItem.icon}
            <$navItemName isActive={currentPath === navItem.pathname}>{navItem.name}</$navItemName>
          </$navItemArea>
        ))}
      </$navListArea>
    </$navArea>
  )
}

export default NavigationView

const $navArea = styled.nav`
  height: 100%;
`

const $navListArea = styled.ul`
  width: 100px;
  height: 100%;
  overflow: scroll;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const $navItemArea = styled.li<{ isActive: boolean }>`
  width: 64px;
  flex: 0 0 64px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;

  &:last-of-type {
    margin-bottom: 0;
  }

  & > svg {
    margin-bottom: 5px;
    transition: fill 0.3s ease-in-out;
  }

  ${(props) => (props.isActive ? activeListItemStyle : inActiveItemListStyle)}
`

const $navItemName = styled.span<{ isActive: boolean }>`
  width: 100%;
  padding: 0 5px;
  overflow: hidden;
  font-size: 14px;
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: ${(props) => (props.isActive ? '#fff' : '#A4AABB')};
  transition: color 0.5s ease-in-out;
`

const activeListItemStyle = `
  border: none;
  background-color: #253FEB;

  & > svg {
    fill: #fff;
    stroke: #A4AABB;
  }
`

const inActiveItemListStyle = `
  border: solid 1px #dfe4f0;
  background-color: #fff;
`
