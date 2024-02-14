import React, { Fragment } from 'react'
import { Outlet } from 'react-router-dom'
// import styled from 'styled-components'
import Header from '../organisms/protected/header'
import SideBar from '../organisms/protected/sidebar'

const ProtectedLayout = () => {
  return (
    <Fragment>
      <Header />
      <SideBar />
      <div>
        <Outlet />
      </div>
    </Fragment>
  )
}

export default ProtectedLayout

// const StyledMainConent = styled.div`
// `