const CREATOR_HIRE_STATUS = Object.freeze({

  OPEN: "open",

  CLOSED: "closed",

  COMPLETED: "completed"

});

const APPLICATION_STATUS = Object.freeze({

  PENDING: "pending",

  SHORTLISTED: "shortlisted",

  INTERVIEW: "interview",

  ACCEPTED: "accepted",

  REJECTED: "rejected"

});

const VISIBILITY = Object.freeze({

  PUBLIC: "public",

  MEMBERS: "members",

  SUBSCRIBERS: "subscribers"

});

const EXPERIENCE_LEVEL = Object.freeze({

  BEGINNER: "Beginner",

  INTERMEDIATE: "Intermediate",

  ADVANCED: "Advanced",

  EXPERT: "Expert"

});

const WORK_TYPE = Object.freeze({

  REMOTE: "Remote",

  HYBRID: "Hybrid",

  ONSITE: "On-site"

});

const BUDGET_TYPE = Object.freeze({

  FIXED: "Fixed",

  HOURLY: "Hourly",

  NEGOTIABLE: "Negotiable"

});

export {

  CREATOR_HIRE_STATUS,

  APPLICATION_STATUS,

  VISIBILITY,

  EXPERIENCE_LEVEL,

  WORK_TYPE,

  BUDGET_TYPE

};