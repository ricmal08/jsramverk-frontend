import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function documents() {
    return (
        <div>
            <h2>Dokument</h2>
            <Link to="/create" className="button">Skapa Nytt Dokument</Link>

        <h3>
            <Link to="/123">Dokument 1</Link>
        </h3>

        <h3>
            <Link to="/444">Dokument 2</Link>
        </h3>
    </div>
);
}

export default documents;