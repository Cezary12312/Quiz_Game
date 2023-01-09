import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './ViewComponents/Login/Login';
import Question from './ViewComponents/Quest/Quiz/Quiz';
import Result from './ViewComponents/Quest/Result/Result';
import Center from './LocalizationComponents/Center/Center'; 
import Layout from './Layout/Layout';
import Authenticate from './ViewComponents/Authenticate/Authenticate/Authenticate';

function App() {
    return (
      <div className='App'>
        <Center>
          <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route element={<Authenticate />} >
                <Route path="/" element={<Layout/>} />
                  <Route path="/question" element={<Question/>} />
                  <Route path="/result" element={<Result/>} />
                </Route>
            </Routes>
          </BrowserRouter>
        </Center>
      </div>
    );
}

export default App;