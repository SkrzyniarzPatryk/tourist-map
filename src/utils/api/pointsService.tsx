import { PointModel } from "../../models/pointModel";
import { BaseApi } from "./baseApi";

class PointsService extends BaseApi {
  constructor() {
    super("/points");
  }

  async getAllPoints(): Promise<PointModel[]> {
    return this.get<PointModel[]>("");
  }

  async getPaginatedPagePoints(paginatedQuery): Promise<PointModel[]> {
    let query =
      "?_page=" + paginatedQuery.page + "&_per_page=" + paginatedQuery.pageSize;
    return this.get<PointModel[]>(query);
  }
  async getPointById(id: number): Promise<PointModel> {
    let query = "?id=" + id;
    return this.get<PointModel>(query);
  }
  

  async addPoint(point: PointModel): Promise<PointModel> {
    point.rating = 0;
    point.reviews = 0;
    return this.post<PointModel>("", point);
  }
  
}
export const pointsService = new PointsService();
