import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header/header";

export default function AppLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Header />
      <main className="sm:border-t-65 border-t-129 min-h-full border-[rgb(19_19_19/75%)]"> 
        {children}
      </main>
    </>
  );
}