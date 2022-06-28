import { nhost } from 'utils/nhost'
import gql from 'graphql-tag'

import NiceMattersGrid from 'components/nice-matters-grid'

const Matters = ({ matters }) => {
  return <NiceMattersGrid matters={matters} />
}

export const getStaticProps = async () => {
  const GET_MATTERS = gql`
    query {
      matters(order_by: { created_at: asc }, limit: 1000) {
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

  const {
    data: { matters }
  } = await nhost.graphql.request(GET_MATTERS)

  return {
    props: {
      matters
    },
    revalidate: 60
  }
}

export default Matters
