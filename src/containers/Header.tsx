import SearchBar from '../components/SearchBar'
import UserInfo from '../components/UserInfo'
import artify from '../assets/artify.png'
import '../styles/header.css'

const Header = () => {
  return (
    <header className='header'>
        <div className='artify'>
          <img className='artifylogo' src={artify} alt="" />
            <h1 className='artifyname'>Artify</h1>
        </div>
        <div className='header-info'>
            <SearchBar />
            <UserInfo />
        </div>
    </header>
  )
}

export default Header