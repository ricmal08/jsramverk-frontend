import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function documents() {
    return (
        <div>
            <h2>Dokument</h2>
            <a href="/create" className="button">Skapa Nytt Dokument</a>

            <h3>
                <a href="/123">Dokument 1</a>
            </h3>

            <h3>
                <a href="/444">Dokument 2</a>
            </h3>
        </div>
    );
}

export default documents;