const FriendDTO = (user) => ({

  id: user.id || user._id,

  username: user.username,

  profilePicture:
    user.profilePicture || null,

  verified:
    user.verified || false,

  role:
    user.role || "member"

});

export default FriendDTO;