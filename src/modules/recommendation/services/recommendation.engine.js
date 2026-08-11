// modules/recommendation/services/recommendation.engine.js

import recommendationAPI from "./recommendation.api";

class RecommendationEngine {

  constructor() {
    this.cache = [];
  }

  async load(limit = 20) {

    const { data } =
      await recommendationAPI.generate(limit);

    this.cache = Array.isArray(data)
      ? data
      : [];

    return this.cache;

  }

  getAll() {
    return this.cache;
  }

  byType(type) {

    return this.cache.filter(
      item => item.type === type
    );

  }

  creators() {
    return this.byType("creator");
  }

  businesses() {
    return this.byType("business");
  }

  posts() {
    return this.byType("post");
  }

  reels() {
    return this.byType("reel");
  }

  stories() {
    return this.byType("story");
  }

  podcasts() {
    return this.byType("podcast");
  }

  marketplace() {
    return this.byType("marketplace");
  }

  creatorHire() {
    return this.byType("creatorHire");
  }

  businessFind() {
    return this.byType("businessFind");
  }

  venues() {
    return this.byType("venue");
  }

  highestScore(limit = 10) {

    return [...this.cache]
      .sort((a, b) => b.score - a.score)
      .slice(0, limit);

  }

  async viewed(id) {

    await recommendationAPI.trackView(id);

    return true;

  }

  async clicked(id) {

    await recommendationAPI.trackClick(id);

    return true;

  }

  async stats() {

    const { data } =
      await recommendationAPI.stats();

    return data;

  }

}

export default new RecommendationEngine();