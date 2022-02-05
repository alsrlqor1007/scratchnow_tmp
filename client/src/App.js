import { Route, Routes } from "react-router-dom";
import Main from './pages/main';
import Painting from "./pages/painting";
import MyPage from "./pages/myPage";
import { SignIn, SignUp } from './pages/signInSignUp';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MyPage />}/>
        <Route path="/signIn" element={<SignIn />}/>
        <Route path="/signUp" element={<SignUp />}/>
        <Route path="/paint" element={<Painting />}/>
        <Route path="/myPage" element={<MyPage />}/>
      </Routes>
    </>
  );
}

export default App;
