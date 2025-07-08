import { useState } from "react";
import { api } from '../utils/api';
import PopUp from '../components/Popup';

function Dashboard({church, setChurch}) {
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
       <div className="dashboard__church-box">
         <h2>{church.churchName}</h2>
         <img src={church.logo} className="dashboard__church-box__logo"/>
         <img src={church.image} className="dashboard__church-box__image"/>
         <p>{church.pastor}</p>
         <button className="dashboard__church-box__edit-button" onClick={()=>openUpdateChurchModal(church)}>Editar</button>
       </div>

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