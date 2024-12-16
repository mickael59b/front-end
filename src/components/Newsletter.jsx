// src/components/Newsletter.jsx
import React, { useState } from 'react';
import img_news from '../assets/images/wall-post-pana.svg';
import validator from 'validator'; // Pour valider l'email

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation de l'email
    if (!validator.isEmail(email)) {
      setError('Veuillez entrer une adresse email valide.');
      return;
    }

    setIsSubmitting(true);
    setError('');

    // Logique pour envoyer l'email au serveur ou ajouter à la liste de diffusion
    // Exemples d'envoi d'email via une API ou autre service :
    // axios.post('/api/subscribe', { email })

    // Après la soumission
    setTimeout(() => {
      setIsSubmitting(false);
      alert('Merci pour votre inscription à la newsletter!');
      setEmail('');
    }, 2000); // Simuler un délai d'envoi

  };

  return (
    <div className="card p-sm-4 p-md-5 signup-form">
      <div className="card-body text-center">
        <h2>Découvrez mes projets et réalisations</h2>
        <p className="lead">
          Abonnez-vous pour être informé de mes nouveaux projets et mises à jour !
        </p>
        <form className="row g-2 justify-content-center" onSubmit={handleSubmit}>
          <div className="col-auto">
            <input
              type="email"
              className="form-control"
              placeholder="Email address..."
              aria-label="Email address"
              value={email}
              onChange={handleEmailChange}
            />
          </div>
          <div className="col-auto">
            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
              {isSubmitting ? 'Envoi en cours...' : 'Subscribe!'}
            </button>
          </div>
        </form>
        {error && <p className="text-danger">{error}</p>}
        <p className="text-muted small fst-italic mt-3">
          Ce site est protégé par reCAPTCHA et la politique de{' '}
          <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer">
            confidentialité de Google
          </a>{' '}
          et les{' '}
          <a href="https://policies.google.com/terms" target="_blank" rel="noreferrer">
            conditions de service
          </a>{' '}
          s'appliquent.
        </p>
      </div>
      <img
        src={img_news}
        alt="Man standing with tablet SVG"
        className="signup-form-img d-none d-md-block"
      />
    </div>
  );
};

export default Newsletter;