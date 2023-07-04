export default /* GraphQL */ `
  # list scalar
  scalar DateTime

  type UserAdminCode {
    code: String
    sendAt: DateTime
    reason: [String]
  }
  input UserAdminCodeInput {
    code: String
    sendAt: DateTime
    reason: [String]
  }

  type UserAdmin {
    _id: String
    userEmail: String
    userCompleteName: String
    userPassword: String
    userPassCode: UserCode
    userVerifAccount: Boolean
    userPreferLang: String
    userStatusDelete: Boolean
    createdAt: DateTime
    dateUpdate: DateTime
    dateDelete: DateTime
    accessToken: String
    refreshToken: String
    tokenVersion: Int
    roles: [String]
  }

  input inputUserAdminAll {
    _id: String
    userEmail: String
    userCompleteName: String
    userPassword: String
    userPassCode: UserCodeInput
    userPreferLang: String
    userStatusDelete: Boolean
    userVerifAccount: Boolean
    createdAt: DateTime
    dateUpdate: DateTime
    dateDelete: DateTime
    roles: [String]
  }

  input inputAdminUser {
    _id: String
  }

  type UserAdminInfoIncorrect {
    messageErrorInfoIncorrect: String!
  }
  type UserAdminIntrouvable {
    messageErrorNotFound: String!
  }
  type UserAdminSupprime {
    messageErrorDel: String!
  }

  type UserAdminWrongID {
    messageErrorWrongID: String!
  }

  type UserAdminAccessCookieDenied {
    messageErrorErrAccessCookies: String!
  }

  type UserAdminNotVerified {
    messageErrorUserNotVerified: String!
  }

  type UserAdminVerified {
    messageErrorUserAlreadyVerified: String!
  }

  type UserAdminCodeIncorrect {
    messageErrorCodeIncorrect: String!
  }

  type UserAdminUpdateCookie {
    messageErrorUpdateCookie: String!
  }

  type UserAdminEmailUtilise {
    messageErrorEmailUsed: String!
  }

  union UserAdminResult =
      UserAdmin
    | UserAdminInfoIncorrect
    | UserAdminIntrouvable
    | UserAdminSupprime
    | UserAdminWrongID
    | UserAdminAccessCookieDenied
    | UserAdminNotVerified
    | UserAdminVerified
    | UserAdminCodeIncorrect
    | UserAdminUpdateCookie
    | UserAdminEmailUtilise

  input InputAdminConnexion {
    userEmail: String
    userPassword: String
  }

  type Query {
    findOneUser(input: inputAdminUser!): UserAdminResult!
    connexion(input: InputAdminConnexion): UserAdminResult!
  }

  input InputupdatePassword {
    userEmail: String!
    userPassCode: UserAdminCodeInput!
    userPassword: String!
  }
  input InputVerifCode {
    userEmail: String
    userPassCode: UserAdminCodeInput
  }
  input InputInscription {
    userEmail: String
    userPassword: String
    userPreferLang: String
    userCompleteName: String
    userPassCode: UserAdminCodeInput
    userVerifAccount: Boolean
    roles: [String]
  }

  type Mutation {
    inscription(input: InputInscription): UserAdminResult!
    verifCode(input: InputVerifCode): UserAdminResult!
    updatePassword(input: InputupdatePassword): UserAdminResult!
    logoutUser: Boolean!
    deleteUser(input: inputUserAdminAll!): Boolean!
    updateOneUser(input: inputUserAdminAll!): UserAdminResult!
  }
`
