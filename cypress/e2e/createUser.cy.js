describe('Create User Test', () => {
    it('Logs in', () => {
        cy.visit('localhost:3000')
        cy.get('input[name="email"]').clear()
        cy.get('input[name="password"]').clear()
        cy.get('input[name="email"]').type("kavin@gmail.com")
        cy.get('input[name="password"]').type("Password12@")
        cy.contains('Continue').click()
        cy.url().should('include', '/dashboard')
        cy.contains('Logged in successfully').should('be.visible')
    })
    it('Goes to add user page', () => {
        cy.contains('Users').click()
        cy.contains('Create').click()
        cy.get('input[name="name"]').should('be.visible')
        cy.get('input[name="email"]').should('be.visible')
        cy.get('input[name="password"]').should('be.visible')
        cy.get('input[name="mobileno"]').should('be.visible')
        cy.get('[name="company"]').click({ force: true })
        cy.contains('Leaptron').click()
        //cy.get(`[data-cy = "company"]`).should('be.visible')
        cy.get('[name="company"]').parent().should('be.visible')
    })
  })