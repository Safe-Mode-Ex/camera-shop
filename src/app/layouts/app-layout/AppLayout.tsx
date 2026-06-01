import type {ReactNode} from 'react';
import Footer from './footer/Footer';
import Header from './header/Header';

interface Props {
  children: ReactNode;
}

function AppLayout({children}: Props) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}

export default AppLayout;
