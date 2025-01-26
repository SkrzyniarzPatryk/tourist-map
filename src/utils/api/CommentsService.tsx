import { BaseApi } from "./baseApi";

class CommentsService extends BaseApi {
  constructor() {
    super("/comments");
  }

  async getCommentsByPointId(pointId: string): Promise<any[]> {
    const query = `?pointId=${pointId}`;
    return this.get<any[]>(query);
  }

  async addComment(comment: { pointId: string; userId: string; content: string; rating: number }): Promise<any> {
    return this.post<any>("", comment);
  }
}

export const commentsService = new CommentsService();
