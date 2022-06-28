import gql from 'graphql-tag'

import { nhost } from 'utils/nhost'

import NiceMatter from 'components/nice-matter'
import { getNhostSession } from '@nhost/nextjs'

const Matter = ({ matter }) => {
  return <NiceMatter matter={matter} />
}

export async function getServerSideProps(context) {
  const nhostSession = await getNhostSession('http://localhost:1337', context)

  const {
    params: { id }
  } = context

  const GET_MATTER = gql`
    query getMatter($id: uuid!) {
      matter: matters_by_pk(id: $id) {
        id
        content
        user {
          id
          avatarUrl
          displayName
        }
      }
    }
  `

  let headers = {}

  if (nhostSession) {
    headers = {
      Authorization: `Bearer ${nhostSession.accessToken}`
    }
  }

  const {
    data: { matter },
    error
  } = await nhost.graphql.request(
    GET_MATTER,
    {
      id
    },
    {
      headers
    }
  )

  return {
    props: {
      matter
    }
  }
}

export default Matter
