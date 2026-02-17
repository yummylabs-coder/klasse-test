import { AdminConfigProvider } from './admin/AdminConfigContext'
import AdminPanel from './admin/AdminPanel'
import Signup from './pages/Signup'

function App() {
  return (
    <AdminConfigProvider>
      <Signup />
      <AdminPanel />
    </AdminConfigProvider>
  )
}

export default App
