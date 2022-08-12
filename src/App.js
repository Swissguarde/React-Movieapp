import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Profile from "./Pages/Profile";
import TvShows from "./Pages/TvShows";
import Movies from "./Pages/Movies";
import Details from "./Pages/Details";
import ScrollToTop from "./components/ScrollToTop";
import ActorDetails from "./Pages/ActorDetails";
import ShowDetails from "./Pages/ShowDetails";
import Search from "./Pages/Search";
import { AuthContextProvider } from "./context/AuthContext";
import Login from "./Pages/Login";
import Account from "./Pages/Account";
import Signup from "./Pages/Signup";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <div>
      <Router>
        <ScrollToTop />
        <AuthContextProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tvshows" element={<TvShows />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/details/:id" element={<Details />} />
            <Route path="/actordetails/:id" element={<ActorDetails />} />
            <Route path="/showdetails/:id" element={<ShowDetails />} />
            <Route path="/search" element={<Search />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/account"
              element={
                <ProtectedRoute>
                  <Account />
                </ProtectedRoute>
              }
            />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </AuthContextProvider>
      </Router>
    </div>
  );
}

export default App;
