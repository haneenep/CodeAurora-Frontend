import { ThemeProvider } from "./context/ThemeContext";
import Signin from "./pages/auth/Signin/Signin";
import Signup from "./pages/auth/Signup/Signup";

function App() {
  return (
    <>
      {/* <Signin/> */}
      <ThemeProvider>
        <Signup />
      </ThemeProvider>
    </>
  );
}

export default App;
