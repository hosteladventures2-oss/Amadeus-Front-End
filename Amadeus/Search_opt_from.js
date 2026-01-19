import React, {useState, useEffect} from 'react'

function Search_opt_from({collection}) {

  const [results, setResults] = useState([]); // all the cities are stored here
  const [loading, setLoading] = useState(true); // loading boolean

  useEffect(()=>{
    
const handleSearch = async () => {
  try {

    let value = collection.to 

    if (!value || value.length < 1) {
      setResults([]);
      return; // returns if list of cities is 0
    }

    const res = await fetch(
      `https://amadeus-1-8gx8.onrender.com/api/cities?keyword=${encodeURIComponent(value)}`
      // link to the backend with API
    );

    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
      // this throws an error if connection is invalid
    }

    const data = await res.json();
    setResults(data); // the json data is stored in the results
    setLoading(false)

  } catch (error) {
    console.error("Fetch error:", error);
  }
};


     handleSearch()
  },[collection.from, collection.to])



  const go = ({from_city, city_to_iataCode})=>{

    collection.setTo_search(false)
     collection.setTo(from_city)
    collection.setTo_INIT(city_to_iataCode)

  }

 if (loading) return <div className="color-box"><p style={{padding:'20px', fontSize:'12px'}}>Loading Results...</p></div>;


  return (
    <div style={{height:'200px', width:'100%', overflow:'hidden', overflowY:'scroll'}}>
      {/**all the cities are displayed here */}
      {results.map(item => (
        <div style={{display:'flex', alignItems:'center'}} key={item.iataCode}>
             <div style={{padding:'20px', padding:'20px', fontSize:'12px', opacity:'0.5', width:'60%'}}>{item.name} ({item.iataCode}) – {item.country}</div>
            
             
             
             <div onClick={() => go({ from_city:item.name, city_to_iataCode:item.iataCode })} 
             style={{backgroundColor:'rgb(60, 255, 60)',  color:'white', fontSize:'9px', padding:'7px', cursor:'pointer', borderRadius:'10px'}}>Pick this?</div>

          
            
            
        </div>
      ))}
        
    </div>
  )
}

export default Search_opt_from
