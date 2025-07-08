function Header({church}) {

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