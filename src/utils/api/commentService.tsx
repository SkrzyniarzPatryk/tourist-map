import { BaseApi } from "./baseApi";

class CommentsService extends BaseApi {
  constructor() {
    super("/comments");
  }
  async getCommentsByPoinId(id: string): Promise<any> {
    let query = "?pointId=" + id;
    return await this.get<any>(query);
  }
  async getCommentsByUserId(id: string): Promise<any> {
    let query = "?userId=" + id;
    return await this.get<any>(query);
  }
  // "pointId": "1",
  // "userId": "f09e",
  // "content": "Bardzo fajne miejsce",
  // "rating": 5
  async addComment(commentModel: any) {
    return await this.post<any>("/", commentModel);
  }

  async removeComment(id: string) {
    return await this.delete<any>("/" + id);
  }
  /**do zmiany podajemy id i zmianę np. {"rating":2} */
  async changeComment(id: string, changeCommentModel: any) {
    return await this.patch<any>("/" + id, changeCommentModel);
  }
}
export const commentsService = new CommentsService();
