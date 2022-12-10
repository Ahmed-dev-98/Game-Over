import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import Carousel from 'react-bootstrap/Carousel';
import { Helmet } from 'react-helmet'


export default function Details() {
  let {id} = useParams()
  const [data, setData] = useState({})
  const [requirements, setRequirements] = useState([])
  const [screenShots, setScreenShots] = useState([])
  const [loader, setLoader] = useState(false)


  async function getDetails(id) {

    let{data} = await axios.get(`https://free-to-play-games-database.p.rapidapi.com/api/game` , {
      "params": {id: `${id}`},
      "headers": {
        'X-RapidAPI-Key':'b52128808dmsh5826403ec30ac21p1b9548jsnfca5769e0b68',
        'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
      },
    }
    )
        setData(data)
        setLoader(false)
let requirements = data.minimum_system_requirements
        setRequirements(requirements)
        let screenShots = data.screenshots
if (screenShots[0] !== "undefined") {
      setScreenShots(screenShots)  
      
      
      
      
    }
    else 
    {
    }

  }
  useEffect(() => {
    setLoader(true)
getDetails(id)

  }, [])
  
  return (
    <>
                <Helmet>
                <meta charSet="utf-8" />
                <title>{data.title}</title>
                <link rel="canonical" href="../../../public/tab logo.jpg" />
            </Helmet>

    <div className='container py-5'>

{loader === true?   
      <section className='section-loader d-flex  justify-content-center align-items-center  '>
                <span className="loader mx-auto "></span>

      </section>
  :       
<div className="row ">
<div className="col-md-4 mx-4">
  <img src={data.thumbnail} className="w-100" alt="" />
  <div className="d-flex  justify-content-between align-items-center mt-3 ">
    <p className='w-25 btn btn-dark me-3 mb-0 '>FREE</p>
    <a href={data.game_url} target="_blank" className=' btn btn-info w-75 ms-5 fw-semibold text-white' > PLAY NOW </a>
  </div>
</div>
<div className="col-md-7">
<h3 className='h6'>{data.title}</h3>

<p className='text-muted'>{data.description}</p>
<h4 className='mt-3'>Minimum System Requirements : </h4>
<div>
<h4>graphics : {requirements?<span className='text-muted fs-5'>{requirements.graphics}</span>:<span className='text-muted fs-5'>sorry No details avaliable at this moment </span>}  </h4>
<h4>memory : {requirements?<span className='text-muted fs-5'>{requirements.memory}</span>:<span className='text-muted fs-5'>sorry No details avaliable at this moment </span>}   </h4>
<h4>os : {requirements?<span className='text-muted fs-5'>{requirements.os}</span>:<span className='text-muted fs-5'>sorry No details avaliable at this moment </span>}  </h4>
<h4>processor : {requirements?<span className='text-muted fs-5'>{requirements.processor}</span>:<span className='text-muted fs-5'>sorry No details avaliable at this moment </span>}  </h4>
<h4>storage : {requirements?<span className='text-muted fs-5'>{requirements.storage}</span>:<span className='text-muted fs-5'>sorry No details avaliable at this moment </span>}  </h4>
</div>

<Carousel>

  {screenShots?screenShots.map((shot , index)=> <Carousel.Item key={index} className="py-5">
        <img
          className="d-block w-100 "
          src={shot.image}
          alt="First slide"
        />
      </Carousel.Item>
): " "}
    </Carousel>

    <div className="more-details">
      <h3 className='mb-3'>Additional Information :</h3>
    <div className="row">
    <div className="col-md-4">
      <div className='mb-4'>
      <h4>title</h4>
      <p> {data.title} </p>
      </div>

      <div>
      <h4>release date</h4>
      <p> {data.release_date} </p>
      </div>

    </div>
    <div className="col-md-4 ">
      <div>
    <h4>developer</h4>
      <p> {data.developer} </p>
      </div>

      <div>
      <h4>genre</h4>
      <p> {data.genre} </p>
      </div>

    </div>
    <div className="col-md-4 ">
      <div>
    <h4>publisher</h4>
      <p> {data.publisher} </p>
      </div>

      <div>
      <h4>platform</h4>
      <p> {data.platform} </p>
      </div>
    </div>
    </div>
    </div>



</div>

</div>
}


    </div>
    </>
  )
}
