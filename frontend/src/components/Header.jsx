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
    <header 
      className="header"
      style={{ backgroundImage: `url(${church.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
        <div className="header__overlay">
          <h1 className="header__name">{church.churchName}</h1>
          <img src={church.logo} alt="church logo" className="header__logo"/>
        </div>
    </header>
  )
}

export default Header;