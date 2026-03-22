import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { PropertyProvider } from './context/PropertyContext.jsx'
import { SEOProvider } from './context/SEOContext.jsx'
import { EnquiryProvider } from './context/EnquiryContext.jsx'
import { BlogProvider } from './context/BlogContext.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PropertyProvider>
      <SEOProvider>
        <EnquiryProvider>
          <BlogProvider>
            <App />
          </BlogProvider>
        </EnquiryProvider>
      </SEOProvider>
    </PropertyProvider>
  </React.StrictMode>,
)
