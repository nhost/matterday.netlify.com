import NiceMatterForm from 'components/nice-matter-form'
import NiceSignInForm from 'components/nice-sign-in-form'
import { useAuthenticationStatus } from '@nhost/nextjs'

const Form = () => {
  const { isAuthenticated } = useAuthenticationStatus()
  return isAuthenticated ? <NiceMatterForm /> : <NiceSignInForm />
}

export default Form
