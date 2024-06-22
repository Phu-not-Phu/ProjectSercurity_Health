import { useEffect, useState, useContext } from "react";
import AuthContext from "../../context/authProvider";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";

function Users() {
  const [user, setUser] = useState([]);
  const { auth } = useContext(AuthContext);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    // console.log("user.js file auth: " + JSON.stringify(auth));

    const getUsers = async () => {
      try {
        const respone = await axiosPrivate.get("/users/auths", {
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
          },
          signal: controller.signal,
        });

        if (isMounted) {
          setUser(respone.data);
        }
      } catch (error) {
        console.error("Lỗi: " + error);
        navigate("/login", { state: { from: location }, replace: true });
      }
    };

    getUsers();

    return () => {
      isMounted = false;
      isMounted && controller.abort();
    };
  }, []);

  return (
    <article>
      <h2>Users list</h2>
      {user?.length ? (
        <ul>
          {user.map((user, i) => (
            <li key={i}>{user?.user_email}</li>
          ))}
        </ul>
      ) : (
        <p>No users to display</p>
      )}
    </article>
  );
}

export default Users;
