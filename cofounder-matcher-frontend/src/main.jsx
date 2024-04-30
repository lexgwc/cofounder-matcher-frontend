import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// radix themes 
import '@radix-ui/themes/styles.css'
import {Theme} from "@radix-ui/themes"


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Theme accentColor="ruby" grayColor="mauve" radius="large" scaling="95%">
      <App />
    </Theme>
  </React.StrictMode>,
)
