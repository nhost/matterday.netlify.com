import { Request } from 'express'

export function webhookSecretIsCorrect(req: Request): boolean {
  if (req.headers['nhost-webhook-secret'] !== process.env.NHOST_WEBHOOK_SECRET) {
    return false
  }
  return true
}
