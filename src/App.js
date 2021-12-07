import './App.css';
import {BrowserRouter as Router} from "react-router-dom"
import {Routes} from "react"

function App() {
  return (
   <Router>
     <Routes>
     <PrivateRoute path="/admin" element={<AdminLayout/>}/>
     <Route path="/" element={<PublicLayout/>}
     </Routes>
   </Router>
  );
}

export default App;
