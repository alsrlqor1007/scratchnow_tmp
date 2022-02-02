import { Route, Routes } from "react-router-dom";
import Navigation from '../src/components/navigation';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigation />}/>
      </Routes>
    </>
  );
}

export default App;
