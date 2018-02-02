'use strict';

describe('RPS', () => {
  describe('Computer VS Computer', () => {
    describe('Choose Game', () => {
      it('.should() - assert that <title> is correct', () => {
        cy.visit('http://localhost:1234');

        cy.title().should('include', 'Rock - Paper - Scissors');
      });

      it('.should() - assert that the Choose <Section> is visible', () => {
        cy.get('.rps--game-changer').should('be.visible');
        cy.get('.rps--wait').should('not.be.visible');
        cy.get('.rps--play').should('not.be.visible');
        cy.get('.rps--result').should('not.be.visible');
      });
    });
    describe('Wait', () => {
      it('.should() - assert that the correct <Click>', () => {
        cy.get('#gameComputerVsComputer').click();
      });

      it('.should() - assert that the Wait <Section> is visible', () => {
        cy.get('.rps--game-changer').should('not.be.visible');
        cy.get('.rps--wait').should('be.visible');
        cy.get('.rps--play').should('not.be.visible');
        cy.get('.rps--result').should('not.be.visible');
      });
    });

    describe('Result', () => {
      it('.should() - assert that the Result <Section> is visible', () => {
        cy.get('.rps--result').should('be.visible');
        cy.get('.rps--play').should('not.be.visible');
        cy.get('.rps--game-changer').should('not.be.visible');
        cy.get('.rps--wait').should('not.be.visible');
      });
    });

    describe('Restart', () => {
      it('.should() - assert that the correct <Click>', () => {
        cy.get('#reset').click();
      });
      it('.should() - assert that the Restart <Section> is visible', () => {
        cy.get('.rps--game-changer').should('be.visible');
        cy.get('.rps--result').should('not.be.visible');
        cy.get('.rps--play').should('not.be.visible');
        cy.get('.rps--wait').should('not.be.visible');
      });
    });
  });
});
