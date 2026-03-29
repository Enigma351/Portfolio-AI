import React from 'react'
import { useStore } from './store/useStore'
import BootScreen from './components/BootScreen'
import Desktop from './components/Desktop'

function App() {
  const isBooted = useStore(state => state.isBooted)

  return (
    <>
      {!isBooted && <BootScreen />}
      <Desktop />
    </>
  )
}

export default App
