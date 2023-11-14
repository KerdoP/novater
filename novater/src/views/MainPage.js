import React, { useState } from 'react';
import './MainPage.css';
import useSWR from 'swr';
import { useNavigate } from 'react-router-dom';

const fetcher = (url) => fetch("http://localhost:3307" + url).then((res) => res.json());

function MainPage() {
    const navigate = useNavigate();

    const [fromInput, setFromInput] = useState('');
    const [toInput, setToInput] = useState('');

    // get data from express.js
    const { data: allData, error: allError } = useSWR('/v1/bus/schedule', fetcher);

    // if error, log it
    if (allError) return <div>failed to load</div>;

    // if no data, show loading
    if (!allData) return <div>loading...</div>;

    // log data
    console.log(allData);

    const filteredRoutes = allData.routes.filter((route) => {
        const fromMatch = route.from.name.toLowerCase().includes(fromInput.toLowerCase());
        const toMatch = route.to.name.toLowerCase().includes(toInput.toLowerCase());
        return fromMatch && toMatch;
    });

    return (
        <div className="App">
            <h1>Novater</h1>
            <h2>Bus Schedule</h2>
            <p>Offers are valid until: {allData.expires.date}</p>
            <input
                type='text'
                placeholder='From...'
                value={fromInput}
                onChange={(e) => setFromInput(e.target.value)}
            />
            <br /><br />
            <input
                type='text'
                placeholder='To...'
                value={toInput}
                onChange={(e) => setToInput(e.target.value)}
            />
            {filteredRoutes.map((route, index) => (
                <div className='Route' key={index}>
                    <p>From: {route.from.name}</p>
                    <p>To: {route.to.name}</p>
                    <p>Distance: {route.distance}</p>
                    {route.schedule.map((schedule, index) => (
                        <div
                            className='SpecificRoute'
                            key={index}
                            onClick={() => { navigate(`/${schedule.id}`); }}
                        >
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

export default MainPage;
