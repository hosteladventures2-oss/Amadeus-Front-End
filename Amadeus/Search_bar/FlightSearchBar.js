import React, { useState, useEffect } from "react";
import "./FlightSearchBar.css";
import Search_opt from "../Search_opt";
import Search_opt_from from "../Search_opt_from";
import Real_graph from "../Real_graph";

export default function FlightSearchBar({ onSearch }) {
  const [from, setFrom] = useState(""); // holds variable for 'From' input
  const [to, setTo] = useState(""); // holds variable for 'Where To' input
  const [Graph, setGraph] = useState(false); // Determines whether or not the graph should be visible
  const [from_INIT, setFrom_INIT] = useState(""); // Holds the initials of the city you want tot travel from
  const [to_INIT, setTo_INIT] = useState(""); // Holds the initials of the city you wan to travel to
  const [from_search, setFrom_search] = useState(false); // allows the drop down menu of the search list be visible
  const [to_search, setTo_search] = useState(false); // holds allows drop down menu of the search options of the city you want to travel to
  const [departure, setDeparture] = useState(""); // holds the depature date
  const [passengers, setPassengers] = useState(1); // holds number of passengers
  const [travelClass, setTravelClass] = useState("ECONOMY"); // holds travel class
  const [search_opt, setTsearch_opt] = useState(false);

  const collection = {from, to, departure, passengers, travelClass, search_opt, from_search, to_search, from_INIT, to_INIT, setGraph, setFrom_search, setTo_search,
  setTsearch_opt, setFrom, setTo, setDeparture, setPassengers, setTravelClass, setFrom_INIT, setTo_INIT}

  const swapLocations = () => {
    setFrom(to);
    setTo(from);
  };

  const handleSearch = () => {
    if (!from || !to || !departure) {
      alert("Please fill all required fields");
      return;
    }

   
     setGraph(true)
  };

  

  return (
    <div className="flight-bar">
      <h1>Search Any Destination you want</h1>
      {/* Trip info */}
      <div className="top-options">
        <span>One way</span>

        <select
          value={passengers}
          onChange={(e) => setPassengers(e.target.value)}
        >
          {[1, 2, 3, 4, 5].map((n) => (
            <option key={n} value={n}>
              {n} Passenger{n > 1 ? "s" : ""}
            </option>
          ))}
        </select>

        <select
          value={travelClass}
          onChange={(e) => setTravelClass(e.target.value)}
        >
          <option value="ECONOMY">Economy</option>
          <option value="PREMIUM_ECONOMY">Premium Economy</option>
          <option value="BUSINESS">Business</option>
          <option value="FIRST">First Class</option>
        </select>
      </div>

      {/* Main search */}
      <div className="search-row">
        <input
          type="text"
          placeholder="From"
          value={from}
          onChange={(e) => {
              setFrom(e.target.value);
              setFrom_search(true);
              setGraph(false)
          }}
        />

     

        <input
          type="text"
          placeholder="Where to?"
          value={to}
          onChange={(e) =>{ 
        setTo(e.target.value) 
        setTo_search(true);
        setGraph(false)
       }}
        />

        <input
          type="date"
          value={departure}
          onChange={(e) => setDeparture(e.target.value)}
        />

        <button className="search-btn" onClick={handleSearch}>
          {/* initiates the search**/}
          Explore
        </button>
      </div>
        
       <div style={{display:'flex'}}>
            {from !== '' && from_search?(<div><Search_opt collection={collection} /></div>):('')/* drop down menu for where you want to travel from**/}
            {to !== '' && to_search?(<div><Search_opt_from collection={collection} /></div>):('') /* drop down menu for where you want to travel to**/}

       </div>

       {Graph?(<div style={{height:'500px'}}><Real_graph collection={collection} /></div>):('') /* displays graph**/}
       <div style={{padding:'10px'}}>
        <a style={{fontSize:'12px', marginTop:'20px'}} href="red">Git Hub</a> <a style={{fontSize:'12px', marginTop:'20px'}} href="red">Demo Video</a>
       </div>
      
    </div>
  );
}
