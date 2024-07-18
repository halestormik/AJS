describe('Тест логина BookApp', () => {

  beforeEach (() => {
    cy.visit('/')
  })

  it('Тест логина', () => {
    cy.login("bropet@mail.ru", "123")
    cy.contains("Добро пожаловать bropet@mail.ru").should("be.visible")
  })

  it('Тест пустого имени пользователя', () => {
    cy.login("", "123")
    cy.get("#mail").then((elements) => {
      expect(elements[0].checkValidity()).to.be.false
      expect(elements[0].validationMessage).to.be.eql('Заполните это поле.')
    })
  })

  it('Тест пустого поля пароля', () => {
    cy.login("bropet@mail.ru", "")
    cy.get("#pass").then((elements) => {
      expect(elements[0].checkValidity()).to.be.false
      expect(elements[0].validationMessage).to.be.eql('Заполните это поле.')
    })
  })
})