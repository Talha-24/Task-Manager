import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import AuthenticationContext from './state-management/context-api/authentication-context.tsx'
import HTTP_CONTEXT from './state-management/context-api/http-context.tsx'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <AuthenticationContext>
      <HTTP_CONTEXT>
        <App />
      </HTTP_CONTEXT>
    </AuthenticationContext>
  </BrowserRouter>
)
