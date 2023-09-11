import App from "./App"
import { useNavigate } from "react-router-dom"
import { useState,useRef } from "react"
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
mapboxgl.accessToken = 'pk.eyJ1IjoibW9tb2tpbmcxMjM0NSIsImEiOiJjbG02OTV6MWEwZ3c3M3FtbXpuYmtheWw5In0.2_fhCgJS9c4FQHNk-9Q4cA';




function CreateQuiz(){
    const navigate = useNavigate()
    const [create, setCreate] = useState()
    const [question, setQuestion] = useState()
    const [answer, setAnswer] = useState()
    const [long, setLong] = useState(12)
    const [lat, setLat] = useState(57)
    const mapContainer = useRef(null);
    const mapRef=useRef(null)


    const url = 'https://fk7zu3f4gj.execute-api.eu-north-1.amazonaws.com/quiz'
    const token = localStorage.getItem('tokenId')
    const settings = {
        method: 'POST',
        headers: {Authorization: `Bearer ${token}`},
        body: JSON.stringify( {
            name: create,
        })
    }

    

    async function createQuiz(){
        console.log(token,create);
        const response = await fetch(url,settings)
        const data = await response.json()
        console.log(data)
    }

  
    async function postQuestion(){

        const settings = {
            method: 'POST',
            headers: {Authorization: `Bearer ${token}`},
            body: JSON.stringify({
              name: create,
              question: question ,
              answer: answer,
              location: {
                longitude: long,
                latitude: lat
              }
            })}
            console.log(settings);
            
        const response = await fetch( 'https://fk7zu3f4gj.execute-api.eu-north-1.amazonaws.com/quiz/question',settings)
        const data = await response.json()
        console.log(data);
    

        }
        const handleMapShow = async ()=>{

            if( !mapContainer.current ) return
  
  
            mapRef.current = new mapboxgl.Map({
              container: mapContainer.current,
              style: 'mapbox://styles/mapbox/streets-v12',
              center: [long, lat],
              zoom: 9
            });
            const map = mapRef.current
            function add_marker(event)  {
              const coordinates = event.lngLat;
              setLat(coordinates.lat)
              setLong(coordinates.lng)
              console.log('Lng:', coordinates.lng, 'Lat:', coordinates.lat);
              let Marker = new mapboxgl.Marker()
  
              Marker.setLngLat(coordinates).addTo(map).setPopup(new mapboxgl.Popup({offset:10}).setHTML(`<h2>${question} </h2><p>${answer}</p>`))
            }
            map.on('click', add_marker);
  
          }
       


    return(
        <div>
            <h1>Create Question</h1>
            <input type="text"  placeholder="Titel" onChange={(event)=>setCreate(event.target.value)}/>
            <br />
            <button onClick={()=>{createQuiz()}}>check</button>
            <br />
            <input type="text"  placeholder="Question" onChange={(event)=>{
                setQuestion(event.target.value)
            }}/>
            <br />
            <input type="text"  placeholder="Answer" onChange={(event)=>{
                setAnswer(event.target.value)
            }} />
            <br />
            <button onClick={handleMapShow}>Click me to pin i map</button>
            <div ref={mapContainer} className="map-container" />

        
    

            <button onClick={postQuestion}>publish</button>
            <button onClick={()=>{navigate('/')}}>Back</button>
        </div>
    )
}


export default CreateQuiz




//nämn quiz ett unikt namn  |  input fölt för namn och knapp som checkar om den är upptagen  (det gör du genom post request gläm inte att skicka Token )
//skapar fråga,svar, coordinater genom input fält sparar i usestate och sen en knapp där du skickar alla (post request, skicka token med) 
