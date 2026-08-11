const FollowerDTO = (relationship) => ({

  id:
    relationship.id || relationship._id,

  user: {

    id:
      relationship.user?.id ||
      relationship.user?._id,

    username:
      relationship.user?.username,

    profilePicture:
      relationship.user?.profilePicture || null,

    verified:
      relationship.user?.verified || false,

    role:
      relationship.user?.role || "member"

  },

  targetUser: {

    id:
      relationship.targetUser?.id ||
      relationship.targetUser?._id,

    username:
      relationship.targetUser?.username,

    profilePicture:
      relationship.targetUser?.profilePicture || null,

    verified:
      relationship.targetUser?.verified || false,

    role:
      relationship.targetUser?.role || "member"

  },

  relationshipType:
    relationship.relationshipType,

  status:
    relationship.status,

  createdAt:
    relationship.createdAt

});

export default FollowerDTO;