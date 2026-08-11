// modules/verification/services/verification.service.js

import verificationAPI from "./verification.api";

class VerificationService {

  async submit(payload) {

    const { data } =
      await verificationAPI.submit(payload);

    return data;

  }

  async getMine() {

    const { data } =
      await verificationAPI.getMine();

    return data;

  }

  async approve(id) {

    const { data } =
      await verificationAPI.approve(id);

    return data;

  }

  async reject(
    id,
    rejectionReason
  ) {

    const { data } =
      await verificationAPI.reject(
        id,
        rejectionReason
      );

    return data;

  }

  async getAll() {

    const { data } =
      await verificationAPI.getAll();

    return data;

  }

  async stats() {

    const { data } =
      await verificationAPI.getStats();

    return data;

  }

}

export default new VerificationService();