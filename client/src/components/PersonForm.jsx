import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

function PersonForm() {
    const [formData, setFormData] = useState({ name: '', age: '' });
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            fetchPerson();
        }
    }, [id]);

    const fetchPerson = async () => {
        try {
            const response = await axios.get(`crud-backend-bqbadea7h5gbckhe.canadacentral-01.azurewebsites.net/api/people/${id}`);
            setFormData(response.data);
        } catch (error) {
            console.error('Error fetching person:', error);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (id) {
                await axios.put(`crud-backend-bqbadea7h5gbckhe.canadacentral-01.azurewebsites.net/api/people/${id}`, formData);
            } else {
                await axios.post('crud-backend-bqbadea7h5gbckhe.canadacentral-01.azurewebsites.net/api/people', formData);
            }
            navigate('/');
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Age:</label>
                    <input
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-submit">
                    {id ? 'Update' : 'Add'} Person
                </button>
            </form>
        </div>
    );
}

export default PersonForm;