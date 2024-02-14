import { Fragment } from "react"
import { useRoutes } from "react-router-dom"
import { authProtectedRoutes, publicRoutes } from "./routes"

const App = () => {
  const content = useRoutes([...publicRoutes, ...authProtectedRoutes])

  return (
    <Fragment>
      {content}
      {/* <div className='bg-red-500 h-screen'>
      </div> */}
    </Fragment>
  )
}

export default App