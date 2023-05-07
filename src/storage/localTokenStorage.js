export class LocalTokenStorage {
  $TOKEN_KEY = 'ACCESS_TOKEN';

  save(token) {
    return localStorage.setItem(this.$TOKEN_KEY, token);
  }

  get() {
    return localStorage.getItem(this.$TOKEN_KEY)
  }

  remove() {
    return localStorage.removeItem(this.$TOKEN_KEY)
  }
}