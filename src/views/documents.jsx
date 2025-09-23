import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


function Documents({ apiUrl }) {
    const [docs, setDocs] = useState([]);

    useEffect(() => {
        fetch(`${apiUrl}/api/documents`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Nätvärksfel');
                }
                return response.json();
            })
            .then(data => {
                setDocs(data);
            })
            .catch(error => console.error("Det gick inte att hämta dokument:", error));
    }, [apiUrl]);

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