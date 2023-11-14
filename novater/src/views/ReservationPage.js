import React from 'react';
import { useNavigate } from 'react-router-dom';
import useSWR from 'swr';
import './MainPage.css';

const fetcher = (url) => fetch("http://localhost:3307" + url).then((res) => res.json());

function ReservationPage() {
    const navigate = useNavigate();
    const id = window.location.pathname.split("/").pop();

    // get data from express.js
    const { data: allData, error: allError } = useSWR('/v1/bus/schedule/', fetcher);

    // if error, log it
    if (allError) return <div>failed to load</div>;

    // if no data, show loading
    if (!allData) return <div>loading...</div>;

    // log data
    console.log(allData);

    // find the schedule with matching id
    const selectedSchedule = allData.routes.reduce((acc, route) => {
        const matchingSchedule = route.schedule.find((schedule) => schedule.id === id);
        return matchingSchedule ? { ...matchingSchedule, route } : acc;
    }, null);

    // if no matching schedule is found, display a message
    if (!selectedSchedule) return <div>Schedule not found</div>;

    return (
        <div className="App">
            <button onClick={() => { navigate(`/`); }}>Back</button>
            <h1>Novater</h1>
            <input type='text' placeholder='First name...' />
            <br /><br />
            <input type='text' placeholder='Last name...' />
            <div className='Route'>
                <p>From: {selectedSchedule.route.from.name}</p>
                <p>To: {selectedSchedule.route.to.name}</p>
                <p>Distance: {selectedSchedule.route.distance}</p>
                <p>Price: {selectedSchedule.price}</p>
                <p>Start date: {selectedSchedule.start.date}</p>
                <p>End date: {selectedSchedule.end.date}</p>
                <p>Bus company: {selectedSchedule.company.state}</p>
            </div>
        </div>
    );
}

export default ReservationPage;
