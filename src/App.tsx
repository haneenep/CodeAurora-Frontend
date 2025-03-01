import { useSelector } from "react-redux";
import UserRoutes from "./routes/UserRoutes";
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import { RootState } from "./redux/store";
import { useAppDispatch } from "./hooks/useRedux";
import { useEffect } from "react";
import { getUserDataAction } from "./redux/store/actions/auth/getUserDataAction";
import AdminRoutes from "./routes/AdminRoutes";
import { logoutAction } from "./redux/store/actions/auth/logoutAction";

function App() {

  const {data} = useSelector((state: RootState) => state.user);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if(!data){
      dispatch(getUserDataAction());
    } else if(data.isBlocked) {
      dispatch(logoutAction());
    }
  },[dispatch, data])


  return (
    <>
    <Router>
      <Routes>
        <Route path="/*" element={<UserRoutes/>}/>
        <Route path="/admin/*" element={<AdminRoutes/>}/>
      </Routes>
    </Router>
    </>
  );
}

export default App;
