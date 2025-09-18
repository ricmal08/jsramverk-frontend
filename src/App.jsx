import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import Documents from './views/documents';
import Doc from './views/doc';

///Tar emot api
const API_URL = "http://localhost:3000";

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter basename="">
      <div className="App">
        <header>
          <h1>SSR Editor</h1>
        </header>

      <main className="main" id="main">
      <h2>Dokument</h2>
      <Routes>
      <Route path="/" element={<Documents apiUrl={API_URL} />} />


      <Route path="/create" element={<Doc apiUrl={API_URL} isNew={true} />} />
      </Routes>

        <h3><a href="#">Första dokumentets titel</a></h3>
        <h3><a href="#">En annan titel</a></h3>
      </main>

    </div>
    </BrowserRouter>
  )
}

export default App
