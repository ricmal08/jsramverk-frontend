import { io } from "socket.io-client";
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const socket = io("https://jsramverk-editor-jahl24-bfeufbb0dwcfg6a6.northeurope-01.azurewebsites.net/");//ändrar denna till lokal adress för test

function Doc({ isNew }) {

    //hämtar routerhooks
    const { id } = useParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState('');//tar nya värdet för Titel och triggar en omrendering av komponenten.
    const [content, setContent] = useState('');//samma för innehållet i formuläret


    useEffect(() => {
        // Fetch som bara körs första gången och om vi ska redigera ett befintligt dokument
        if (!isNew && id) {
            fetch(`${apiUrl}documents/${id}`)//ev skruva på detta?
                .then(response => response.json())
                .then(data => {
                    setTitle(data.title);
                    setContent(data.content);
                });
        }
    }, [id, isNew, apiUrl]);

    //logik för socketanslutning
    useEffect(() => {
    socket.connect();//anslut när komponenten renderas
    //startar lyssnare på doc-updated

     if (id) { // kontroll att vi har ett id
        socket.emit('create', id);
    }
    socket.on('doc', (updatedData) => {
        //placeholder
    });


    return () => {
        socket.disconnect();//stäng ner anlsutning
        socket.off('doc');//tar bort lysnaare
    };
}, [id]);

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

            <button type="submit">Spara Dokument</button>
        </form>
    );
}

export default Doc;