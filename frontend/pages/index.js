import { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css';
import Loading from '../components/loading';
import { useRouter } from 'next/router';
export default function Home() {
  const [userData, setUserData] = useState();
  const [filter, setFilter] = useState('');
  const [createUserName, setCreateUserName] = useState('');
  const [isLoading, setLoading] = useState(true);
  const router = useRouter();
  const loadData = () => {
    let url = `${process.env.NEXT_PUBLICAPI_ROUTE}/api/users`;
    const response = fetch(url, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((data) => {
        setUserData(data);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  };

  useEffect(loadData, []);

  const createUser = (name) => {
    if (name != '') {
      let url = `${process.env.NEXT_PUBLIC_API_ROUTE}/api/users`;
      const response = fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
        }),
      })
        .then(async (response) => {
          if (response.status === 201) {
            loadData();
            return;
          }
          if (response.status === 400) {
            alert(await response.text());
            return;
          }
          console.log('Internal error');
        })
        .catch((error) => console.log(error));
    }
  };

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
            Create new user
            <br />
            <input
              className={styles.input}
              type="text"
              value={createUserName}
              onChange={(e) => {
                setCreateUserName(e.target.value);
              }}
            />
            <div
              className="text-black bg-white w-20 m-auto p-2 my-1 rounded-lg cursor-pointer"
              onClick={(e) => {
                createUser(createUserName);
                setCreateUserName('');
              }}
            >
              Create
            </div>
          </div>
        </div>
        <div className={styles.userbox}>
          {userData.map((user, key) => {
            if (filter != '') {
              if (user.name.includes(filter)) {
                return (
                  <div
                    key={key}
                    className={styles.user_home}
                    onClick={(e) => {
                      router.push({
                        pathname: '/user',
                        query: { id: user.id },
                      });
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
                  className={styles.user_home}
                  onClick={(e) => {
                    router.push({
                      pathname: '/user',
                      query: { id: user.id },
                    });
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
  );
}
