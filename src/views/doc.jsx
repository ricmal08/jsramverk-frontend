import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function Doc({ isNew }) {
    return (
        <form>

            <h2>{isNew ? 'Skapa Nytt Dokument' : 'Redigera Dokument'}</h2>

            <div>
                <label htmlFor="title">Titel:</label>
                <input type="text" id="title" name="title" />
            </div>


            <div>
                <label htmlFor="content">Innehåll:</label>
                <textarea id="content" name="content" />
            </div>

            <button type="submit">Spara</button>
        </form>
    );
}

export default Doc;