import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { registerSW } from 'virtual:pwa-register'
import { BrowserRouter } from "react-router-dom";

registerSW({
  immediate: true,
  onOfflineReady() {
    console.log('PWA lista para uso offline')
  },
  onNeedRefresh() {
    console.log('Nueva versión disponible')
  },
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)
