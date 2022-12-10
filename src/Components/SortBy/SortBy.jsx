import React from 'react'
import axios from 'axios'
import { useParams , Link} from 'react-router-dom'
import { useEffect } from 'react'
import { useState } from 'react'
import { Helmet } from 'react-helmet'



export default function SortBy() {
  let {sortby} = useParams()


  const [data, setData] = useState([])
  const [loader, setLoader] = useState(false)

  async function getByCategory(sortby) {
    

    let{data} = await axios.get(`https://free-to-play-games-database.p.rapidapi.com/api/games?sort-by=${sortby}` , {

      "headers": {
        'X-RapidAPI-Key':'b52128808dmsh5826403ec30ac21p1b9548jsnfca5769e0b68',
        'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
      },
    }
    )
        setData(data)
        setLoader(false)

  }

  useEffect(() => {
    setLoader(true)
getByCategory(sortby)
}, [ sortby ])



  return (
    <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Sort By</title>
                <link rel="canonical" href="../../../public/tab logo.jpg" />
            </Helmet>

    <div className="container py-5">

{loader === true?   
      <section className='section-loader d-flex  justify-content-center align-items-center  '>
                <span className="loader mx-auto "></span>
      </section>
  : 
    <div className=" row ">
    {data.map((game,index)=> 
    <div key={index} className=" col-md-3 p-2 my-3 column-body" >
      <Link className='all-card' to={`/details/${game.id}`}>
      <div className='p-3 card-container'>
<img src={game.thumbnail} className="card-img-top w-100 " alt="..."/>

<div className="card-body">
  <div className='d-flex justify-content-between align-content-center'>
  <h3 className='h4 title my-3'>{game.title.slice(0 , 12)}..</h3>
  <span className='bg-info text-white text-center align-self-center px-2 rounded-1 m-0'>Free</span>

  </div>
      <div className="">
  <p className="card-text text-muted">{game.short_description.slice(0,45)}...</p>
  <div className="d-flex justify-content-between align-items-center">
  {game.platform === "PC (Windows)"? <p className='mb-0'> <i className="fa-brands fa-windows"></i></p>: <span> <i className="fa-brands fa-chrome"></i></span>} 
  <p className='game-type text-dark px-1 mb-0 rounded-2 fw-semibold '>{game.genre}</p>
  </div>
  </div>
</div>
</div>
</Link>

</div>
)}



    </div>
    
}

  </div>
  </>
  )
}
