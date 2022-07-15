import { useRouter } from 'next/router'
import NiceMatter from 'components/nice-matter'
import { useGetMatterQuery } from 'utils/__generated__/graphql'
import { dehydrate, QueryClient } from 'react-query'

type SSRProps = {
  params: {
    id: string
  }
}

export const getServerSideProps = async ({ params: { id } }: SSRProps) => {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery(
    useGetMatterQuery.getKey({ id }),
    useGetMatterQuery.fetcher({ id })
  )

  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient)))
    }
  }
}

const Matter = () => {
  const router = useRouter()
  const { id } = router.query

  const { data, isLoading } = useGetMatterQuery({
    id
  })

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
