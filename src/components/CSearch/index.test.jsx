/**
 * test scenario for CSearch Component
 *
 * - CSearch function
 *  - renders correctly
 *
 */

import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeAll } from 'vitest';
import { MemoryRouter, useNavigate, useLocation } from 'react-router-dom';
import CSearch from './index';

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useLocation: vi.fn(),
    useNavigate: vi.fn(),
  };
});

describe('CSearch Component', () => {
  beforeAll(() => {
    useNavigate.mockReturnValue(vi.fn());
    useLocation.mockReturnValue({ search: '' });
  });

  it('renders correctly', () => {
    render(
      <MemoryRouter>
        <CSearch placeholder="Search..." updateSearch={() => {}} />
      </MemoryRouter>
    );

    const inputElements = screen.getAllByPlaceholderText('Search...');
    expect(inputElements.length).toBe(1); // Memastikan hanya ada satu elemen input
    const inputElement = inputElements[0];
    expect(inputElement).toBeTruthy();
  });
});
