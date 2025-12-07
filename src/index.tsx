import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import "./index.css"
import App from "./App"
import { AuthProvider } from "./auth/AuthContext"
import { ApiAuthClient } from "./auth/apiAuthClient"

const authClient = new ApiAuthClient("http://127.0.0.1:8080")

const container = document.getElementById("root") as HTMLElement
const root = ReactDOM.createRoot(container)

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider client={authClient}>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
)
