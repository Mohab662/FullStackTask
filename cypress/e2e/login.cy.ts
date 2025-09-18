describe('Login Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200/login'); 
  });

  it('should display login form', () => {
    cy.get('input[formControlName="email"]').should('exist');
    cy.get('input[formControlName="password"]').should('exist');
    cy.get('button[type="submit"]').should('exist');
  });

  it('should show error with invalid credentials', () => {
    cy.get('input[formControlName="email"]').type('wrong@example.com');
    cy.get('input[formControlName="password"]').type('wrongpass');
    cy.get('button[type="submit"]').click();

    cy.get('.alert-danger').should('contain', 'Invalid email or password');
  });
});
