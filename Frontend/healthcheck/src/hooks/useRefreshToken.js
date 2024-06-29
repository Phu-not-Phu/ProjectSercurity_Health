import axios from "../api/axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { setAuth } = useAuth([]);

  const refresh = async () => {
    // const response = await axios.get("/users/refresh", {
    //   withCredentials: true,
    // });

    // setAuth((prev) => {
    //   console.log(JSON.stringify(prev));
    //   console.log(response.data.accessToken);
    //   return {
    //     ...prev,
    //     user_email: response.data.user_email,
    //     accessToken: response.data.accessToken,
    //   };
    // });
    const result = await axios
      .get("/users/refresh", {
        withCredentials: true,
      })
      .then((response) => {
        console.log("Gì đó: ", response.data);
        setAuth((prev) => {
          console.log(JSON.stringify(prev));
          console.log(response.data.accessToken);
          return {
            ...prev,
            user_email: response.data.user_email,
            accessToken: response.data.accessToken,
          };
        });
        return response;
      });

      console.log("Result: ", result.data);  

    return result.data.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
