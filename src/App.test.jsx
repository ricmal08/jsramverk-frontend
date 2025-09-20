import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import App from './App';

///global.fetch = vi.fn();

//it('test that app.test.jsx works', () => {

///console.log('✅✅✅ Setupen fungerar! ✅✅✅');
///});

///describe('documents Component', () => {
    ///beforeEach(() => {
    ///vi.clearAllMocks();
  ///});
describe('App Component', () => {

    it('test that setup app.test.jsx works', () => {
        expect(true).toBe(true);
    });

    it('should render app title "SSR Editor"', () => {

    render(<App />);

    const mainTitle = screen.getByRole('heading', { level: 1, name: /SSR Editor/i }); ///vi letar efter en rubrik med html-tagg,
    //<h1> som innehåller texten SSR Editor, i = oskriftkänslig
    expect(mainTitle).toBeInTheDocument();
  });
});
