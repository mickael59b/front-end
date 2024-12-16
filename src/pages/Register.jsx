import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const passwordValidation = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return regex.test(password);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Log to check form values before validation
    console.log('Form values:', { name, email, password, confirmPassword });

    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      console.log("Password mismatch error");
      setLoading(false);
      return;
    }

    if (!passwordValidation(password)) {
      setError('Le mot de passe doit contenir au moins 8 caractères, une lettre majuscule, une lettre minuscule et un chiffre.');
      console.log('Password validation failed');
      setLoading(false);
      return;
    }

    try {
      // Log before the API call
      console.log('Sending request to register the user...');
      const response = await axios.post('https://back-end-api-gfl0.onrender.com/api/clients/register', { name, email, password });
      
      // Log response data after successful registration
      console.log('Registration successful:', response.data);
      
      navigate('/login');  // Rediriger vers la page de login après l'inscription
    } catch (err) {
      // Log error if any API call fails
      console.log('Error during registration:', err);
      if (err.response && err.response.data) {
        setError(err.response.data.message || 'Erreur lors de l\'inscription. Veuillez réessayer plus tard.');
      } else {
        setError('Erreur lors de l\'inscription. Veuillez réessayer plus tard.');
      }
    } finally {
      // Log to track when loading is finished
      console.log('Finished loading');
      setLoading(false);
    }
  };

  return (
    <section id="register">
      <div className="container">
        <div className="row justify-content-center mt-5">
          <div className="col-md-6"></div>
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h3 className="card-title text-center">S'inscrire</h3>
                <form onSubmit={handleRegister}>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">Nom</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">Mot de passe</label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="confirmPassword" className="form-label">Confirmer le mot de passe</label>
                    <input
                      type="password"
                      className="form-control"
                      id="confirmPassword"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>

                  {error && <div className="alert alert-danger">{error}</div>}

                  <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                    {loading ? 'Création du compte...' : 'S\'inscrire'}
                  </button>
                </form>

                <div className="mt-3 text-center">
                  <p>
                    Vous avez déjà un compte ?{' '}
                    <a href="/login">Connectez-vous ici</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;