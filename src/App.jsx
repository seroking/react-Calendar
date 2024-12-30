import './App.css'
import Calendar from './components/Calendar'

import { Provider } from 'react-redux'
import store from './Store/store'
function App() {
  return (
    <>
      <Provider store={store}><Calendar/></Provider>
    </>
  )
}

export default App
