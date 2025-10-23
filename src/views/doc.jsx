import { io } from "socket.io-client";
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import CodeEditor from '../components/Codeeditor';

import { Button, Box } from '@chakra-ui/react'; 

const socket = io("https://jsramverk-editor-jahl24-bfeufbb0dwcfg6a6.northeurope-01.azurewebsites.net/");//ändrar denna till lokal adress för test

function Doc({ isNew, apiUrl }) {

    // Hämta id från params
    const { id } = useParams()

    // sätt title och content även type
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [isCodeDoc, setIsCodeDoc] = useState(false);

    useEffect(() => {
        if (!isNew) {
            fetch(`${apiUrl}graphql`, {
                method:'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({ query: `{ document(id: "${id}") { _id title content type } }` })
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Nätverksfel')
                }
                return response.json()
            })
            .then(result => {
                console.log('data retunerad:', result)
                setTitle(result.data.document.title)
                setContent(result.data.document.content)

                if (result.data.document.type === 'code') {
                    setIsCodeDoc(true)
                }
                })
                .catch(error => {
                console.error('Error! Det gick inte att hämta dokument:', error)
                alert('Kunde inte hämta dokument')
            })
        }
    }, [isNew, id, apiUrl])

    // Navigera efter submittad form
    const navigate = useNavigate()

    // Hantera submit
    const handleSubmit = (e) => {
        e.preventDefault()

        // Kolla om det är ett nytt dokument eller ej (post/put)
        const method = isNew ? 'POST' : 'PUT'

        // Olika url
        const url = isNew ? `${apiUrl}create` : `${apiUrl}${id}`

        fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, content, type: isCodeDoc ? 'code' : 'text' })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Kunde inte spara dokumentet');
            }
            navigate('/')
        })
        .catch(error => {
            console.error('Error', error)
            alert('Något gick fel vid sparning')
        })
    }

    //logik för socketanslutning
    useEffect(() => {
        socket.connect();//anslut när komponenten renderas
        //startar lyssnare på doc-updated

        if (id) { // kontroll att vi har ett id
            socket.emit('create', id);
        }
        socket.on('doc', (newData) => {
            if (newData._id === id) {
                setTitle(newData.title);
                setContent(newData.content);
            }
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
        socket.emit('doc', titleData);

    };

    const onTextchange = (e) => {

        const updatedContent = e.target.value;

        setContent(updatedContent);// Uppdater minne
        //servern ska ta emot denna nya data via socket
        const docData = {
            _id: id,
            content: updatedContent,
        };

        socket.emit('doc', docData); // Skicka till servern
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>{isNew ? 'Skapa Nytt Dokument' : 'Redigera Dokument'}</h2>

            <div>
                <label htmlFor="title">Titel:</label>
                <input type="text" id="title" name="title" required value= {title} onChange={onTitlechange} />
            </div>

            {/*lägger till en knapp för att växla mellan txt och kodläge*/}
            <Box mt={4} display="flex" gap={4}>
                <Button
                    type="button"
                    onClick={() => setIsCodeDoc(!isCodeDoc)}
                >
                    {isCodeDoc ? "Textläge" : "Kodläge"}
                </Button>
            </Box>

            <div>
                <label htmlFor="content">Innehåll:</label>
                <textarea id="content" name="content" value={content} onChange={onTextchange} />
            </div>

            <button type="submit">Spara Dokument</button>
        </form>
    );
}

export default Doc;