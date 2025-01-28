import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import { FileTypeProvider } from './context/FileTypeProvider'
import TextUploadSection from './components/TextUploadSection'

function App() {
  const [count, setCount] = useState(0)

  return (
    <FileTypeProvider>
      <Navbar />
      <TextUploadSection/>
    </FileTypeProvider>
  )
}

export default App