import React from 'react';
import './App.css';
import useSWR from 'swr';
import { fetcher } from './networking.js';

function App() {
    //get data from express.js
    const { data, error } = useSWR('/v1/bus/schedule', fetcher);

    //if error, log it
    if (error) return <div>failed to load</div>;

    //log data
    console.log(data);

    return (
        <div className="App">
            <h1>Novater</h1>
            <h2>Bus Schedule</h2>
            <p>Offers are valid until: {data.expires.date}</p>
            {data.routes.map((route, index) => (
                <div className='Container' key={index}>
                    <p>From: {route.from.name}</p>
                    <p>To: {route.to.name}</p>
                    <p>Distance: {route.distance}</p>
                    {route.schedule.map((schedule, index) => (
                        <div key={index}>
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
