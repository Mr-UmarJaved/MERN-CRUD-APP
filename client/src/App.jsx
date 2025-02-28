import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PersonList from './components/PersonList';
import PersonForm from './components/PersonForm';
import './App.css';

function App() {
    return (
        <Router>
            <div className="container">
                <h1>MERN CRUD App</h1>
                <Routes>
                    <Route path="/" element={<PersonList />} />
                    <Route path="/add" element={<PersonForm />} />
                    <Route path="/edit/:id" element={<PersonForm />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;