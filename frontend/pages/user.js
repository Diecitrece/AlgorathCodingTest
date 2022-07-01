import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css';
import Loading from '../components/loading';
export default function User() {
  const [userData, setUserData] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [connectionsData, setConnectionsData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');
  const [createUserConnection, setCreateUserConnection] =
    useState('Select one user');
  const router = useRouter();
  const id = router.query['id'];

  const loadAllUsers = () => {
    if (!connectionsData) return;
    let url = `${process.env.NEXT_PUBLIC_API_ROUTE}/api/users`;
    const response = fetch(url, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((data) => {
        setAllUsers(data);
      })
      .catch((error) => console.log(error));
  };
  const loadData = () => {
    if (!router.isReady) return;
    let url = `${process.env.NEXT_PUBLIC_API_ROUTE}/api/users/${id}`;
    const response = fetch(url, {
      method: 'GET',
    })
      .then(async (response) => {
        if (response.status === 200) {
          setUserData(await response.json());
          return;
        }
        if (response.status === 404) {
          alert(await response.text());
          return;
        }
        console.log('Internal error');
        return;
      })
      .catch((error) => console.log(error));
  };
  const loadConnectionsData = () => {
    if (!router.isReady) return;
    let url = `${process.env.NEXT_PUBLIC_API_ROUTE}/api/users/connections/${id}`;
    const response = fetch(url, {
      method: 'GET',
    })
      .then(async (response) => {
        if (response.status === 200) {
          setConnectionsData(await response.json());
          setLoading(false);
          return;
        }
        if (response.status === 404) {
          alert(await response.text());
          return;
        }
        console.log('Internal error');
        return;
      })
      .catch((error) => console.log(error));
  };
  const toggleConnection = async (idUser) => {
    if (idUser == 'Select one user') {
      alert('Select one user to connect with');
      return;
    }
    let url = `${process.env.NEXT_PUBLIC_API_ROUTE}/api/users/connect`;
    const response = fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id1: id,
        id2: idUser,
      }),
    })
      .then(async (response) => {
        if (response.status === 201) {
          loadConnectionsData();
          return;
        }
        if (response.status === 400) {
          alert(await response.text());
          return;
        }
        console.log('Internal error');
      })
      .catch((error) => console.log(error));
  };

  useEffect(loadData, [router.isReady]);
  useEffect(loadConnectionsData, [router.isReady]);
  useEffect(loadAllUsers, [connectionsData]);

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
        <div className="flex flex-col w-full h-full">
          <div className={styles.mainUser}>
            <span className="text-cyan-300 font-bold">{userData.name}</span>
            <i className="fa-solid fa-arrow-right mx-5"></i> Connections
          </div>
          <div className="showbox">
            <div className={styles.usermenu}>
              <div className={`${styles.menusection} bg-blue-500`}>
                Search for a user
                <br />
                <input
                  className={styles.input}
                  value={filter}
                  onChange={(e) => {
                    setFilter(e.target.value);
                  }}
                  type="text"
                />
                <div
                  className="text-black bg-white w-20 m-auto p-2 my-1 rounded-lg cursor-pointer"
                  onClick={(e) => {
                    setFilter('');
                  }}
                >
                  Clear
                </div>
              </div>
              <div className={`${styles.menusection} bg-green-500`}>
                Create new connection <br></br>with {userData.name}
                <br />
                <select
                  className={styles.input}
                  value={createUserConnection}
                  onChange={(e) => {
                    setCreateUserConnection(e.target.value);
                  }}
                >
                  <option disabled>Select one user</option>
                  {allUsers.map((user, key) => {
                    return (
                      <option key={key} value={user.id}>
                        {user.name}
                      </option>
                    );
                  })}
                </select>
                <div
                  className="text-black bg-white w-20 m-auto p-2 my-1 rounded-lg cursor-pointer"
                  onClick={(e) => {
                    toggleConnection(createUserConnection);
                    setCreateUserConnection('Select one user');
                  }}
                >
                  <i className="fa-solid fa-plug"></i>
                </div>
              </div>
            </div>
            <div className={styles.userbox}>
              {connectionsData.map((user, key) => {
                if (filter != '') {
                  if (user.name.includes(filter)) {
                    return (
                      <div
                        key={key}
                        title={`Disconnect ${user.name}`}
                        className={styles.user}
                        onClick={(e) => {
                          toggleConnection(user.id);
                        }}
                      >
                        {user.name}
                      </div>
                    );
                  }
                } else {
                  return (
                    <div
                      key={key}
                      title={`Disconnect ${user.name} and ${userData.name}`}
                      className={styles.user}
                      onClick={(e) => {
                        toggleConnection(user.id);
                      }}
                    >
                      {user.name}
                    </div>
                  );
                }
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
