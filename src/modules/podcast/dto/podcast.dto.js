// modules/podcast/dto/podcast.dto.js

export default class PodcastDTO {

  constructor(data = {}) {

    this.id = data.id;

    this.creator = data.creator;

    this.name = data.name;

    this.description = data.description;

    this.category = data.category;

    this.coverImage = data.coverImage;

    this.visibility = data.visibility;

    this.totalEpisodes = data.totalEpisodes;

    this.totalViews = data.totalViews;

    this.totalListeners = data.totalListeners;

    this.createdAt = data.createdAt;

  }

  static fromApi(data) {

    return new PodcastDTO(data);

  }

}