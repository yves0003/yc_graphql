export default /* GraphQL */ `
  # list scalar
  scalar ISODate

  type UserAdminCode {
    code: String
    sendAt: ISODate
    reason: [String]
  }
  input UserAdminCodeInput {
    code: String
    sendAt: ISODate
    reason: [String]
  }

  type UserAdmin {
    _id: String
    userEmail: String
    userCompleteName: String
    userPassword: String
    userPassCode: UserAdminCode
    userVerifAccount: Boolean
    userPreferLang: String
    userStatusDelete: Boolean
    createdAt: ISODate
    dateUpdate: ISODate
    dateDelete: ISODate
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
    userPassCode: UserAdminCodeInput
    userPreferLang: String
    userStatusDelete: Boolean
    userVerifAccount: Boolean
    createdAt: ISODate
    dateUpdate: ISODate
    dateDelete: ISODate
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

  input InputAdminConnexion {
    userEmail: String
    userPassword: String
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

  type Query {
    findOneAdminUser(input: inputAdminUser!): UserAdminResult!
    connexion(input: InputAdminConnexion): UserAdminResult!
  }

  type Mutation {
    inscription(input: InputInscription): UserAdminResult!
    verifCode(input: InputVerifCode): UserAdminResult!
    updatePassword(input: InputupdatePassword): UserAdminResult!
    logoutUser: Boolean!
    deleteAdminUser(input: inputUserAdminAll!): Boolean!
    updateOneAdminUser(input: inputUserAdminAll!): UserAdminResult!
  }
`
