import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import Home from "./pages/Home";
import Learn from "./pages/Learn";
import Practice from "./pages/Practice";
import Header from "./components/Header";
import Footer from "./components/Footer";
import GlobalStyle from "./GlobalStyle";
import Model from "./pages/Model";
import Courses from "./pages/Course";
import Alphabet from "./pages/Alphabet";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import { AuthProvider } from "./AuthContext";
import { Toaster } from "react-hot-toast";
import Admin from "./pages/Admin";
import Community from "./pages/Community";
import Word from "./pages/Word";
import LearnWord from "./pages/LearnWord";


const theme = {
  colors: {
    div_bg: "#262626",
    white: "#fff",
    black: " #000000",
    text: "#878786",
    bg: "rgb(249 249 255)",
    footer_bg: "#0a1435",
    btn: "rgb(98 84 243)",
    border: "rgba(98, 84, 243, 0.5)",
    hr: "#ffffff",
    gradient:
      "linear-gradient(0deg, rgb(132 144 255) 0%, rgb(98 189 252) 100%)",
    shadow:
      "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;",
    shadowSupport: " rgba(0, 0, 0, 0.16) 0px 1px 4px",
  },
  media: { mobile: "768px", tab: "998px" },
};

function App() {
  let token = window.localStorage.getItem("token");
  let notToken = token == undefined;

  console.log(notToken);

  return (
    <AuthProvider>
      <div className="context"></div>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <BrowserRouter>
          <Header notToken={notToken} />
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/learn" element={<Learn />}></Route>
            <Route path="/practice" element={<Practice />}></Route>
            <Route path="/model/:modelName" element={<Model />}></Route>
            <Route path="/course" element={<Courses deaf={true} />}></Route>
            <Route path="/courseAudio" element={<Courses deaf={false} />}></Route>
            <Route path="/alphabet" element={<Alphabet />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Registration />}></Route>
            <Route path="/admin" element={<Admin />}></Route>
            <Route path="/community" element={<Community />} />
            <Route path="/word" element={<Word />} />
            <Route path="/LearnWord" element={<LearnWord />} />

          </Routes>
          <Footer />
        </BrowserRouter>
        <Toaster />
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
