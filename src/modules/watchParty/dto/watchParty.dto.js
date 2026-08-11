// modules/watchParty/dto/watchParty.dto.js

class WatchPartyDTO {
  constructor(data = {}) {
    this.id = data.id;
    this.creator = data.creator;
    this.title = data.title;
    this.description = data.description;
    this.type = data.type;
    this.thumbnail = data.thumbnail;
    this.status = data.status;
    this.visibility = data.visibility;
    this.viewerCount = data.viewerCount;
    this.startedAt = data.startedAt;
    this.endedAt = data.endedAt;
    this.createdAt = data.createdAt;
  }

  static fromApi(data = {}) {
    return new WatchPartyDTO({
      id: data.id,
      creator: data.creator,
      title: data.title,
      description: data.description,
      type: data.type,
      thumbnail: data.thumbnail,
      status: data.status,
      visibility: data.visibility,
      viewerCount: data.viewerCount,
      startedAt: data.startedAt,
      endedAt: data.endedAt,
      createdAt: data.createdAt,
    });
  }

  static fromArray(items = []) {
    return items.map((item) => WatchPartyDTO.fromApi(item));
  }
}

export default WatchPartyDTO;