function Main({announces, members}) {

  return (
    <main>
        <div className="announces">
          {
            announces.map((announce)=>(
              <div className="announces-box">
                <img src={announce.art} className="announces-box__art" />
                <h2 className="announces-box__title" >{announce.title}</h2>
                <p className="announces-box__content" >{new Date(announce.announceDate).toLocaleDateString('pt-BR')}</p>
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