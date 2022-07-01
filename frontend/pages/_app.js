import '../styles/globals.css';
import Menu from '../components/menu.js';
import '@fortawesome/fontawesome-free/css/all.css';

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
