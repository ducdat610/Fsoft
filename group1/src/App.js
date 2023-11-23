import './App.css';
import Header from './components/Header';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Sign_In from './Screen/Sign_In';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { ToastContainer } from 'react-toastify';
import Sign_Up from './Screen/Sign_Up';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/sign_in' element={<Sign_In/>}></Route>
          <Route path='sign_up' element={<Sign_Up/>}></Route>
        </Routes>
        <ToastContainer/>
      </BrowserRouter>

    </div>
  );
}

export default App;
