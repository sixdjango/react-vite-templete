import {
  AtButton,
  AtCard,
  AtCardContent,
  AtCardDescription,
  AtCardHeader,
  AtCardTitle,
  AtLabel,
  YcInput
} from '@yc-tech/react-component'

export const description =
  "A login form with email and password. There's an option to login with Google and a link to sign up if you don't have an account."

export function LoginPage() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <AtCard className="mx-auto max-w-sm">
        <AtCardHeader>
          <AtCardTitle className="text-2xl">Login</AtCardTitle>
          <AtCardDescription>Enter your email below to login to your account</AtCardDescription>
        </AtCardHeader>
        <AtCardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <AtLabel htmlFor="email">Email</AtLabel>
              <YcInput id="email" type="email" placeholder="m@example.com" required />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <AtLabel htmlFor="password">Password</AtLabel>
                <a href="#" className="ml-auto inline-block text-sm underline">
                  Forgot your password?
                </a>
              </div>
              <YcInput id="password" type="password" required />
            </div>
            <AtButton type="submit" className="w-full">
              Login
            </AtButton>
            <AtButton variant="outline" className="w-full">
              Login with Google
            </AtButton>
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{' '}
            <a href="#" className="underline">
              Sign up
            </a>
          </div>
        </AtCardContent>
      </AtCard>
    </div>
  )
}
