describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    cy.visit("http://localhost:3000");

    const user = {
      name: "Mikael",
      username: "user",
      password: "salasana",
    };
    cy.request("POST", "http://localhost:3003/api/users/", user);
  });

  it("Login form is shown", function () {
    cy.contains("Login");
    cy.contains("username");
    cy.contains("password");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.get("#username").type("user");
      cy.get("#password").type("salasana");
      cy.get("#login-button").click();

      cy.contains("Mikael logged in");
    });

    it("fails with wrong credentials", function () {
      cy.get("#username").type("user");
      cy.get("#password").type("vaara");
      cy.get("#login-button").click();

      cy.contains("wrong username or password");
    });
  });
});
