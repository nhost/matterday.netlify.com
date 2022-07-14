import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Filter from 'bad-words'
import Link from 'next/link'
import { nhost } from 'utils/nhost'
import { useInsertMatterMutation, useUserQuery } from 'utils/__generated__/graphql'

const MatterForm = () => {
  const [matter, setMatter] = useState('')
  const router = useRouter()

  const userSdk = nhost.auth.getUser()

  const { data, isSuccess, refetch } = useUserQuery(
    {
      id: userSdk?.id
    },
    {
      enabled: !!userSdk?.id
    }
  )

  useEffect(() => {
    // refetch query if `githhubLogin` is not yet populated.
    if (isSuccess && !data.user?.profile?.githubLogin) {
      console.log('refetching query')
      refetch()
    }
  })

  const insertMatterMutation = useInsertMatterMutation()

  if (!data) {
    return <div>No data received</div>
  }

  const { user } = data

  if (!user) {
    return <div>Unable to fetch user</div>
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      await insertMatterMutation.mutate({
        matter: {
          content: matter
        }
      })
    } catch (error) {
      alert(error)
    }
  }

  const handleSignOut = async () => {
    await nhost.auth.signOut()
  }

  if (insertMatterMutation.data?.insert_matters_one?.id) {
    router.push(`/matters/${insertMatterMutation.data.insert_matters_one.id}`)
  }

  return (
    <div className="logged-in">
      <span className="authentication">
        <a href={`https://github.com/${user.profile?.githubLogin}`}>
          <img
            src={user.avatarUrl}
            className="gh-avatar"
            alt={user.profile?.githubLogin}
            width="100"
            height="100"
            loading="lazy"
          />
        </a>

        <span className="gh-username">
          @
          <a href={`https://github.com/${user.profile?.githubLogin}`}>
            {user.profile?.githubLogin}
          </a>
        </span>

        <button className="text" onClick={handleSignOut}>
          Log out
        </button>
      </span>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <label htmlFor="matter">If I had an extra day a week I could...</label>
          <input
            type="text"
            name="matter"
            maxLength={28}
            onChange={(e) => setMatter(e.target.value)}
            value={matter}
          />
          <footer>
            <small className="characters">limit 28 characters</small>
            <button type="submit" disabled={insertMatterMutation.isLoading}>
              Submit
            </button>
          </footer>
          {insertMatterMutation.isError ? (
            <small className="error">{insertMatterMutation.error as string}</small>
          ) : null}
        </fieldset>
      </form>
      <div className="nudge">
        <p>
          Need some inspiration?{' '}
          <Link href="/matters">
            <a>See what others are saying.</a>
          </Link>
        </p>
      </div>
    </div>
  )
}

export default MatterForm
