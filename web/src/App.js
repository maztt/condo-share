import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from './components/layout/Navbar.js'
import Message from "./components/layout/Message.js";
import Footer from './components/layout/Footer.js'
import Container from './components/layout/Container.js'

import Register from './components/pages/Auth/Register.js'
import Login from './components/pages/Auth/Login.js'
import Home from './components/pages/Home.js'
import Profile from './components/pages/User/Profile.js'
import MyTools from './components/pages/Tool/MyTools.js'
import AddTool from './components/pages/Tool/AddTool.js'
import EditTool from './components/pages/Tool/EditTool.js'
import MyTakings from "./components/pages/Tool/MyTakings.js";
import ToolDetails from "./components/pages/Tool/ToolDetails.js";

import { UserProvider } from './context/UserContext.js'

function App() {
  return (
    <Router>
      <UserProvider>
        <Navbar />
          <Message />
          <Container>
            <Routes>
              <Route path='/login' element={<Login />}/>
              <Route path='/register' element={<Register />}/>
              <Route path='/user/profile' element={<Profile />}/>
              <Route path='/tool/add' element={<AddTool />}/>
              <Route path='/tool/edit/:id' element={<EditTool />}/>
              <Route path='/tool/mytools' element={<MyTools />}/>
              <Route path='/tool/mytakings' element={<MyTakings />}/>
              <Route path='/tool/:id' element={<ToolDetails />}/>
              <Route path='/' element={<Home />}/>
            </Routes>
          </Container>
        <Footer />
      </UserProvider>
    </Router>
  );
}

export default App;
