import { useState } from "react";
import { api } from '../utils/api';
import PopUp from '../components/Popup';
import Form from "./Form";

function Dashboard({church, setChurch, announces, setAnnounces, members, setMembers}) {
  const [createMemberModal, setCreateMemberModal] = useState(false);
  const [createAnnounceModal, setCreateAnnounceModal] = useState(false);
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

  const openCreateMemberModal = () => {
    setCreateMemberModal(true);
  }

  const closeCreateMemberModal = () => {
    setCreateMemberModal(false);
  }

  const openCreateAnnounceModal = () => {
    setCreateAnnounceModal(true);
  }

  const closeCreateAnnounceModal = () => {
    setCreateAnnounceModal(false);
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

  const handleCreateMember = async (data) => {
    try {
    const payload = {
      memberName: data.memberName,
      birthDate: data.birthDate,
      church: church._id 
    };

    const response = await api.createMember(payload);

    setMembers((prev) => [...prev, response.data]);

    closeCreateMemberModal();
  } catch (error) {
    console.error("Erro ao criar membro:", error);
  }
  };

  const handleCreateAnnounce = async (data) => {
    try {
      const payload = {
        title: data.title,
        announceDate: data.announceDate,
        art: data.art,
        church: church._id 
      }

      const response = await api.createAnnounce(payload);
      setAnnounces((prev)=>[...prev, response.data]);

      closeCreateAnnounceModal();
    } catch(error) {
       console.error("Erro ao criar um anúncio:", error);
    }
  }

  return (
    <div>
       <div className="dashboard__buttons-box">
          <button 
            className="dashboard__button create-button"
            onClick={openCreateAnnounceModal}
          >
            Criar anúncio
          </button>
          <button 
            className="dashboard__button create-button"
            onClick={openCreateMemberModal}
          >
            Adicionar membro
          </button>
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
        <Form 
          submission={handleUpdateChurch} 
          formLegend={'Atualizar Igreja'}
          buttonName={'Editar'}
        >
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
        </Form>
       </PopUp>

       <PopUp isOpen={createMemberModal} onClose={closeCreateMemberModal}> 
         <Form submission={handleCreateMember} formLegend={'Adicionar Membro'} buttonName={'Adicionar'}>
          <input 
            type="text" 
            name="memberName" 
            placeholder='Nome do Membro' 
            className='form__input'
          />
          <input 
            type="date" 
            name="birthDate" 
            placeholder='Data de aniversário' 
            className='form__input'
          />
         </Form>
       </PopUp>

        <PopUp isOpen={createAnnounceModal} onClose={closeCreateAnnounceModal}> 
         <Form submission={handleCreateAnnounce} formLegend={'Adicionar Anúncio'} buttonName={'Adicionar'}>
          <input 
            type="text" 
            name="title" 
            placeholder='Título do anúncio' 
            className='form__input'
          />
          <input 
            type="date" 
            name="announceDate" 
            placeholder='Data do evento' 
            className='form__input'
          />

          <input 
            type="text" 
            name="art" 
            placeholder='Arte' 
            className='form__input'
          />
         </Form>
       </PopUp>
    </div>
  )
}

export default Dashboard;