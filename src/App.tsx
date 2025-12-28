import './index.css'
import { Fragment } from 'react/jsx-runtime'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Toaster } from 'sonner'
import PublicRoutes from './routes/public-routes'
import PrivateRoutes from './routes/private-routes'
import useLocalStorage from './hooks/useLocalStorage'

function App() {


  const { getTheme,} = useLocalStorage();

  if (getTheme() === "dark") {
    document.body.classList.add("dark");
  } else {
    document.body.classList.add("light");
  }





  return (
    <Fragment>
      <Toaster duration={3000} position='top-left' />
      <Routes>
        <Route path='/' element={<Navigate to={"/public/sign-in"} />} />
        <Route path='/public/*' element={<PublicRoutes />} />
        <Route path='/app/*' element={<PrivateRoutes />} />
      </Routes>
    </Fragment>
  )
}

export default App
