import React, { useState } from 'react';
import './MainPage.css';
import useSWR from 'swr';
import { useNavigate } from 'react-router-dom';

const fetcher = (url) => fetch("http://localhost:3307" + url).then((res) => res.json());

function MainPage() {
    const navigate = useNavigate();

    const [fromInput, setFromInput] = useState('');
    const [toInput, setToInput] = useState('');
    const [sortOption, setSortOption] = useState(null);

    // get data from express.js
    const { data: allData, error: allError } = useSWR('/v1/bus/schedule', fetcher);

    // if error, log it
    if (allError) return <div>failed to load</div>;

    // if no data, show loading
    if (!allData) return <div>loading...</div>;

    const handleSort = (option) => {
        setSortOption(option);
    };

    const getSortedRoutes = () => {
        return filteredRoutes.map((route) => {
            const sortedSchedule = [...route.schedule].sort((a, b) => {
                if (sortOption === 'priceLow') {
                    return a.price - b.price;
                } else if (sortOption === 'timeLow') {
                    return new Date(a.start.date) - new Date(b.start.date);
                } else if (sortOption === 'companyLow') {
                    return a.company.state.localeCompare(b.company.state);
                } else if (sortOption === 'priceHigh') {
                    return b.price - a.price;
                } else if (sortOption === 'timeHigh') {
                    return new Date(b.start.date) - new Date(a.start.date);
                } else if (sortOption === 'companyHigh') {
                    return b.company.state.localeCompare(a.company.state);
                } else {
                    return 0; // No sorting
                }
            });

            return {
                ...route,
                schedule: sortedSchedule,
            };
        });
    };

    const filteredRoutes = allData.routes.filter((route) => {
        const fromMatch = route.from.name.toLowerCase().includes(fromInput.toLowerCase());
        const toMatch = route.to.name.toLowerCase().includes(toInput.toLowerCase());
        return fromMatch && toMatch;
    });

    // log local storage
    var i;
    console.log("local storage");
    for (i = 0; i < localStorage.length; i++) {
        console.log(localStorage.key(i) + "=[" + localStorage.getItem(localStorage.key(i)) + "]");
    }

    // incase you need to clear local storage for testing
    // localStorage.clear();

    const sortedRoutes = getSortedRoutes();

    return (
        <div className="App">
            <h1>Novater</h1>
            <h2>Bus Schedule</h2>
            <h2 className='NavigationButton' onClick={() => { navigate(`/reservations`); }} >My Reservations</h2>
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
            <br /><br />
            <button onClick={() => handleSort('priceLow')}>Sort by Lowest Price</button>
            <button onClick={() => handleSort('timeLow')}>Sort by Earliest Time</button>
            <button onClick={() => handleSort('companyLow')}>Sort by Company Name</button>
            <br /><br />
            <button onClick={() => handleSort('priceHigh')}>Sort by Highest Price</button>
            <button onClick={() => handleSort('timeHigh')}>Sort by Latest Time</button>
            <button onClick={() => handleSort('companyHigh')}>Sort by Company Name backwards</button>
            {sortedRoutes.map((route, index) => (
                <div className='Route' key={index}>
                    <p>From: {route.from.name}</p>
                    <p>To: {route.to.name}</p>
                    <p>Distance: {route.distance}</p>
                    {route.schedule.map((schedule, scheduleIndex) => (
                        <div
                            className='SpecificRoute'
                            key={scheduleIndex}
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
