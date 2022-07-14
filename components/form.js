import NiceMatterForm from 'components/nice-matter-form'
import NiceSignInForm from 'components/nice-sign-in-form'
import { useAuthenticationStatus } from '@nhost/nextjs'

const Form = () => {
  const { isAuthenticated, isLoading } = useAuthenticationStatus()

  if (isLoading || !isAuthenticated) {
    return <NiceSignInForm />
  }

  return <NiceMatterForm />
}

export default Form
