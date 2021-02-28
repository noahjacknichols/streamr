exports.ERROR = {
    NO_RESULT: "No document found for the request",
    PERMISSION_DENIED: "User does not have permissions for the request",
    BAD_BODY: "Incorrect body for this request",
    INVALID_TOKEN: "Invalid token was sent for the request. Please re-authenticate.",
    BAD_USER_CREDENTIALS: "Email or password was incorrect"
}

exports.CONSTANTS = {
    JWT_KEY: "Q7F4P4R89VXZOKVIVIQN"
}

exports.MODELS = {
    video: {
        state: ["LOCAL", "UPLOADED", "IN_PROGRESS", "COMPLETED"]
    }
}