import { useEffect, useState } from "react";
import { api } from '../utils/api';
import { Routes, Route } from 'react-router-dom';
import  Header  from '../components/Header';
import  Main  from '../components/Main';
import  Dashboard  from '../components/Dashboard';

function App() {
    const [church, setChurch] = useState([]);

    const getChurch = async ()=>{
     await api.getChurch()
     .then((data)=>{
     setChurch(data);
    })
    .catch((error) => console.error("Erro ao buscar a igreja:", error));
  }

  useEffect(()=>{
    getChurch();
  }, []);

  return (
    <div>
      <Routes>
        <Route 
          path='/'
          element={
            <>
              <Header church={church}/>
              <Main />
            </>
          }
        />

       <Route 
          path='/admin'
          element={<Dashboard church={church} setChurch={setChurch}/>}
        />

      </Routes>
    </div>
  )
}

export default App;