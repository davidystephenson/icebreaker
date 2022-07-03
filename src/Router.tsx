import { Route, Routes } from 'react-router-dom'
import Game from './Game'
import Home from './Home'

export default function Router (): JSX.Element {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/game/:gameName' element={<Game />} />
    </Routes>
  )
}
