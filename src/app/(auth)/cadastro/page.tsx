import AuthForm from '@/components/layout/authForm'

export default function SignUpPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] w-full flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-4 overflow-hidden relative">
          
          <div className="w-full max-w-md relative z-10">
            <AuthForm/>
          </div>
        </div>
  )
}
