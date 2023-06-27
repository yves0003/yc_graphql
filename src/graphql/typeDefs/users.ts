export default /* GraphQL */ `
  scalar ISODate
  scalar ISOTime

  type SelectedDate {
    idCoursbyDate: String
    status: String
    cancelDate: ISODate
    cancelReason: String
  }
  type CoursPaye {
    idCours: String
    datePayment: ISODate
    selectedDate: SelectedDate
  }

  type User {
    _id: String
    name: String
    firstname: String
    numTel: String
    email: String
    dateCreation: ISODate
    dateUpdate: ISODate
    dateLastConnexion: ISODate
    coursPaye: [CoursPaye]
  }
  input SelectedDateInput {
    idCoursbyDate: String
    status: String
    cancelDate: ISODate
    cancelReason: String
  }
  input CoursPayeInput {
    idCours: String
    datePayment: ISODate
    selectedDate: SelectedDateInput
  }
  input UserInput {
    name: String
    firstname: String
    numTel: String
    email: String
    dateLastConnexion: ISODate
    coursPaye: [CoursPayeInput]
  }

  type UserDeleteErr {
    messageErrorUserDeleteErr: String!
  }
  type UserUpdateErr {
    messageErrorUserUpdateErr: String!
  }
  type UserCreateErr {
    messageErrorUserCreateErr: String!
  }
  type UserFindErr {
    messageErrorUserFindErr: String!
  }
  union UserResult = User | UserCreateErr | UserUpdateErr | UserDeleteErr | UserFindErr

  type Query {
    findOneUser(userId: String!): UserResult
  }
  type Mutation {
    createUser(inputUser: UserInput): UserResult!
    deleteUser(userId: String!): Boolean!
    updateUser(inputUser: UserInput, userId: String): UserResult!
  }
`
