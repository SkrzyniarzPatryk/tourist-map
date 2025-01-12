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
}
export const pointsService = new PointsService();
