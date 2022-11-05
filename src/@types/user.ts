export default class User {
  username: string;

  password: string;

  id: string;

  constructor(username: string, password: string, id: string) {
    this.username = username;
    this.password = password;
    this.id = id;
  }
}
