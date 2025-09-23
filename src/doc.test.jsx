import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import Doc from './views/doc';

describe('Doc Component', () => {


    it('should display "Skapa Nytt Dokument" headline when in create mode', () => {
        //isNew är true
        render(<Doc isNew={true} />);

        const headline = screen.getByRole('heading', { level: 2, name: /Skapa Nytt Dokument/i });
        expect(headline).toBeInTheDocument();
    });


    it('should display "Redigera Dokument" headline when in edit mode', () => {
        //isNew är false
        render(<Doc isNew={false} />);

        const headline = screen.getByRole('heading', { level: 2, name: /Redigera Dokument/i });
        expect(headline).toBeInTheDocument();
    });

    it('should render input fields for title and content', () => {
        render(<Doc isNew={true} />);

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
