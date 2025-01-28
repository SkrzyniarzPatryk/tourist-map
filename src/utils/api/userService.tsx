import { BaseApi } from "./baseApi";
import { LoginUserModel } from "../../models/loginUserModel";
class UserService extends BaseApi {
  constructor() {
    super("/users");
  }
  async login(data: LoginUserModel): Promise<any> {
    const query = `?username=${data.username}&password=${data.password}`;
    let response = await this.get<any>(query);
    return response.length == 1 ? response : false;
  }
  async register(data: any): Promise<any> {
    return this.post<any>("/", data);
  }

  async updateProfile(id: string, data: any): Promise<any> {
    return this.patch<any>(`/${id}`, data);
  }

  async getUserById(id: string): Promise<any> {
    return this.get<any>(`/${id}`);
  }
}
export const userService = new UserService();
