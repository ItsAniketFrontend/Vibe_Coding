import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { PropertyProvider } from './context/PropertyContext.jsx'
import { SEOProvider } from './context/SEOContext.jsx'
import { EnquiryProvider } from './context/EnquiryContext.jsx'
import { BlogProvider } from './context/BlogContext.jsx'
import { DynamicPageProvider } from './context/DynamicPageContext.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PropertyProvider>
      <DynamicPageProvider>
        <SEOProvider>
        <EnquiryProvider>
          <BlogProvider>
            <App />
          </BlogProvider>
        </EnquiryProvider>
      </SEOProvider>
      </DynamicPageProvider>
    </PropertyProvider>
  </React.StrictMode>,
)
