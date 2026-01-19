import React, { useEffect, useState } from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faRectangleXmark, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import Graph from "./Graph";

function Real_graph({collection}) {
    const [chartData, setChartData] = useState([]); // all flight data are stored here
    const [loading, setLoading] = useState(true);

    const close = () =>{
        collection.setGraph(false)
    }

     
    
      //const selectedDate = collection.departure;
    
    useEffect(() => {
// all the data from the search results are fetched here
  let intervalId;
  async function fetchFiveDays() {
    if (!collection?.from_INIT || !collection?.to_INIT || !collection?.departure)
      return; // if no data is fetched, we return

    const dates = []; 

    for (let i = 0; i < 5; i++) {
      const d = new Date(collection.departure);
      d.setDate(d.getDate() + i);
      dates.push(d.toISOString().split("T")[0]);
    }

    const promises = dates.map((date) =>
      fetch(
        `https://amadeus-1-8gx8.onrender.com/flight-search?originCode=${collection.from_INIT}&destinationCode=${collection.to_INIT}&dateOfDeparture=${date}` // we fetch the flight info here
      ).then((res) => res.json())
    );

    const results = await Promise.all(promises);

    const transformed = results.map((result, idx) => {
      const offers = result?.data || [];

      if (!offers.length) {
        return {
          date: dates[idx],
          price: 0,
          airline: "No flights",
          departureTime: "—",
        };
      } // here if the list of objects is zero, we set the set the iformation in the hover div to "no flights" and so on

      const cheapest = offers.reduce((a, b) =>
        parseFloat(a.price.total) < parseFloat(b.price.total) ? a : b
      ); // here we get the cheapest flight

      const airlineCode = cheapest.validatingAirlineCodes[0];
      const airline =
        result?.dictionaries?.carriers?.[airlineCode] || airlineCode; // we get the name of the airline

      const departureAt =
        cheapest.itineraries[0].segments[0].departure.at; // the time the jet takes off

      const departureTime = new Date(departureAt).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      }); // we turn the date to something like '10:30AM'

      return {
        // information meant for the hover div
        date: dates[idx], // future dated of the depature
        price: parseFloat(cheapest.price.total), // price per day
        airline, // name of airline
        departureTime, // time jet takes off
      }; 
    });

    setChartData(transformed); // set all the fetched data here
    setLoading(false); // we set the loading to false (loading div that changes color)
  }

  fetchFiveDays();

    // run every 1 second to make it live
  intervalId = setInterval(fetchFiveDays, 1000);

  // cleanup to avoid memory leaks
  return () => clearInterval(intervalId);
}, [collection]);

  return (
    <div style={{height:'100%', backgroundColor:'white'}}>
        <FontAwesomeIcon onClick={close} style={{color:'rgba(171, 171, 171, 1)', fontSize:'20px', cursor: 'pointer', padding:'20px'}} icon={faRectangleXmark} />
        <div style={{display:'flex', justifyContent:'center', alignItems:'center', gap:'5px'}}>
             <FontAwesomeIcon style={{fontSize:'10px'}} icon={faLocationDot} /> 
             <div className="to_fro_TT">{collection.from} - {collection.to}</div> 
        </div>
        <div className="pass_det_flex">
            <div className="pass_det">Occupants: {collection.passengers} </div>
            <div className="pass_det">Class: {collection.travelClass} </div>
            <div className="pass_det">Depature Date: {collection.departure}</div>
        </div>
        {loading?(<div className="color-box">{/* loading div that changes color */}</div>):(<div className="graph_cont"><Graph chartData={chartData}/></div>)}
        
    </div>
  )
}

export default Real_graph
