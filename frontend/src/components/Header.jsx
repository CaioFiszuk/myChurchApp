import { useEffect, useState } from "react";
import { api } from '../utils/api';

function Header() {
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
    <header className="header">
        <h1>{church.churchName}</h1>
        <img src={church.logo} alt="church logo" />
    </header>
  )
}

export default Header;