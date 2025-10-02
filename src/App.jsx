import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import Documents from './views/documents';
import Doc from './views/doc';

///Tar emot api
const API_URL = "https://jsramverk-editor-jahl24-bfeufbb0dwcfg6a6.northeurope-01.azurewebsites.net/";

function App() {


  return (
    <BrowserRouter basename="">
      <div className="App">
        <header>
          <h1>SSR Editor</h1>
        </header>

      <main className="main" id="main">

      <Routes>
      <Route path="/" element={<Documents apiUrl={API_URL} />} />


      <Route path="/create" element={<Doc apiUrl={API_URL} isNew={true} />} />
      <Route path="/:id" element={<Doc apiUrl={API_URL} isNew={false} />} />
      </Routes>

      </main>

    </div>
    </BrowserRouter>
  )
}

export default App
