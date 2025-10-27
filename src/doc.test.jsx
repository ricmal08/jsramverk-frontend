import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import Doc from './views/doc';

const renderWithRouter = (ui) => {
  return render(ui, { wrapper: BrowserRouter });
};

describe('Doc Component', () => {


    it('should display "Skapa Nytt Dokument" headline when in create mode', () => {
        //isNew är true
        renderWithRouter(<Doc isNew={true} apiUrl="http://placeholder.api"/>);

        const headline = screen.getByRole('heading', { level: 2, name: /Skapa Nytt Dokument/i });
        expect(headline).toBeInTheDocument();
    });


    it('should display "Redigera Dokument" headline when in edit mode', () => {
        //isNew är false
        renderWithRouter(<Doc isNew={false} apiUrl="http://placeholder.api"/>);

        const headline = screen.getByRole('heading', { level: 2, name: /Redigera Dokument/i });
        expect(headline).toBeInTheDocument();
    });

    it('should render input fields for title and content', () => {
        renderWithRouter(<Doc isNew={true} apiUrl="http://placeholder.api"/>);

        //best practice här att söka genom <label>-texter.
        const titleInput = screen.getByLabelText(/Titel/i);

        const contentInput = screen.getByLabelText(/Innehåll/i);
        //Ändrat till 'Spara Dokument' ist för 'Spara'
        const saveButton = screen.getByRole('button', { name: /Spara Dokument/i });


        expect(titleInput).toBeInTheDocument();

        expect(contentInput).toBeInTheDocument();

        expect(saveButton).toBeInTheDocument();
    });
});
