import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainPage from './views/MainPage';
import ReservationPage from './views/ReservationPage';

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainPage />,
    },
    {
        path: "/:id",
        element: <ReservationPage />,
    },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
