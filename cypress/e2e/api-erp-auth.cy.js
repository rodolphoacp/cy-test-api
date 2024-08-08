
describe('Autênticação da API', () => {
  it('deve logar com sucesso', () => {
    
    cy.api({
      method: 'POST',
      url: 'https://api.webmaissistemas.com.br/v1/auth',
      body: {
        namespace: 'devinbox',
        user: 'api',
        password: '******,'
      }
    })
    .should((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).has.property('auth', true)
    })
  });

  it('deve retornar login inválido', () => {
    
    cy.api({
      method: 'POST',
      url: 'https://api.webmaissistemas.com.br/v1/auth',
      body: {
        namespace: 'devinbox',
        user: 'api',
        password: '*****'
      },
      failOnStatusCode: false
    })
    .should((response) => {
      expect(response.status).to.eq(401)
      expect(response.body).has.property('auth', false)
      expect(response.body).has.property('message', 'Unauthorized')
    })
  });
})