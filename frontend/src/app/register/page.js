"use client"
import React, { useState } from 'react'
import axios from 'axios';
import '../globals.css'


export default function page() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
          
            const response = await axios.post('http://localhost:5000/auth/register', { name, email });
            console.log(response.data); 
        } catch (error) {
            console.error('Error registering user:', error);
        }
    };
  
    return (
        <form className="registration-form" onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="name" style={{ fontFamily: 'cursive', fontWeight: '550' }}>Name</label>
                <input
                    placeholder="Enter your name"
                    type="text"
                    id="name"
                    className="input-field"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="email" style={{ fontFamily: 'cursive', fontWeight: '550' }}>Email</label>
                <input
                    placeholder="Enter your email"
                    type="email"
                    id="email"
                    className="input-field"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <button type="submit" className="submit-button">Register</button>
        </form>
    );
}
