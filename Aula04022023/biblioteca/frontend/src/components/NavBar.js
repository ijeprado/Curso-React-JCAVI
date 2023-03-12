import React, { useCallback, useEffect, useState } from "react"
import styled from "styled-components"
import BurguerButton from "./BurguerButton"

function NavBar() {
  const handleKeyPress = useCallback((event) => {
    if ((event.key === 'p') || (event.key === 'P')) {
      window.location = '/'
    }
    else if ((event.key === 'L') || (event.key === 'l')) {
      window.location = '/listagens'
    }
    else if ((event.key === 'c') || (event.key === 'C')) {
      window.location = '/cadastros'
    }
    else if ((event.key === 'f') || (event.key === 'F')) {
      window.location = '/faturamento'
    }
  }, [])

  const [mostreMenu, setMostreMenu] = useState(false)

  useEffect(() => {
    if (sessionStorage.getItem('menuExpandido')) {
      setMostreMenu(true)
      document.addEventListener('keydown', handleKeyPress)
    }
    else {
      setMostreMenu(false)
      document.removeEventListener('keydown', handleKeyPress)
    }
  }, [handleKeyPress])
  
  const handleClick = () => {
    setMostreMenu(!mostreMenu)
    if (!mostreMenu) {
      sessionStorage.setItem('menuExpandido', null)
    }
    else {
      sessionStorage.setItem('menuExpandido', true)
    }
  }

  return (
    <>
      <NavContainer>
        <h2>
          Locação de <span>Livros</span>
        </h2>
        <div className={`links ${mostreMenu ? 'active' : ''}`}>
          <a href="/"><span style={{ "text-decoration": "underline"}}>P</span>ágina Inicial</a>
          <a href="/listagens"><span style={{ "text-decoration": "underline"}}>L</span>istagens</a>
          <a href="/cadastros"><span style={{ "text-decoration": "underline"}}>C</span>adastros</a>
          <a href="/historico"><span style={{ "text-decoration": "underline"}}>H</span>istórico</a>
          <a href="/faturamento"><span style={{ "text-decoration": "underline"}}>F</span>aturamento</a>
        </div>
        <div className="burguer">
          <BurguerButton mostreMenu={mostreMenu} handleClick={handleClick}/>
        </div>
      </NavContainer>                        
    </>    
  )
}

export default NavBar

const NavContainer = styled.nav`
  h2{
    color: white;
    font-weight: 350;
    span{
      font-weight: bold;
    }
  }
  background: linear-gradient(45deg, rgb(156, 14, 156), midnightblue);
  display: flex;
  align-items: center;
  justify-content: space-between;
  a{
    color: white;
    text-decoration: none;
    margin-right: 1rem;
  }
  .links{
    width: 50%;
    display: block;
    position: absolute;
    margin-left: auto;
    margin-right: auto;
    top: -300px;
    left: 80;
    right: 0;
    text-align: center;
    a{
      font-size: 2rem;
      margin-top: 1rem;
      color: white;
    }
  }
  .links.active{
    position: absolute;
    top: -700px;
    left: -20px;
    right: 0;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
    a{
      color: white;
      font-size: 2rem;
      display: block;
    }
    @media(min-width: 768px){
      position: initial;
      margin: 0;
      a{
        font-size: 1rem;
        color: white;
        display: inline;
      }
      display: block;
    }
  }
`
