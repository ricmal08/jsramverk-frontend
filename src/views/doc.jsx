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
    }, [id, isNew]);

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


    const onTitlechange = (e) => {

        const updateTitle = e.target.value;

        setTitle(updateTitle);
        //servern ska ta emot denna nya data via socket
        const titleData = {
            _id: id,
            title: updateTitle //Bara det som ändrats
        };
        socket.emit('doc-title-update', titleData);



    };

    const onTextchange = (e) => {

        const updatedContent = e.target.value;

        setContent(updatedContent);// Uppdater minne
        //servern ska ta emot denna nya data via socket
        const docData = {
            _id: id,
            content: updatedContent,
        };

        socket.emit('doc-update', docData); // Skicka till servern
    };
    //behöver för att inte invoka pagerefresh och bibehålla kontrollen
    const handleSubmit = (e) => {


        e.preventDefault();

    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>{isNew ? 'Skapa Nytt Dokument' : 'Redigera Dokument'}</h2>

            <div>
                <label htmlFor="title">Titel:</label>
                <input type="text" id="title" name="title" value= {title} onChange={onTitlechange} />
            </div>


            <div>
                <label htmlFor="content">Innehåll:</label>
                <textarea id="content" name="content" value={content} onChange={onTextchange} />
            </div>

            <button type="submit">Spara Dokument</button>
        </form>
    );
}

export default Doc;