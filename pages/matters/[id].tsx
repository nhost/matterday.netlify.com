import { useRouter } from 'next/router'
import NiceMatter from 'components/nice-matter'
import { useGetMatterQuery, useGetMattersQuery } from 'utils/__generated__/graphql'
import { useAuthenticationStatus } from '@nhost/react'

const Matter = () => {
  const router = useRouter()
  const { id } = router.query

  const { isLoading: authIsLoading } = useAuthenticationStatus()

  // wait until we know if the user is signed in or not to fetch the matter
  const { data, isLoading } = useGetMatterQuery(
    {
      id
    },
    {
      enabled: !authIsLoading
    }
  )

  if (!data || isLoading) {
    return <div>Loading...</div>
  }

  const { matter } = data

  if (!matter) {
    return <div>No matter found</div>
  }

  return <NiceMatter matter={matter} />
}

export default Matter
