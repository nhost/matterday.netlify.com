import NiceMattersGrid from 'components/nice-matters-grid'
import { useGetMattersQuery } from 'utils/__generated__/graphql'

const Matters = () => {
  const { data, isLoading } = useGetMattersQuery()

  if (!data || isLoading) {
    return <div>Loading</div>
  }

  const { matters } = data

  return <NiceMattersGrid matters={matters} />
}

export default Matters
