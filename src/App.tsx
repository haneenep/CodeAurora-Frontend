import { useSelector } from "react-redux";
import UserRoutes from "./routes/UserRoutes";
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import { RootState } from "./redux/store";
import { useAppDispatch } from "./hooks/useRedux";
import { useEffect } from "react";
import { getUserDataAction } from "./redux/store/actions/auth/getUserDataAction";

function App() {

  const {data} = useSelector((state: RootState) => state.user);

  const dispatch = useAppDispatch();

  console.log(data,"appdatas")

  useEffect(() => {
    if(!data){
      console.log("no user found ")
      dispatch(getUserDataAction());
    } else {
      console.log("else case logout")
    }
  },[dispatch, data])


  return (
    <>
    <Router>
      <Routes>
        <Route path="/*" element={<UserRoutes/>}/>
      </Routes>
    </Router>
    </>
  );
}

export default App;
