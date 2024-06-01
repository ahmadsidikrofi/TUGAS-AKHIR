import Sidebar from './Components/SideBar';
import './globals.css';
import { Poppins } from 'next/font/google';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/ui/theme-providers'
import { ApiProvider } from '@/context/ApiProvider';

const poppins = Poppins({ subsets: ['latin'], weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'] });

export const metadata = {
  title: 'Dashboard Jantung',
  description: 'Dashboard jantung gasss',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={poppins.className}>
      <body className="flex">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <ApiProvider>
            <Sidebar />
              <main className="mx-10">{children}</main>
            <Toaster />
          </ApiProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
