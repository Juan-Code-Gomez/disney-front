import { Route, Routes } from 'react-router-dom'
import RouterLayout from './common/RouterLayout'
import Home from './pages/Home'
import Character from './pages/character/Character'

function Router() {
  return (
    <Routes>
        <Route path='/' element={<RouterLayout/>}>
            <Route path='/' element={<Home/>}></Route>
            <Route path='/character' element={<Character/>}></Route>
        </Route>
    </Routes>
  )
}

export default Router