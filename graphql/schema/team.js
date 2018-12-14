exports.types = `
  type Team {
    id: ID
    name: String
    country: String,
    pictureData: PictureData
    players: [Player]
  }

  type PictureData {
    public_id: ID
    url: String
    secure_url: String
  }

  input fileInput {
    name: String
    type: String
    size: Int
    path: String
  }
`

exports.queries = `
  team ( id: ID! ): Team
  teams ( page: Int! ): [Team]
`

exports.mutations = `
  createTeam ( name: String!, country: String!, file: fileInput ): Team
`