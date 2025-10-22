import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Documents from './views/documents.jsx';

//kapar api-koppling med egen definierad
// Ändrade till globalThis vilket är man ska använda
globalThis.fetch = vi.fn();

    // adderar funktion för att rendera komponenten via routern
    const renderWithRouter = (ui) => {
    return render(ui, { wrapper: BrowserRouter });
    };

    describe('Documents Component', () => {
        beforeEach(() => {
        vi.clearAllMocks();
        fetch.mockResolvedValue({
            ok: true,
            json: () => Promise.resolve({
                data: {
                    documents: []
                }
            }),
        });
    });

    it('should render headline and create-link', async () => {
       await act(() => {
            renderWithRouter(<Documents apiUrl="http://placeholder.api" />);
        });
        


        const headline = screen.getByRole('heading', { level: 2, name: /Dokument/i });

        const createLink = screen.getByRole('link', { name: /Skapa Nytt Dokument/i });

        expect(headline).toBeInTheDocument();
        expect(createLink).toBeInTheDocument();
    });

    it('should display a message if no documents are returned', async () => {
        //mocken simulerar att lyckat anrop
        //Tar inte emot någon API-input, utan ignorerar det helt och hållet och ersätter hela anropet
        //ska returnera en resolve med en tom lista.
        //gäller bara för nästa anrop
        fetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({
            data: {
                documents: []
            }
        }),
        });

        renderWithRouter(<Documents apiUrl="http://placeholder.api" />);

        const message = await screen.findByText('Det finns inga dokument att visa.');

        expect(message).toBeInTheDocument();
    });
});
