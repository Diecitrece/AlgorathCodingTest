import styles from '../styles/Menu.module.css';
import { useRouter } from 'next/router';

export default function Menu() {
  const router = useRouter();
  return (
    <div className={styles.menu}>
      <div
        className={router.pathname == '/' ? styles.button_there : ''}
        onClick={(e) => {
          router.push('/');
        }}
      >
        Home
      </div>
      <div
        className={router.pathname == '/registry' ? styles.button_there : ''}
        onClick={(e) => {
          router.push('/registry');
        }}
      >
        Connection registry
      </div>
    </div>
  );
}
