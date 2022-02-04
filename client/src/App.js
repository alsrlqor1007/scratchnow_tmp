import { Route, Routes } from "react-router-dom";
import Main from './pages/main';
import Painting from "./pages/painting";
import { SignIn, SignUp } from './pages/signInSignUp';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Painting />}/>
        <Route path="/signIn" element={<SignIn />}/>
        <Route path="/signUp" element={<SignUp />}/>
      </Routes>
    </>
  );
}

export default App;
