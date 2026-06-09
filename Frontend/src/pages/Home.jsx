import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

function Home() {
  return (
    <>
      <Navbar />

      <div className="home">
        <Sidebar />
          <div className="home1">
          <h1> Welcome To Home Page</h1>
          <p>This is React Internship Assignment</p>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Home;