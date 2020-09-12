const gql = require('graphql-tag')
const { buildASTSchema } = require('graphql')


const schema = buildASTSchema(gql`
  type Query {
    user: User
  }

  type User {
    name: String
    email: String
  }
`)

const rootValue = {
  user: () => ({ name: 'Ayan', email: 'ayanb1999@gmmail.com' })
}

module.exports = {
  schema, rootValue
}
