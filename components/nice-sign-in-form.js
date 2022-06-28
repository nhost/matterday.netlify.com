import Link from 'next/link'
import { nhost } from 'utils/nhost'

const NiceSignInForm = () => {
  const handleSignIn = async () => {
    await nhost.auth.signIn({
      provider: 'github'
    })
  }

  return (
    <div className="not-logged-in">
      <h2>So tell us, what does your Matterday look like?</h2>
      <div className="authentication-cta">
        <p>Log in to share what you could do with an extra day.</p>
        <button onClick={handleSignIn} className="button">
          Log in with GitHub
        </button>
      </div>
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

export default NiceSignInForm
