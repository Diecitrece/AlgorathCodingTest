import styles from '../styles/Menu.module.css';
import { useRouter } from 'next/router';

export default function Menu() {
  const router = useRouter();

  return (
    <div className={styles.menu}>
      <div className={router.pathname == '/connect' ? styles.button_there : ''}>
        Create a connection
      </div>
      <div className={router.pathname == '/' ? styles.button_there : ''}>
        Home
      </div>
      <div
        className={router.pathname == '/registry' ? styles.button_there : ''}
      >
        Connection registry
      </div>
    </div>
  );
}
