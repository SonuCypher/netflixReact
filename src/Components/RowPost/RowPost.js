import React,{useEffect,useState} from 'react'
import YouTube from 'react-youtube'
import './RowPost.css'
import { imageUrl,APIKEY } from '../../constants/constants'
import axios from '../../axios'
function RowPost(props) {
    const [movies,setMovies] = useState([])
    const [urlId,setUrlId]= useState('')
    useEffect(() => {
        axios.get(props.url).then(response=>{
            // console.log(response.data.results)
            setMovies(response.data.results)
        }).catch(err => {
            alert('network Error')
        })
       
    }, [])

    const opts = {
        height: '390',
        width: '100%',
        playerVars: {
          // https://developers.google.com/youtube/player_parameters
          autoplay: 0,
        },
      };

      const movieClick = (id)=>{
            console.log(id)
            axios.get(`/movie/${id}/videos?api_key=${APIKEY}&language=en-US`).then(response=>{
                // console.log(response.data)
                 if(response.data.results.length!==0){
                     setUrlId(response.data.results[0])
                 }else{
                     console.log('Empty Array')
                 }
            })
      }

    return (
        <div className='row'>
            <h2>{props.title}</h2>
            <div className='posters'>
                {
                    movies.map((obj)=>{
                    return(
                    <img onClick={() => movieClick(obj.id)} className={props.isSmall ? 'smallPoster' : 'poster'} src={`${imageUrl+obj.backdrop_path}`} alt="poster" />
                    )    
                    })
                }
                
                           
            </div>
           { urlId && <YouTube opts={opts} videoId={urlId.key} /> } 
        </div>
    )
}

export default RowPost
