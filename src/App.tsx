import './index.css'
import { Fragment } from 'react/jsx-runtime'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './components/templates/home'
import SignIn from './pages/auth/sign-in'
import SignUp from './pages/auth/sign-up'
import SideBar from './components/templates/sidebar'
import { Toaster } from 'sonner'
import useHttp from './http/use-Http'
import RoundLoader from './components/molecules/loader'
import { useContext } from 'react'
import { ThemeProvider } from './state-management/context/ThemeContext'

function App() {

  const { configureInterceptor } = useHttp();
  const { loader } = useContext(ThemeProvider);

  configureInterceptor();
  return (
    <Fragment>
      {loader && <RoundLoader />}
      <Toaster duration={3000} position='top-left' />
      <Routes>
        <Route path='/' element={<Navigate to={"/sign-in"} />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/app/home/*' element={
          <SideBar>
            <Home />
          </SideBar>
        } />
      </Routes>
    </Fragment>
  )
}

export default App
