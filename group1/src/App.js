import './App.css';
import Header from './components/Header';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Sign_In from './Screen/Sign_In';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { ToastContainer } from 'react-toastify';
import Sign_Up from './Screen/Sign_Up';
import Setting from './Screen/Setting';
import Profile from './Screen/Profile';
import TagDetail from './components/TagDetail';
import Tag from './components/Tags';
import ViewMyArticles from './components/ViewMyArticles';
import ViewMyFavoritedArticles from './components/ViewFavoritedArticles'
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/sign_in' element={<Sign_In/>}></Route>
          <Route path='sign_up' element={<Sign_Up/>}></Route>
          <Route path='setting' element={<Setting/>}></Route>
          <Route path='profile' element={<Profile/>}></Route>
          <Route path="/my_articles/:username" element={<ViewMyArticles />} /> 
          <Route path="/favorited_articles/:username" element={<ViewMyFavoritedArticles />} /> 
          <Route path='/tag' element={<Tag />} />
          <Route path='/tag/:tag' element={<TagDetail />} /> 
        </Routes>
        <ToastContainer/>
      </BrowserRouter>

    </div>
  );
}

export default App;
