import { useEffect, useState } from "react";
import { api } from '../utils/api';

function Main() {
  const [members, setMembers] = useState([]);
  const [announces, setAnnounces] = useState([]);

    const getMembers = async ()=>{
     await api.getMembers()
    .then((data)=>{
     setMembers(data);
    })
    .catch((error) => console.error("Erro ao buscar os membros:", error));
  }

    const getAnnounces = async ()=>{
     await api.getAnnounces()
    .then((data)=>{
     setAnnounces(data);
     console.log(data)
    })
    .catch((error) => console.error("Erro ao buscar os anúncios:", error));
  }

  useEffect(()=>{
    getMembers();
    getAnnounces();
  }, []);

  return (
    <main>
        {
          announces.map((announce)=>(
            <div>
              <h2>{announce.title}</h2>
              <p>{announce.content}</p>
            </div>
          ))
        }

          {
          members.map((member)=>(
            <div>
              <h3>{member.memberName}</h3>
            </div>
          ))
        }
    </main>
  )
}

export default Main;