import { BaseApi } from "./baseApi";
import { LoginUserModel } from "../../models/loginUserModel";
class UserService extends BaseApi {
  constructor() {
    super("/users");
  }
  async login(data: LoginUserModel): Promise<any> {
    const query = `?username=${data.username}&password=${data.password}`;
    if ((await this.get<any>(query)).length == 1) return true;
    else return false;
  }
  async register(email: string, password: string): Promise<any> {}
}
export const userService = new UserService();
