import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { PropertyProvider } from './context/PropertyContext.jsx'
import { SEOProvider } from './context/SEOContext.jsx'
import { EnquiryProvider } from './context/EnquiryContext.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PropertyProvider>
      <SEOProvider>
        <EnquiryProvider>
          <App />
        </EnquiryProvider>
      </SEOProvider>
    </PropertyProvider>
  </React.StrictMode>,
)
