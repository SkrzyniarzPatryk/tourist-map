import { PointModel } from "../../models/pointModel";
import { BaseApi } from "./baseApi";

class PointsService extends BaseApi {
  constructor() {
    super("/points");
  }

  async getAllPoints(): Promise<PointModel[]> {
    return this.get<PointModel[]>("");
  }
}
export const pointsService = new PointsService();
