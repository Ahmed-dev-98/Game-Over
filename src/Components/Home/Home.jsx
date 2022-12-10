import React from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'
import { Helmet } from 'react-helmet';


export default function Home() {
  
  const [data, setData] = useState([])
  const [loader, setLoader] = useState(false)

  async function getPopularityGames() {
    

    let{data} = await axios.get(`https://free-to-play-games-database.p.rapidapi.com/api/games?sort-by=popularity` , {

      "headers": {
        'X-RapidAPI-Key':'b52128808dmsh5826403ec30ac21p1b9548jsnfca5769e0b68',
        'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
      },
    }
    )
    setLoader(false)
        setData(data)

  }

  useEffect(() => {
    setLoader(true)
getPopularityGames()
}, [  ])



  return ( 
    <>
    
    <Helmet>
                <meta charSet="utf-8" />
                <title>Game Over</title>
                <link rel="canonical" href="../../../public/tab logo.jpg" />
            </Helmet>

    <div className="home pt-4">
    {loader === true?   
      <section className='section-loader d-flex  justify-content-center align-items-center  '>
                <span className="loader mx-auto "></span>
      </section>
  :    
  <section>
      <div className=' py-3' >
        <div className="header-content text-center">
          <h2>Find & track the best<span  className=' mx-3 text-info'>free-to-play</span>games!</h2>
          <p className='text-muted'>Track what you've played and search for what to play next! Plus get free premium loot!</p>
        <Link to='/all'><button type="button" className="btn btn-secondary btn-sm">Browse Games</button></Link> 
        </div>
        </div>    
        <div className="container">
          <h4 className='text-muted'><i className="fa-solid fa-robot"></i> Personalized Recommendations</h4>
          <div className=" row ">
    {data.filter((all)=>all.thumbnail !==null).splice(0,3).map((game,index)=> 
    <div key={index} className=" col-md-4 p-2 my-3 column-body" >
      <Link className='all-card' to={`/details/${game.id}`}>
      <div className='p-3 card-container'>
<img src={game.thumbnail} className="card-img-top w-100 " alt="..."/>
<div className="card-body">
  <div className='d-flex justify-content-between align-content-center'>
  <h3 className='h4 title my-3'>{game.title}</h3>
  <span className='bg-info text-white text-center align-self-center px-2 rounded-1 m-0'>Free</span>
  </div>
</div>
</div>
</Link>
</div>
)}
    </div>
        </div>
</section>
}
</div>
    </>
  )
  
}