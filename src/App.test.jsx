import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect,  vi, beforeAll, afterAll } from 'vitest';
import userEvent from '@testing-library/user-event';

import App from './App';

///global.fetch = vi.fn();

//it('test that app.test.jsx works', () => {

///console.log('✅✅✅ Setupen fungerar! ✅✅✅');
///});

//Mockar api-anrop
beforeAll(() => {
    // vite stoppar fetch-anrop
    global.fetch = vi.fn(() =>
        //returnerar en positive resolve med tomt dokument
        Promise.resolve({
            ok: true,
            json: () => Promise.resolve([]),
        })
    );
});

afterAll(() => {
    //best practice att rensa mocken efter att alla filer körts
    vi.clearAllMocks();
});

describe('App Component', () => {

    it('test that setup app.test.jsx works', () => {
        expect(true).toBe(true);
    });

    it('should render app title "SSR Editor"', () => {

    render(<App />);

    const pageTitle = screen.getByRole('heading', { level: 1, name: /SSR Editor/i }); ///vi letar efter en rubrik med html-tagg,
    //<h1> som innehåller texten SSR Editor, i = oskriftkänslig
    expect(pageTitle).toBeInTheDocument();
  });
});

describe('App Routing', () => {

  it('should render the documents list page on the root route ("/")', async () => {
    render(<App />);

    // "findByRole" är best practice.
    const pageTitle = await screen.findByRole('heading', { level: 2, name: /Dokument/i });
    expect(pageTitle).toBeInTheDocument();
  });

  it('should redirect to create page when clicking link "Skapa Nytt Dokument" ', async () => {
    // Kalla på userEvent för att simmulera click-event.
    const user = userEvent.setup();
    render(<App />);

    //  "findByRole" igen för att hitta länken.
    const createLink = await screen.findByRole('link', { name: /Skapa Nytt Dokument/i });
    await user.click(createLink);

    const pageTitle = await screen.findByRole('heading', { level: 2, name: /Skapa Nytt Dokument/i });
    expect(pageTitle).toBeInTheDocument();
  });
});