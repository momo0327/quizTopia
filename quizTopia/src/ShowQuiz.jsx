import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import 'mapbox-gl/dist/mapbox-gl.css';


mapboxgl.accessToken = 'pk.eyJ1IjoibW9tb2tpbmcxMjM0NSIsImEiOiJjbG02OTV6MWEwZ3c3M3FtbXpuYmtheWw5In0.2_fhCgJS9c4FQHNk-9Q4cA';

function ShowQuiz(props){
    const mapContainer = useRef(null);
    const mapRef=useRef(null)
    const [lng, setLng] = useState(12);
    const [lat, setLat] = useState(57);
    const [zoom, setZoom] = useState(9);

    const handleShowMap = ()=>{
        if (mapRef.current || !mapContainer.current) return; // initialize map only once
        mapRef.current = new mapboxgl.Map({
          container: mapContainer.current,
          style: 'mapbox://styles/mapbox/streets-v12',
          center: [lng, lat],
          zoom: zoom
        });
        const map = mapRef.current
        props.question?.forEach((q)=>{
            console.log(q.location);
            let marker= new mapboxgl.Marker().setLngLat([Number(q.location.longitude),Number(q.location.latitude)]).addTo(map).setPopup(new mapboxgl.Popup({offset:10}).setHTML(`<h2>${q.question}</h2>
            <p>${q.answer} </p>`))



        })

    }



const indQuestion = props.question?.map((q)=>{
    return(
        <div>
            <h3>
                {q.question}----{q.answer}
                
            </h3>
            </div>
        
    )
})

    return(

        <div>
            <button onClick={handleShowMap}>Show Map</button>
            
                            <h2>{props.name}</h2>
                
                {indQuestion}
                <div ref={mapContainer} className="map-container" />

        </div>
    )

}


export default ShowQuiz

