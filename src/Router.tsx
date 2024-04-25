import { Route, Routes } from 'react-router-dom'
import RouterLayout from './common/RouterLayout'
import Home from './pages/Home'

function Router() {
  return (
    <Routes>
        <Route path='/' element={<RouterLayout/>}>
            <Route path='/' element={<Home/>}></Route>
        </Route>
    </Routes>
  )
}

export default Router