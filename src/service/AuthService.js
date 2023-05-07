export class AuthService {
  constructor(httpClient, tokenStorage) {
    this.httpClient = httpClient;
    this.tokenStorage = tokenStorage
  }

  async signin(email, password) {
    const result = await this.httpClient.fetchRequest('/auth/signin', {
      method: "POST",
      body: JSON.stringify({ email, password})
    });

    const { access_token } = await result.json();
    this.tokenStorage.save(access_token);
  }

  async signup(email, password) {
    const response = await this.httpClient.fetchRequest('/auth/signup', {
      method: "POST",
      body: JSON.stringify({ email, password})
    })

    if (!response.ok) {
      throw response; // 응답 폐기(?)
    }
  }

  async logout() {
    this.tokenStorage.remove();
  }


}