import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import AuthenticationContext from './state-management/context-api/authentication-context.tsx'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <AuthenticationContext>
      <App />
    </AuthenticationContext>
  </BrowserRouter>
)
