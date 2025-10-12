import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function Doc({ isNew, apiUrl }) {

    // Hämta id från params
    const { id } = useParams();

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
                    throw new Error('Nätverksfel');
                }
                return response.json();
            })
            .then(result => {
                console.log('data retunerad:', result)
                setTitle(result.data.document.title)
                setContent(result.data.document.content)
                })
                .catch(error => {
                console.error('Error! Det gick inte att hämta dokument:', error);
            })
        }
    }, [isNew, id, apiUrl])

    // Här ska dokuments sparas och muteras.


    return (
        <form>

            <h2>{isNew ? 'Skapa Nytt Dokument' : 'Redigera Dokument'}</h2>

            <div>
                <label htmlFor="title">Titel:</label>
                <input type="text" id="title" name="title" value={title} />
            </div>


            <div>
                <label htmlFor="content">Innehåll:</label>
                <textarea id="content" name="content" value={content} />
            </div>

            <button type="submit">Spara Dokument</button>
        </form>
    );
}

export default Doc;