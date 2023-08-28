import Nav from '@components/Nav';
import BottomBar from '@components/BottomBar';
import '@styles/globals.css';
import { ClerkProvider } from '@clerk/nextjs';

export const metadata = {
  title: 'WordsAndQuotes',
  description: 'A useful and funny system to store words and quotes daily',
};

const RootLayout = ({ children }: any) => {
  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
    >
      <html lang="en">
        <body>
          <div className="main">
            <div className="gradient" />
          </div>

          <main className="app">
            <Nav />
            {children}
            <BottomBar />
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
};

export default RootLayout;
