import axios from 'axios';
import React from 'react';

export const getGames = () => {
    return {
        type: "GETGAMES",
        payload: axios.get('https://localhost:5001/Games').then(response.data),
    }
}