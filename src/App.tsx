import UserRoutes from "./routes/UserRoutes";
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";

function App() {
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
