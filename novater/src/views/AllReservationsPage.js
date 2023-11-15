import React from "react";
import { useNavigate } from "react-router-dom";
import "./MainPage.css";

function AllReservationsPage() {
    const navigate = useNavigate();

    // Parse the reservations data from localStorage
    const storedData = JSON.parse(localStorage.getItem('data')) || [];

    // Filter out non-reservation items
    const reservations = storedData.filter(item => item && item.id && item.from && item.to && item.distance && item.price && item.start && item.end && item.company);

    return (
        <div className="App">
            <h1>Novater</h1>
            <h2>My Reservations</h2>
            <h2 onClick={() => { navigate(`/`); }} >Bus Schedule</h2>
            {reservations.map((reservation, index) => (
                <div key={index}>
                    <p>Reservation ID: {reservation.id}</p>
                    <p>First Name: {reservation.firstName}</p>
                    <p>Last Name: {reservation.lastName}</p>
                    <p>From: {reservation.from}</p>
                    <p>To: {reservation.to}</p>
                    <p>Distance: {reservation.distance}</p>
                    <p>Price: {reservation.price}</p>
                    <p>Start: {reservation.start.date}</p>
                    <p>End: {reservation.end.date}</p>
                    <p>Company ID: {reservation.company.id}</p>
                    <p>Company State: {reservation.company.state}</p>
                    <br />
                </div>
            ))}
        </div>
    );
}

export default AllReservationsPage;
