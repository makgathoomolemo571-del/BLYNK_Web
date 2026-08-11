// modules/search/dto/search.dto.js

class SearchDTO {

  constructor(data = {}) {

    this.users =
      data.users.map(user => ({
        id: user.id || user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        verified: user.verified
      }));

    this.creators =
      data.creators.map(user => ({
        id: user.id || user._id,
        username: user.username,
        verified: user.verified
      }));

    this.businesses =
      data.businesses.map(user => ({
        id: user.id || user._id,
        username: user.username,
        verified: user.verified
      }));

    this.posts = data.posts;

    this.reels = data.reels;

    this.podcasts = data.podcasts;

    this.marketplace =
      data.marketplace;

    this.creatorHires =
      data.creatorHires;

    this.businessFinds =
      data.businessFinds;

  }

}

export default SearchDTO;