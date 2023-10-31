
type AuthState = {
  username?: string;
  logged: boolean;
}

export class Authenticator {
  private state: AuthState;
  constructor() {
    const usr = localStorage.getItem('user')
    if (usr) this.state = JSON.parse(usr);
    else this.state = { logged: false };
  }

  login(username: string) { 
    this.state = { username, logged: true };
    localStorage.setItem('user', JSON.stringify(this.state));  
  }

  logout() { 
    this.state = { logged: false } 
    localStorage.setItem('user', JSON.stringify(this.state));
  }

  get logged() { return this.state.logged;  }
  get username() { return this.state.username }
}

