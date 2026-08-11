// modules/marketplace/dto/marketplace.dto.js

class MarketplaceDTO {
  constructor(data = {}) {
    this.id = data.id;

    this.creator = data.creator;

    this.listingType = data.listingType;

    this.title = data.title;

    this.category = data.category;

    this.description = data.description;

    this.price = data.price;

    this.budgetRange = data.budgetRange;

    this.location = data.location;

    this.visibility = data.visibility;

    this.applicationCount = data.applicationCount || 0;

    this.createdAt = data.createdAt;
  }
}

export default MarketplaceDTO;