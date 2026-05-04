import { BrowserRouter as Router, Route, Routes } from "react-router"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ToastContainer } from "react-toastify"
import { APP_BASE } from "./config"
import { AuthCtxProvider } from "@/context/Auth"
import 'react-toastify/dist/ReactToastify.css'

// Components
import Layout from "./components/layout/Layout"
import Login from "@/pages/Login"
import Support from "@/pages/Support"
import Create from "@/pages/Create"
import Roster from "./pages/Roster"
import Redirect from "@/pages/Redirect"
import Docs from "@/pages/Docs"

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthCtxProvider>
        <Router basename={APP_BASE}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route element={<Layout />}>
              <Route path="/support" element={<Support />} />
              <Route path="/create/:formtype" element={<Create />} />
              <Route path="/roster" element={<Roster />} />
              <Route path="/docs" element={<Docs />} />
              <Route path="/*" element={<Redirect />} />
            </Route>
          </Routes>
        </Router>
      </AuthCtxProvider>
      <ToastContainer />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App