import { Request, Response } from 'express'
import { gqlSDK } from 'functions/_utils/gql-sdk'
import { webhookSecretIsCorrect } from 'functions/_utils/utils'
import { Octokit } from '@octokit/core'

const handler = async (req: Request, res: Response) => {
  if (!webhookSecretIsCorrect(req)) {
    return res.status(400).send('Incorrect webhook secret')
  }

  const insertedUser = req.body.event.data.new

  if (!insertedUser || !insertedUser.id) {
    return res.status(400).send('No user id')
  }

  // get user from database
  const { user } = await gqlSDK.getUser({
    id: insertedUser.id
  })

  if (!user) {
    return
  }

  // Init
  const octokit = new Octokit({
    auth: user?.userProviders[0]?.accessToken
  })

  // get user's  GitHub 'login' (username)
  const { data } = await octokit.request('GET /user', {})

  const githubLogin = data.login

  // create profile for user
  await gqlSDK.insertProfile({
    profile: {
      id: user.id,
      githubLogin
    }
  })

  res.status(200).send('Profile created for user')
}

export default handler
