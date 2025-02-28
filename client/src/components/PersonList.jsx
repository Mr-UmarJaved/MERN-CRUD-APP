import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

function PersonList() {
    const [people, setPeople] = useState([]);

    useEffect(() => {
        fetchPeople();
    }, []);

    const fetchPeople = async () => {
        try {
            const response = await axios.get('crud-backend-bqbadea7h5gbckhe.canadacentral-01.azurewebsites.net/api/people');
            setPeople(response.data);
        } catch (error) {
            console.error('Error fetching people:', error);
        }
    };

    const deletePerson = async (id) => {
        try {
            await axios.delete(`crud-backend-bqbadea7h5gbckhe.canadacentral-01.azurewebsites.net/api/people/${id}`);
            fetchPeople();
        } catch (error) {
            console.error('Error deleting person:', error);
        }
    };

    return (
        <div>
            <Link to="/add" className="btn btn-add">Add Person</Link>
            <table className="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {people.map(person => (
                        <tr key={person._id}>
                            <td>{person.name}</td>
                            <td>{person.age}</td>
                            <td>
                                <Link to={`/edit/${person._id}`} className="btn btn-edit">Edit</Link>
                                <button
                                    onClick={() => deletePerson(person._id)}
                                    className="btn btn-delete"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default PersonList;