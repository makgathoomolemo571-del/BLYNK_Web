// modules/businessFind/dto/businessFind.dto.js

export default class BusinessFindDTO {
  constructor(data = {}) {
    this.id = data.id || "";

    this.business = data.business || "";

    this.businessName = data.businessName || "";

    this.industry = data.industry || "";

    this.campaignName = data.campaignName || "";

    this.campaignObjectives =
      data.campaignObjectives || "";

    this.targetAudience =
      data.targetAudience || "";

    this.campaignBudget =
      Number(data.campaignBudget || 0);

    this.compensationType =
      data.compensationType || "";

    this.status =
      data.status || "draft";

    this.visibility =
      data.visibility || "public";

    this.applications =
      Array.isArray(data.applications)
        ? data.applications
        : [];

    this.createdAt = data.createdAt
      ? new Date(data.createdAt)
      : null;
  }

  get applicationCount() {
    return this.applications.length;
  }

  get isActive() {
    return this.status === "active";
  }

  get isClosed() {
    return this.status === "closed";
  }

  get isDraft() {
    return this.status === "draft";
  }

  get budget() {
    return Number(this.campaignBudget).toLocaleString();
  }
}