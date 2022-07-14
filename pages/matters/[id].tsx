import { useRouter } from 'next/router'
import NiceMatter from 'components/nice-matter'
import { useGetMatterQuery } from 'utils/__generated__/graphql'

const Matter = () => {
  const router = useRouter()
  const { id } = router.query

  const { data, isLoading, isError, error } = useGetMatterQuery(
    {
      id
    },
    {
      enabled: !!id
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
