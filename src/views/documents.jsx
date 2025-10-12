import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


function Documents({ apiUrl }) {
    // Standard practice att spara hämtad data i react state, initialisera tom array här.
    const [docs, setDocs] = useState([])


    useEffect(() => {
        fetch(`${apiUrl}graphql`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({ query: "{ documents { _id title } }" })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Nätverksfel')
            }
            return response.json();
        })
        .then(result => {
        console.log('data retunerad:', result)
        setDocs(result.data.documents)
        })
        .catch(error => {
        console.error('Error! Det gick inte att hämta dokumenten:', error)
        alert('Kunde inte hämta listan på dokument!')
        })

    }, [apiUrl])

    return (
        <div>
            <h2>Dokument</h2>
            <Link to="/create" className="button">Skapa Nytt Dokument</Link>

            {docs.length === 0 && (
                <p>Det finns inga dokument att visa.</p>
            )}

            {docs.map(doc => (
                <h3 key={doc._id}>
                    <Link to={`/${doc._id}`}>{doc.title}</Link>
                </h3>
            ))}

        </div>
    );
}


export default Documents;