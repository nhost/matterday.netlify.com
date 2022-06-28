import { useRouter } from 'next/router'
import { useState } from 'react'
import Filter from 'bad-words'
import Link from 'next/link'
import { nhost } from 'utils/nhost'
import gql from 'graphql-tag'

const MatterForm = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [matter, setMatter] = useState('')
  const [isRude, setIsRude] = useState(false)
  const filter = new Filter()
  const router = useRouter()

  const user = nhost.auth.getUser()

  const avatarUrl = user.avatarUrl || null
  const displayName = user.displayName || null

  const handleSubmit = async (e) => {
    e.preventDefault()

    setError(null)
    setIsLoading(true)

    const { matter } = Object.fromEntries(new FormData(e.target))

    const INSERT_MATTER = gql`
      mutation insertMatter($matter: matters_insert_input!) {
        insert_matters_one(object: $matter) {
          id
        }
      }
    `

    const { data, error } = await nhost.graphql.request(INSERT_MATTER, {
      matter: {
        content: matter
      }
    })

    setIsLoading(false)

    if (error) {
      setError(error.message)
      return
    }

    const newMatter = data.insert_matters_one

    router.push(`/matters/${newMatter.id}`)
  }

  const handleSignOut = async () => {
    await nhost.auth.signOut()
  }

  filter.removeWords('butt', 'fart')

  const handleChange = (e) => {
    setIsRude(false)
    setError(null)

    const matter = e.currentTarget.value
    setMatter(matter)

    if (filter.isProfane(matter)) {
      setIsRude(true)
      setError(
        'Whoops, you did a swear! Let’s keep it family-friendly, kind, and inclusive please.'
      )
    }
  }

  return (
    <div className="logged-in">
      <span className="authentication">
        {displayName && avatarUrl ? (
          <img src={avatarUrl} className="gh-avatar" alt={displayName} width="100" height="100" />
        ) : null}
        {displayName ? <span className="github-username">@{displayName}</span> : null}
        <button className="text" onClick={handleSignOut}>
          Log out
        </button>
      </span>
      <form onSubmit={handleSubmit} disabled={isLoading || isRude}>
        <fieldset>
          <label htmlFor="matter">If I had an extra day a week I could...</label>
          <input type="text" name="matter" maxLength={28} onChange={handleChange} value={matter} />
          <footer>
            <small className="characters">limit 28 characters</small>
            <button type="submit" disabled={isLoading || isRude}>
              Submit
            </button>
          </footer>
          {error ? <small className="error">{error}</small> : null}
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
