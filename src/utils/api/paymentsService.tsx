import { PointModel } from "../../models/pointModel";
import { BaseApi } from "./baseApi";

class PaymentsService extends BaseApi {
  constructor() {
    super("/payments");
  }
  async startPayment(data: any): Promise<any> {
    const response = await this.post<any>("/create-order", data);
    return response;
  }

  async checkPaymentStatus(orderId: any): Promise<any> {
    const response = await this.post<any>("/capture-order", {
      payPalOrderId: orderId,
    });
    return response;
  }
}
export const paymentsService = new PaymentsService();
