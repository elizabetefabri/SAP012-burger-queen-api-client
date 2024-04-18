import { Login } from "src/Models/Login";

export function formatLogin(apiLoginData: any): Login{
  const urlAuth = 'https://burger-queen-api-mock.up.railway.app';

  return {
    id: apiLoginData.id,
    email: apiLoginData.email,
    senha: apiLoginData.password
  }
}
