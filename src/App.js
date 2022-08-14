import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./Pages/Home";
import TvShows from "./Pages/TvShows";
import Movies from "./Pages/Movies";
import Details from "./Pages/Details";
import ScrollToTop from "./components/ScrollToTop";
import ActorDetails from "./Pages/ActorDetails";
import ShowDetails from "./Pages/ShowDetails";
import Search from "./Pages/Search";
import Login from "./Pages/Login";
import Account from "./Pages/Account";
import Signup from "./Pages/Signup";
import ForgotPassword from "./Pages/ForgotPassword";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <div>
      <Router>
        <ScrollToTop />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tvshows" element={<TvShows />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/details/:id" element={<Details />} />
          <Route path="/actordetails/:id" element={<ActorDetails />} />
          <Route path="/showdetails/:id" element={<ShowDetails />} />
          <Route path="/search" element={<Search />} />
          <Route path="/login" element={<Login />} />
          <Route path="/account" element={<ProtectedRoute />}>
            <Route path="/account" element={<Account />} />
          </Route>
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;
