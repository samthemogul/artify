import SearchBar from '../components/SearchBar'
import UserInfo from '../components/UserInfo'
import artify from '../assets/artify.png'
import '../styles/header.css'
import { Link } from 'react-router-dom'
import { GiPencilBrush } from "react-icons/gi";



const Header = () => {
  const goToHome =() => {

  }
  return (
    <header className='header'>
        <Link to={'/'} className="artify">
        <GiPencilBrush className='artifylogo'/>
        <h1 className="artifyname">Artify</h1>
        </Link>
        <div className='header-info'>
            <SearchBar />
            <UserInfo />
        </div>
    </header>
  )
}

export default Header