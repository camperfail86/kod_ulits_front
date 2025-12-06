import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import "./index.css"
import App from "./App"
import { AuthProvider } from "./auth/AuthContext"
import { LocalAuthClient } from "./auth/localAuthClient"
import { ApiAuthClient } from "./auth/apiAuthClient"

const useLocal =
  process.env.REACT_APP_USE_LOCAL_AUTH === "true" ||
  !process.env.REACT_APP_API_BASE_URL

const authClient = useLocal
  ? new LocalAuthClient()
  : new ApiAuthClient(process.env.REACT_APP_API_BASE_URL || "")

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
