
describe('Permissão de usuário', () => {
  it('deve logar com sucesso', () => {
    
    cy.api({
      method: 'POST',
      url: 'https://api.webmaissistemas.com.br/v1/auth',
      body: {
        namespace: 'devinbox',
        user: 'api',
        password: '*****,'
      }
    })
    .should((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).has.property('auth', true)

      Cypress.env('authToken', response.body.token)
    })
  });

  it('deve listar permissão do usuário', () => {
    cy.api({
      method: 'GET',
      url: 'https://api.webmaissistemas.com.br/erp/v1/permissao',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Token': Cypress.env('authToken')
      }
    })
    .should((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.have.property('empresas')
      expect(response.body).to.have.property('recursos')
    })
  });

  it('deve ter permissão para Abastecimento', () => {
    cy.api({
      method: 'GET',
      url: 'https://api.webmaissistemas.com.br/erp/v1/permissao',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Token': Cypress.env('authToken')
      }
    })
    .should((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.have.property('recursos')
      expect(response.body.recursos[0]).has.property('url', '/abastecimento')
    })
  });
})