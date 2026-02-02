import AuthForm from "@/components/layout/authForm";

export default function LoginUpPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] w-full flex items-center justify-center bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 p-4 overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-200 bg-linear-to-r from-blue-500/10 to-indigo-500/10 rounded-full blur-3xl" />
      </div>
      <div className="w-full max-w-md relative z-10">
        <AuthForm/>
      </div>
    </div>
  );
}
