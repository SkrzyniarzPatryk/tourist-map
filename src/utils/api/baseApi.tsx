import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

export class BaseApi {
  protected api: AxiosInstance;

  constructor(subUrl: string) {
    this.api = axios.create({
      baseURL: import.meta.env.VITE_API_BASE_URL + subUrl,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  protected async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.api.get<T>(url, config);
    return response.data;
  }

  protected async post<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    const response = await this.api.post<T>(url, data, config);
    return response.data;
  }

  protected async put<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    const response = await this.api.put<T>(url, data, config);
    return response.data;
  }

  protected async delete<T>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    const response = await this.api.delete<T>(url, config);
    return response.data;
  }
}