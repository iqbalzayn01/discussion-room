/**
 * - Login spec
 *   - should display login page correctly
 *   - should trigger window.alert when email is empty
 *   - should trigger window.alert when password is empty
 *   - should trigger window.alert for email or password is wrong
 *   - should display error messages for email or password is wrong
 *   - should display homepage when username and password are correct
 */

describe('Login spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/signin');
  });

  it('should display login page correctly', () => {
    cy.get('input[name="email"]').should('be.visible');
    cy.get('input[name="password"]').should('be.visible');
    cy.contains('button', 'Sign In').should('be.visible');
  });

  it('should trigger window.alert when email is empty', () => {
    cy.on('window:alert', (str) => {
      expect(str).to.equal('"email" is not allowed to be empty');
    });
    cy.get('input[name="email"]').clear();
    cy.get('input[name="password"]').type('validpassword');
    cy.contains('button', 'Sign In').click();
  });

  it('should trigger window.alert when password is empty', () => {
    cy.on('window:alert', (str) => {
      expect(str).to.equal('"password" is not allowed to be empty');
    });
    cy.get('input[name="email"]').type('validemail@example.com');
    cy.get('input[name="password"]').clear();
    cy.contains('button', 'Sign In').click();
  });

  it('should trigger window.alert for email or password is wrong', () => {
    cy.on('window:alert', (str) => {
      expect(str).to.equal('email or password is wrong');
    });
    cy.get('input[name="email"]').type('invalidemail@example.com');
    cy.get('input[name="password"]').type('invalidpassword');
    cy.contains('button', 'Sign In').click();
  });

  it('should display error messages for email or password is wrong', () => {
    cy.get('input[name="email"]').type('invalidemail@example.com');
    cy.get('input[name="password"]').type('invalidpassword');
    cy.contains('button', 'Sign In').click();
    cy.contains('email or password is wrong').should('be.visible');
  });

  it('should display homepage when username and password are correct', () => {
    const validEmail = 'madiksa@gmail.com';
    const validPassword = '123456';

    cy.get('input[name="email"]').type(validEmail);
    cy.get('input[name="password"]').type(validPassword);

    cy.contains('button', 'Sign In').click();

    cy.get('p').contains('Hi, Madiksa').should('be.visible');
    cy.get('button').contains('Sign Out').should('be.visible');
  });
});
