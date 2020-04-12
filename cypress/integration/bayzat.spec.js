/// <reference types="cypress" />

Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false
})

context('Navigation: Go to Bayzat Page', () => {
  it('Go to Bayzat Page', () => {
    //1. Please visit www.bayzat.com
    cy.visit('https://www.bayzat.com')  

    //2. Log in via login link reachable from top menu.   
    cy.contains('Login').click()          
    cy.wait(5000)
    
    cy.get('input[name="username"]').type('test+testcompany@bayzat.com')
    cy.get('input[name="password"]').type('123456789')
    cy.get('.row').contains('Log In').click() 
    cy.wait(5000)  
    //3. Once logged in, user will land on https://www.bayzat.com/enterprise/dashboard.                          
    cy.location('pathname').should('eq', '/enterprise/dashboard/index')  

    //4. New employee can be added using toolbar button above employees list (Add single employee for two times)
    cy.get('.main-menu__title', { timeout: 5000 }).contains('View Team').click() 
    cy.wait(1000)
    cy.get('.main-menu__title', { timeout: 5000 }).contains('Add Employees').click()
    //cy.location('pathname').should('eq', '/enterprise/dashboard/import-users')

    cy.contains('Add Employee').click()
    //cy.location('pathname').should('eq', '/enterprise/dashboard/employees/create')

 
    cy.get('input[name="preferredName"]').type('Bayzat')
    cy.get('input[name="firstName"]').type('Hello')
    cy.get('input[name="lastName"]').type('World')
    cy.get('input[name="dateOfBirthFormatted"]').type('19/08/1994').click() //Using get as well by selecting from calender

    cy.get('.col-sm-9').contains('Please select nationality').click({ multiple: true }).type('Pakistan{enter}{enter}')
    cy.get('.col-sm-9').contains('Please select gender').click({ multiple: true })
    cy.get('.ember-power-select-option').contains('Female').click()

    cy.get('input[name="mobileNumber"]').type('0581234567')
    cy.get('input[name="workEmail"]').type('testbayzat@yopmail.com')       //Change it as I am not clearing it from the db right now
    cy.get('input[name="officeNumber"]').type('0587654321')

    cy.get('input[name="position"]').type('Sr SQA Engr')
    cy.get('input[name="hiredAtFormatted"]').type('01/01/2020').click()
    cy.get('input[name="probationEndDateFormatted"]').type('03/01/2020').click()

    cy.get('.col-sm-9').contains('Please select country of residence').click({ multiple: true }).type('United Arab Emirates{enter}{enter}{enter}')

    cy.get('.col-sm-9').contains('Please select visa location').click({ multiple: true })
    cy.get('.ember-power-select-option').contains('Dubai').click()

    cy.get('.col-sm-9').contains('Please select trade license').click({ multiple: true })
    cy.get('.ember-power-select-option').contains('Test Trade License1').click()

    //cy.get('input[name="ministryOfLabourId"]').type('12345678901235')     //Change it as I am not clearing it from the db right now
    cy.get('.col-sm-9').contains('Yes').click({ multiple: true })

    cy.get('.col-sm-9').contains('Please select health insurance').click({ multiple: true })
    cy.get('.ember-power-select-option').contains('18 03 07 Test plan').click()

    cy.get('.col-sm-9').contains('Create and add another').click()

    //****Only adding mandatory field this time****
    cy.wait(5000)
    cy.get('input[name="firstName"]').type('Hello')
    cy.get('input[name="lastName"]').type('World')

    cy.get('input[name="workEmail"]').type('testbayzat@yopmail.com') 
    cy.wait(2000)
    cy.get('.col-sm-9').contains('Create').click()
    cy.wait(5000)

    //5. Once employee is added, s/he can be selected on the view employee screen.
    cy.get('.main-menu__title').contains('View Team').click()
    cy.get('.modal-footer').contains('Abandon').click()

    //6. Once newly added employee name written in search box it will be filtered in the list
    cy.get('input[placeholder="Search by employee name"]').type('Bayzat World{enter}')
    cy.wait(1000)

    //7. Newly added employee should have a "Delete" button that should show up near search field
    cy.get('thead > tr > :nth-child(1)').click({ multiple: true })
    cy.get('.col-12').contains('1').click()
    cy.get('.modal-footer').contains('Confirm').click()
    cy.wait(1000)

    //8. Once employee deleted Logout using left menu
    cy.get('.main-menu__title').contains('Logout').click()

    //9. User should land on www.bayzat.com again and login link should be available. Note: (URL not as per given in the task)
    cy.location('pathname').should('eq', '/enterprise/dashboard/login')  
  })
})