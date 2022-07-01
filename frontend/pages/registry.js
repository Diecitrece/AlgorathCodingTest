import { useEffect, useState } from 'react';
import styles from '../styles/Registry.module.css';
import Loading from '../components/loading';
export default function Registry() {
  const [isLoading, setLoading] = useState(true);
  const [connectionsData, setConnectionsData] = useState();
  const loadData = () => {
    let url = `${process.env.NEXT_PUBLIC_API_ROUTE}/api/users/connections`;
    const response = fetch(url, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((data) => {
        setConnectionsData(data);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  };

  useEffect(loadData, []);
  if (isLoading) {
    return (
      <div className="main">
        <div className="showbox">
          <Loading />
        </div>
      </div>
    );
  }
  return (
    <div className="main">
      <div className="showbox">
        <div className={styles.biglist}>
          {connectionsData.map((user, keyUser) => {
            return (
              <div key={keyUser} className={styles.user}>
                <span>
                  <span className="text-cyan-300 font-bold inline">
                    {user.name}
                  </span>{' '}
                  has {user.connections.length} connections
                </span>
                {user.connections.map((connection, keyConnection) => {
                  return (
                    <div key={keyConnection} className={styles.connection}>
                      <li>{connection.name}</li>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
