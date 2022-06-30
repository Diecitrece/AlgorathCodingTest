import '../styles/globals.css';
import Menu from '../components/menu.js';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <div className="content">
        <Menu />
        <Component {...pageProps} />
      </div>
    </>
  );
}

export default MyApp;
