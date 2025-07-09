import { useState } from "react";
import { api } from '../utils/api';
import PopUp from '../components/Popup';

function Dashboard({church, setChurch, announces, members}) {
  const [updateChurchModal, setUpdateChurchModal] = useState(false);
  const [updateChurchFormData, setUpdateChurchFormData] = useState({
    churchName: '',
    logo: '',
    image: '',
    pastor: '',
  });

  const openUpdateChurchModal = (church) => {
    setUpdateChurchFormData({
      churchName: church.churchName,
      logo: church.logo,
      image: church.image,
      pastor: church.pastor,
    });
    setUpdateChurchModal(true);
  }

  const closeUpdateChurchModal = () => {
      setUpdateChurchModal(false);
  }

  const handleUpdateChurchFormChange = (e) => {
      const { name, value } = e.target;
        setUpdateChurchFormData((prevData) => ({
        ...prevData,
        [name]: value
      }));
  };

  const handleUpdateChurch = async (e) => {
    e.preventDefault();

    try {
      await api.updateChurch(updateChurchFormData);
      const updatedChurch = await api.getChurch();
      setChurch(updatedChurch);
      closeUpdateChurchModal();
    } catch (error) {
      console.error("Erro ao atualizar a igreja:", error);
    }
  }

  return (
    <div>
       <div className="dashboard__buttons-box">
          <button className="dashboard__button create-button">Criar anúncio</button>
          <button className="dashboard__button create-button">Adicionar membro</button>
       </div>

       <div className="dashboard__box">
         <h2>{church.churchName}</h2>
         <img src={church.logo} className="dashboard__box__logo"/>
         <img src={church.image} className="dashboard__box__image"/>
         <p>{church.pastor}</p>
         <button className="dashboard__button edit-button" onClick={()=>openUpdateChurchModal(church)}>Editar</button>
       </div>

       <table className="dashboard__table">
           <thead>
            <tr className="dashboard__table__header">
              <th>Dia</th>
              <th>Título</th>
              <th>Arte</th>
              <th> </th>
            </tr>
           </thead>
           <tbody>
            {
              announces.map((announce)=>(
                <tr key={announce._id}>
                  <td className="dashboard__table-cell">{new Date(announce.announceDate).toLocaleDateString('pt-BR')}</td>
                  <td className="dashboard__table-cell">{announce.title}</td>
                  <td className="dashboard__table-cell">
                    <img src={announce.art} className="dashboard__table-cell-image"/>
                  </td>
                  <td><button className="dashboard__button edit-button">Editar</button></td>
                  <td><button className="dashboard__button delete-button">Deletar</button></td>
                </tr>
              ))
            }
           </tbody>
       </table>

       <table className="dashboard__table">
           <thead>
            <tr className="dashboard__table__header">
              <th>Nome</th>
              <th>Data de aniversário</th>
              <th> </th>
            </tr>
           </thead>
           <tbody>
            {
              members.map((member)=>(
                <tr key={member._id}>
                  <td className="dashboard__table-cell">{member.memberName}</td>
                  <td className="dashboard__table-cell">{new Date(member.birthDate).toLocaleDateString('pt-BR')}</td>
                  <td><button className="dashboard__button edit-button">Editar</button></td>
                  <td><button className="dashboard__button delete-button">Deletar</button></td>
                </tr>
              ))
            }
           </tbody>
       </table>

       <PopUp isOpen={updateChurchModal} onClose={closeUpdateChurchModal}>
          <form className='form' onSubmit={handleUpdateChurch}>
          <legend className='form__title'>Atualizar Igreja</legend>
          <input 
            type="text" 
            name="churchName" 
            placeholder='Nome da Igreja' 
            className='form__input'
            value={updateChurchFormData.churchName}
            onChange={handleUpdateChurchFormChange}
          />
          <input 
            type="text" 
            name="logo" 
            placeholder='Logotipo' 
            className='form__input'
            value={updateChurchFormData.logo}
            onChange={handleUpdateChurchFormChange}
          />
          <input 
            type="text" 
            name="image" 
            placeholder='Foto da Igreja' 
            className='form__input'
            value={updateChurchFormData.image}
            onChange={handleUpdateChurchFormChange}
          />
          <input 
            type="text" 
            name="pastor" 
            placeholder='Pastor' 
            className='form__input'
            value={updateChurchFormData.pastor}
            onChange={handleUpdateChurchFormChange}
          />

          <button 
            type='submit' 
            className='form__button'
          >
            Editar
          </button>
        </form>
       </PopUp>
    </div>
  )
}

export default Dashboard;