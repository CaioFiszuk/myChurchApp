import { useEffect, useState } from "react";
import { api } from '../utils/api';
import { Routes, Route } from 'react-router-dom';
import  Header  from '../components/Header';
import  Main  from '../components/Main';
import  Dashboard  from '../components/Dashboard';

function App() {
    const [church, setChurch] = useState([]);
    const [announces, setAnnounces] = useState([]);
    const [members, setMembers] = useState([]);

    const getChurch = async ()=>{
     await api.getChurch()
     .then((data)=>{
     setChurch(data);
    })
    .catch((error) => console.error("Erro ao buscar a igreja:", error));
  }

  const getAnnounces = async ()=>{
     await api.getAnnounces()
    .then((data)=>{
     setAnnounces(data);
    })
    .catch((error) => console.error("Erro ao buscar os anúncios:", error));
  }

    const getMembers = async ()=>{
     await api.getMembers()
    .then((data)=>{
     setMembers(data);
    })
    .catch((error) => console.error("Erro ao buscar os membros:", error));
  }

  useEffect(()=>{
    getChurch();
    getAnnounces();
    getMembers();
  }, []);

  return (
    <div>
      <Routes>
        <Route 
          path='/'
          element={
            <>
              <Header church={church}/>
              <Main announces={announces} members={members}/>
            </>
          }
        />

       <Route 
          path='/admin'
          element={
            <Dashboard 
            church={church} 
            setChurch={setChurch}
            announces={announces}
            setAnnounces={setAnnounces}
            members={members}
            setMembers={setMembers}
          />}
        />

      </Routes>
    </div>
  )
}

export default App;