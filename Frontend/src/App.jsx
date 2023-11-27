import { Link, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import EditPage from "./pages/EditPage";
import DetailPage from "./pages/DetailPage";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  return(
    <div>
      <nav className="bg-slate-600">
        <div className="container p-2 mx-px w-40">
          <Link to="/"><h2 className="text-white text-2xl font-bold">React App</h2></Link>
        </div>
      </nav>

      <div className="container mx-auto p-2 h-full">
        <Routes>
          <Route index element={<HomePage />}></Route>
          <Route path="/create" element={<CreatePage />}></Route>
          <Route path="/edit/:id" element={<EditPage />}></Route>
          <Route path="/detail/:id" element={<DetailPage />}></Route>
        </Routes>
      </div>
      <ToastContainer />

    </div>
  )
}

export default App;