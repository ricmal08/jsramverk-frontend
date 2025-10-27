import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Box } from '@chakra-ui/react'; 


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
            <Button mt={4} display="flex" gap={4}>
            <Link to="/create" style={{ color: "white", padding: "0.3rem" }} >Skapa Nytt Dokument</Link>
            </Button>
            <div style={{marginTop:"3rem"}} >
            {docs.length === 0 && (
                <p>Det finns inga dokument att visa.</p>
            )}

            {docs.map(doc => (
                <h3 key={doc._id}>
                    <Link to={`/${doc._id}`}>{doc.title}</Link>
                </h3>
            ))}
            </div>
        </div>
    );
}


export default Documents;