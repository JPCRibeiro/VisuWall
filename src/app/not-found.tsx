import Header from '@/components/layout/header/header';
import { Button } from '@/components/ui/button';
import { Angry, Frown, ThumbsDown } from 'lucide-react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <>
    <Header/>
    <div className="flex w-full items-center justify-center min-h-[calc(100vh-128px)] sm:min-h-[calc(100vh-64px)] text-white flex-col p-2.5 text-center">
      
      <p className="mb-2.5">404</p>
      <h2 className="text-white text-[36px] font-medium">
        Oops! Página não encontrada
      </h2>
      <p className="text-[20px] text-gray-400">
        A página que você está procurando não existe.
      </p>
      <div className="mt-5">
        <Button asChild size="lg" className='border-none! font-semibold rounded-full'>
          <Link href="/" >
            Voltar à página inicial
          </Link>
        </Button>
      </div>
    </div></>
  );
}