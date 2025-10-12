import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function Doc({ isNew, apiUrl }) {

    // Hämta id från params
    const { id } = useParams()

    // sätt title och content
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')

    useEffect(() => {
        if (!isNew) {
            fetch(`${apiUrl}graphql`, {
                method:'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({ query: `{ document(id: "${id}") { _id title content } }` })
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
            body: JSON.stringify({ title, content })
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


    return (
        <form onSubmit={handleSubmit}>

            <h2>{isNew ? 'Skapa Nytt Dokument' : 'Redigera Dokument'}</h2>

            <div>
                <label htmlFor="title">Titel:</label>
                <input type="text" id="title" name="title" required value={title} onChange={(e) => 
                    setTitle(e.target.value)
                } />
            </div>


            <div>
                <label htmlFor="content">Innehåll:</label>
                <textarea id="content" name="content" value={content} onChange={(e) => 
                    setContent(e.target.value)} />
            </div>

            <button type="submit">Spara Dokument</button>
        </form>
    );
}

export default Doc;