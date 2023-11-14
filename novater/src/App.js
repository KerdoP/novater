import React from 'react';
import './App.css';
import useSWR from 'swr';

const fetcher = (url) => fetch("http://localhost:3307"+url).then((res) => res.json());

function App() {
    //get data from express.js
    const { data: allData, error: allError } = useSWR('/v1/bus/schedule', fetcher);

    //if error, log it
    if (allError) return <div>failed to load</div>;

    //if no data, show loading
    if (!allData) return <div>loading...</div>;

    //log data
    console.log(allData);

    //id
    //expires
    //routes    //id

                //from          //id
                //to            //name

                //distance
                //schedule      //id
                                //price

                                //start         //date
                                //end

                                //company       //id
                                                //state
    return (
        <div className="App">
            <h1>Novater</h1>
            <h2>Bus Schedule</h2>
            <p>Offers are valid until: {allData.expires.date}</p>
            {allData.routes.map((route, index) => (
                <div className='Route' key={index}>
                    <p>From: {route.from.name}</p>
                    <p>To: {route.to.name}</p>
                    <p>Distance: {route.distance}</p>
                    {route.schedule.map((schedule, index) => (
                        <div className='SpecificRoute' key={index}>
                            <p>Price: {schedule.price}</p>
                            <p>Start date: {schedule.start.date}</p>
                            <p>End date: {schedule.end.date}</p>
                            <p>Bus company: {schedule.company.state}</p>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );                                    
}

export default App;
