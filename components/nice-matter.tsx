import Head from 'next/head'
import Link from 'next/link'
import Header from './header'
import ShareAnchor from './share-anchor'

import { MatterFragment } from 'utils/__generated__/graphql'

type NiceMatterProps = {
  matter: MatterFragment
}

const getOgImage = (matter: MatterFragment) => {
  if (!matter.user.profile) {
    console.log('no profile')
    return
  }

  const { githubLogin } = matter.user.profile
  const avatarUrlEncoded = btoa(matter.user.avatarUrl)
  const contentEncoded = encodeURIComponent(matter.content)

  return `https://res.cloudinary.com/nhost-test/image/upload/w_1280,h_669,c_fill,q_auto,f_auto/w_760,c_fit,co_rgb:ffffff,g_south_west/l_fetch:${avatarUrlEncoded}/w_65,h_65/r_max/fl_layer_apply,x_48,y_45,g_north_west/l_text:roboto_26:@${githubLogin},co_rgb:9ce9db,g_north_west,x_128,y_66/l_text:caveat_68:${contentEncoded},co_rgb:ffffff,y_115/v1657801627/matterday-bg_ggfbff.png`
}

const NiceMatter = ({ matter }: NiceMatterProps) => {
  if (!matter.user.profile) {
    return <></>
  }

  const ogImage = getOgImage(matter)

  console.log({ ogImage })

  return (
    <>
      <Head>
        <meta content={'https://matterday.netlify.com/matters/' + matter.id} property="og:url" />
        <meta
          content={'https://matterday.netlify.com/matters/' + matter.id}
          property="twitter:url"
        />
        <meta content={ogImage} property="og:image" />
        <meta content={ogImage} name="twitter:image" />
      </Head>
      <div className="your-matterday">
        <ShareAnchor />
        <Header />
        <section className="content">
          <div className="container">
            <div>
              <div className="eyebrow">
                <a href={`https://github.com/${matter.user.profile.githubLogin}`}>
                  <img
                    src={matter.user.avatarUrl}
                    className="gh-avatar"
                    alt={matter.user.profile.githubLogin}
                    width="100"
                    height="100"
                    loading="lazy"
                  />
                </a>

                <span className="gh-username">
                  @
                  <a href={`https://github.com/${matter.user.profile.githubLogin}`}>
                    {matter.user.profile.githubLogin}
                  </a>
                </span>
              </div>
              <h1>
                <span className="prompt">If I had an extra day a week I could…</span>
                <span className="answer">{matter.content}</span>
              </h1>
              <div className="share nudge">
                <p>
                  <a
                    href={
                      'https://twitter.com/intent/tweet?text=Matterday is the new “someday.” Here’s what I’d do if I had an extra day a week.&hashtags=Matterday&url=https://matterday-nhost.netlify.com/matters/' +
                      matter.id
                    }
                  >
                    Tweet your #Matterday
                  </a>{' '}
                  or{' '}
                  <Link href="/matters">
                    <a>see what others are saying</a>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default NiceMatter
