import SearchBar from '../components/SearchBar'
import UserInfo from '../components/UserInfo'
import '../styles/header.css'

const Header = () => {
  return (
    <header className='header'>
        <div>
            <h1>Artify</h1>
        </div>
        <div className='header-info'>
            <SearchBar />
            <UserInfo />
        </div>
    </header>
  )
}

export default Header