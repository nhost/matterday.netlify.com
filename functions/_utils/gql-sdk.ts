import { GraphQLClient } from 'graphql-request'
import { getSdk } from './__generated__/graphql-request'

const client = new GraphQLClient(`${process.env.NHOST_BACKEND_URL}/v1/graphql`, {
  headers: {
    'x-hasura-admin-secret': process.env.NHOST_ADMIN_SECRET as string
  }
})
export const gqlSDK = getSdk(client)
export const gqlClient = client
