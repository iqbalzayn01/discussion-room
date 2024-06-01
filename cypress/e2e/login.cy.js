/**
 * - Login spec
 *   - should display login page correctly
 */

describe('Login spec', () => {
  beforeEach(() => {
    // Set up before each test
    cy.visit('http://localhost:5173/signin');
  });

  it('should display login page correctly', () => {
    cy.get('input[name="email"]').should('be.visible');
    cy.get('input[name="password"]').should('be.visible');
    cy.contains('button', 'Sign In').should('be.visible');
  });
  it('should display error messages for invalid email or password', () => {
    // Enter an invalid email
    cy.get('input[name="email"]').type('invalidemail@example.com');
    // Enter an invalid password
    cy.get('input[name="password"]').type('invalidpassword');
    // Click the sign-in button
    cy.contains('button', 'Sign In').click();
    // Check for the error message
    cy.contains('Invalid email or password').should('be.visible');
  });
});
