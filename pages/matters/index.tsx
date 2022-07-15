import { useAuthenticationStatus } from '@nhost/nextjs'
import NiceMattersGrid from 'components/nice-matters-grid'
import { nhost } from 'utils/nhost'
import { useGetMattersQuery } from 'utils/__generated__/graphql'

const Matters = () => {
  const { data, isLoading } = useGetMattersQuery()
  const { isAuthenticated } = useAuthenticationStatus()

  if (!data || isLoading) {
    return <div>Loading</div>
  }

  const matters = data.matters.filter(
    (matter) =>
      matter.status === 'approved' ||
      (isAuthenticated && matter.user.id === nhost.auth.getUser()?.id)
  )

  return <NiceMattersGrid matters={matters} />
}

export default Matters
