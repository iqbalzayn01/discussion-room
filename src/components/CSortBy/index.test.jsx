/**
 * test scenario for CSortBy Component
 *
 * - CSortBy function
 *  - renders correctly
 *
 */

import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeAll, vi } from 'vitest';
import CSortBy from './index';

describe('CSortBy Component', () => {
  beforeAll(() => {
    // eslint-disable-next-line func-names
    window.HTMLElement.prototype.scrollIntoView = function () {};
  });

  it('renders correctly', () => {
    const handleSortBy = vi.fn();
    const handleResetSort = vi.fn();

    render(
      <CSortBy handleSortBy={handleSortBy} handleResetSort={handleResetSort} />
    );

    // Ensure the "Newest Discussions" radio button exists
    const newestRadio = screen.getByText('Newest Discussions').previousSibling;
    expect(newestRadio).toBeTruthy();

    // Ensure the "Oldest Discussions" radio button exists
    const oldestRadio = screen.getByText('Oldest Discussions').previousSibling;
    expect(oldestRadio).toBeTruthy();

    // Ensure the "Reset" button exists
    const resetButton = screen.getByRole('button', { name: 'Reset' });
    expect(resetButton).toBeTruthy();
  });
});
