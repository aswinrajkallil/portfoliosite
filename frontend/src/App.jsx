import React from 'react'
import Home from './Components/Home.jsx'
import './App.css'
import Cursor from './Components/Cursor.jsx';

const App = () => {
    return (
        <div className="App">
            <Cursor/>
            <Home />
        </div>
    );
};

export default App;