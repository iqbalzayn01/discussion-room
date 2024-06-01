/**
 * - Login spec
 *   - should display login page correctly
 *   - should display alert when username is empty
 *   - should display alert when password is empty
 *   - should display alert when username and password are wrong
 *   - should display homepage when username and password are correct
 */

describe('Login spec', () => {
  it('should display login page correctly', () => {
    cy.visit('http://localhost:5173/signin');
    cy.get('input[name="email"]').should('be.visible');
    cy.get('input[name="password"]').should('be.visible');
    cy.contains('button', 'Sign In').should('be.visible');
  });
});
