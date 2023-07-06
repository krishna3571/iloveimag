import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Mainpage from './Mainpage';
import Compress from './Compress';
import Resize from './Resize';
import Crop from './Crop';
import CONjpg from './ConJpg'
import Pngcon from './Pngcon'
import Editphoto from './Editphoto';
import Watermark from './Watermark';


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Mainpage />}></Route>
        <Route path="/com" element={<Compress />}></Route>
        <Route path="/res" element={<Resize />}></Route>
        <Route path="/crop" element={<Crop />}></Route>
        <Route path="/jpg" element={<CONjpg />}></Route>
        <Route path="/png" element={<Pngcon />}></Route>
        <Route path="/edit" element={<Editphoto />}></Route>
        <Route path="/water" element={<Watermark />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

