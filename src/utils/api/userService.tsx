import { BaseApi } from "./baseApi";
import { LoginUserModel } from "../../models/loginUserModel";
class UserService extends BaseApi {
  constructor() {
    super("/Auth");
  }
  async login(data: LoginUserModel): Promise<any> {
    const response = await this.post<any>("/login", data);
    return response;
  }
  async logout(): Promise<any> {
    return this.post<any>("/logout");
  }

  async googleLogin(data: any): Promise<any> {
    window.location.href =
      "https://localhost:7051/api/Auth/external-login?provider=Google";
    return;
  }
  async googleLoginConfirm(): Promise<any> {
    const response = await this.get<any>("/me");
    return response;
  }

  async register(data: any): Promise<any> {
    return this.post<any>("/register", data);
  }

  async updateProfile(id: string, data: any): Promise<any> {
    return this.patch<any>(`/${id}`, data);
  }

  async getUserById(id: string): Promise<any> {
    return this.get<any>(`/${id}`);
  }
}
export const userService = new UserService();
