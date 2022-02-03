import { Route, Routes } from "react-router-dom";
import Navigation from '../src/components/navigation';
import { SignIn, SignUp } from './pages/signInSignUp';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigation />}/>
        <Route path="/signIn" element={<SignIn />}/>
        <Route path="/signUp" element={<SignUp />}/>
      </Routes>
    </>
  );
}

export default App;
