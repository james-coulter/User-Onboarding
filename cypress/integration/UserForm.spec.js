import {v4 as uuid} from 'uuid'

const username = uuid().slice(0, 5)
const email = `${username}@acme.com`
const password =  `${username}2434`

  
  describe('User Form', () => {
    it('can navigate to the site', () => {
      cy.visit('http://localhost:3000')
    })



  it('can submit new users (happy)', () => {
          cy.get('input[name="name"]')
            .type(username)
            .should('have.value', username)
            
            cy.get('input[name="email"]')
            .type(email)
            .should('have.value', email)
        
            cy.get('input[name="password"]')
            .type(password)
            .should('have.value', password)

            cy.get('[type="checkbox"]').check()

            cy.get('[data-cy=submit]').click()
      })

    it('Displays Validation Errors', () => {
        cy.get('input[name="name"]')
            .type(username)
            .clear()
    })

    it('works!', () => {
        expect(5).to.eq(5)
        expect(6).to.eq(6)
      })

    it ('Image loaded correctly', () => {
        cy.get('.parallax')
            .should('be.visible')
    })
 })



