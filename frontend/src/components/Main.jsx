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
    })
    .catch((error) => console.error("Erro ao buscar os anúncios:", error));
  }

  useEffect(()=>{
    getMembers();
    getAnnounces();
  }, []);

  return (
    <main>
        <div className="announces">
          {
            announces.map((announce)=>(
              <div className="announces-box">
                <img src={announce.art} className="announces-box__art" />
                <h2 className="announces-box__title" >{announce.title}</h2>
                <p className="announces-box__content" >{announce.content}</p>
              </div>
            ))
          }
        </div>

          <h3 className="birthdays">Aniversariantes do mês</h3>
          <ul className="members-list">
            {
            members.map((member)=>(
                <li>{member.memberName} - <span>{new Date(member.birthDate).toLocaleDateString('pt-BR')}</span></li>
            ))
            }
          </ul>
    </main>
  )
}

export default Main;