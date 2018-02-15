'use strict';

describe('RPS', () => {
  describe('Choose Avatar', () => {
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

    it('.should() - three avatars are visable', () => {
      cy.get('.avatars__avatar[data-player=boy1]').should('be.visible');
      cy.get('.avatars__avatar[data-player=girl1]').should('be.visible');
      cy.get('.avatars__avatar[data-player=girl2]').should('be.visible');
    });
  });
});
