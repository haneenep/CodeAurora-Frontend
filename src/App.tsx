import { useSelector } from "react-redux";
import UserRoutes from "./routes/UserRoutes";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { RootState } from "./redux/store";
import { useAppDispatch } from "./hooks/useRedux";
import { useEffect } from "react";
import { getUserDataAction } from "./redux/store/actions/auth/getUserDataAction";
import AdminRoutes from "./routes/AdminRoutes";
import { logoutAction } from "./redux/store/actions/auth/logoutAction";
import { useAuthServiceSocket } from "./hooks/useAuthServiceSocket";

function App() {
  const { data } = useSelector((state: RootState) => state.user);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!data) {
      dispatch(getUserDataAction());
    }
  }, [dispatch, data]);

  console.log(data?._id, "dataa usereerrrr idd");

  const socket = useAuthServiceSocket(data?._id);

  console.log("sockeeeeettt hereee", socket);

  useEffect(() => {
    if (!socket) return;

    const handleBlock = (data: any) => {
      console.log("User was blocked:", data);
      dispatch(logoutAction());
    };

    if (socket.connected) {
      socket.on("user-blocked", handleBlock);
    } else {
      socket.on("connect", () => {
        console.log("Waiting for socket to connect, then bind events");
        socket.on("user-blocked", handleBlock);
      });
    }

    return () => {
      socket.off("user-blocked", handleBlock);
    };
  }, [socket]);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/*" element={<UserRoutes />} />
          <Route path="/admin/*" element={<AdminRoutes />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
