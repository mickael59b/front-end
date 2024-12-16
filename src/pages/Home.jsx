import React, { useEffect } from 'react';
import Profile_img from '../assets/images/profile.png'; // Image du profil
import '../assets/css/home.css'; // Vos styles personnalisés

const Home = () => {
  useEffect(() => {
    document.title = "Accueil - Intégrateur Web"; // Mise à jour du titre de l'onglet
  }, []);

  return (
    <section className="py-5 home-section">
      <div className="container px-5 pb-5">
        <div className="row gx-5 align-items-center">
          {/* Section Texte */}
          <div className="col-lg-6">
            <div className="text-center text-lg-start">
              <h2 className="fs-2 fw-bold text-primary mb-3">
                Bienvenue sur mon portfolio
              </h2>
              <h1 className="display-4 fw-bolder mb-4">
                <span className="text-gradient d-inline">Intégrateur Web Créatif</span>
              </h1>
              <p className="fs-5 text-muted mb-4">
                Passionné par le développement web, je conçois des interfaces modernes, accessibles et performantes.
                Explorez mes réalisations et découvrez comment je peux transformer vos idées en expériences numériques.
              </p>
              <div className="d-flex gap-3 justify-content-center justify-content-lg-start mb-4">
                <a className="btn btn-primary btn-lg px-4 py-2" href="/resume">Télécharger CV</a>
                <a className="btn btn-outline-dark btn-lg px-4 py-2" href="/projects">Voir mes Projets</a>
              </div>
            </div>
          </div>

          {/* Section Image */}
          <div className="col-lg-6">
            <div className="text-center">
              <div className="profile bg-gradient-primary-to-secondary p-4 shadow">
                <img className="profile-img" src={Profile_img} alt="Profile" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;