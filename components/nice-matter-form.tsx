import { useRouter } from 'next/router'
import { useState } from 'react'
import Filter from 'bad-words'
import Link from 'next/link'
import { nhost } from 'utils/nhost'
import { useInsertMatterMutation, useUserQuery } from 'utils/__generated__/graphql'

const MatterForm = () => {
  const [matter, setMatter] = useState('')
  const [isRude, setIsRude] = useState(false)
  const filter = new Filter()
  const router = useRouter()

  const userSdk = nhost.auth.getUser()

  const { data, isLoading } = useUserQuery(
    {
      id: userSdk?.id
    },
    {
      refetchInterval: 500,
      enabled: !!userSdk?.id
    }
  )
  const insertMatterMutation = useInsertMatterMutation()

  if (!data) {
    return <div>User is not signed in</div>
  }

  const { user } = data

  if (!user) {
    return <div>User is not signed in</div>
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!user) {
      console.log('user is not signed in')
      return
    }

    const ret = await insertMatterMutation.mutate({
      matter: {
        content: matter
      }
    })

    alert('ok')
    console.log(ret)

    console.log(insertMatterMutation.isError)
    console.log(insertMatterMutation.data)

    if (insertMatterMutation.isError) {
      return
    }

    // const newMatter = insertMatterMutation.data?.insert_matters_one?.id
    // router.push(`/matters/${newMatter.id}`)
  }

  const handleSignOut = async () => {
    await nhost.auth.signOut()
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
