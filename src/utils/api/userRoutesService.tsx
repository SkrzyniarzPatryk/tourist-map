import { BaseApi } from "./baseApi";

interface Route {
  id: string;
  userId: string;
  routeList: Array<{ name: string; coordinates: [number, number] }>;
}

class UserRoutesService extends BaseApi {
  constructor() {
    super("/userroutes");
  }

  async getUserRoutes(userId: string): Promise<Route[]> {
    return this.get<Route[]>(`?userId=${userId}`);
  }

  async getRouteById(routeId: string): Promise<Route> {
    return this.get<Route>(`/${routeId}`);
  }

  async createRoute(route: Omit<Route, "id">): Promise<Route> {
    return this.post<Route>("/", route);
  }

  async updateRoute(routeId: string, route: Partial<Route>): Promise<Route> {
    return this.patch<Route>(`/${routeId}`, route);
  }

  async deleteRoute(routeId: string): Promise<void> {
    return this.delete<void>(`/${routeId}`);
  }
}

export const userRoutesService = new UserRoutesService();
