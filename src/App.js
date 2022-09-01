import "./App.scss";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/layout/Header";
import NotesPage from "./pages/NotesPage";
import NotePage from "./pages/NotePage";
function App() {
  return (
    <div className="app">
    <Router>
      <div className="pagesBody">
          <Header />
          <div className="content">
            <Routes>
              <Route path="/" exact element={<NotesPage />} />
              <Route path="/note/:id" element={<NotePage />} />
            </Routes>
          </div>
      </div>
    </Router>
    </div>
    
  );
}

export default App;
