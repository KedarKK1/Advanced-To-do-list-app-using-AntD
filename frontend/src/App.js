// import FetchData from './components/FetchData';
// import "antd/dist/antd.css"; //important to import this line otherwise it will not show antd css
import "antd/dist/antd.min.css"; //important to import this line otherwise it will not show antd css
import HomePage from './pages/homePage/HomePage';
import Homepage2 from './pages/homePage/Homepage2';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import EditPage from './pages/editPage/EditPage';
// var moment = require('moment');

function App() {

return(
  <div>
    <Navbar />
    <Routes>
        <Route path="" exact element={ <HomePage /> } />
        <Route path="home" exact element={ <Homepage2 /> } />
        <Route path="editPage/:id" element={ <EditPage /> } />
    </Routes>
  </div>
);
}


export default App;
