import React from 'react'
import Header from '../containers/Header'
import arts from '../constants/arts'
import Art from '../containers/Art'
import '../styles/home.css'

const Home = () => {
  return (
    <div className='container'>
      <Header />
      <div className='arts-wrapper'>
      {
        arts.map(art => (
          <Art art={art} key={art.name} />
        ))
      }
      </div>
      
      </div>
  )
}

export default Home