const book1 = {
  title: "Убийство в 'Восточном экспрессе'",
  description: "В центре сюжета – убийство американского бизнесмена в поезде, роскошном Восточном экспрессе, и последующее расследование. Легендарный сыщик Эркюль Пуаро, случайно оказавшийся пассажиром поезда, должен разгадать тайну, в которую вовлечено множество подозреваемых со своими собственными мотивами желать смерти жертве.",
  author: "Агата Кристи",
};
const book2 = {
  title: "Гарри Поттер и Принц-полукровка",
  description: " В книге описывается шестой год обучения героев в Хогвартсе, неожиданные успехи Гарри после того, как ему в руки попадает книга с пометками от загадочного «Принца-полукровки», а также открывается всё более и более широкая картина на мотивацию главного злодея Волан-де-Морта, пока его приспешники постепенно растут в числе.",
  author: "Джоан Кэтлин Роулинг",
};
const book3 = {
  title: "Голодные игры",
  description: "«Китнисс Эвердин живет в страшном мире: каждый год подростки из двенадцати дистриктов, выбранные методом жеребьевки, должны участвовать в Голодных играх – жестоком сражении, в котором из двадцати четырех соперников в живых остается только один.",
  author: "Сьюзен Коллинз",
};

beforeEach(() => {
  
  cy.visit("/");
  cy.login("bropet@mail.ru", "123");
});

describe("Testing catalog of books", () => {
  it("Using button 'add new'", () => {
    cy.addBook(book1);
    cy.visit("/favorites");
    cy.get(".card-title").should("contain.text", book1.title);
  });

  it("Deleting book from favorite", () => {
    cy.visit("/favorites");
    cy.contains(book1.title)
      .should("be.visible")
      .within(() => cy.get(".card-footer > .btn").click({ force: true }));
    cy.contains(book1.title).should("not.exist");
  });

  it("Should add book to favorite through 'Book list' page", () => {
    cy.addBookNoFavorite(book2);
    cy.contains(book2.title) 
      .should("be.visible")
      .within(() => cy.get(".card-footer > .btn").click({ force: true }));
    cy.visit("/favorites");
    cy.contains(book2.title).should("be.visible");
  });

  it("Should remove all favorite books", () => {
    cy.addBook(book1);
    cy.addBook(book3);
    cy.removeAllFavorite();
    cy.contains("Please add some book to favorit on home page!").should("exist");
  });
});