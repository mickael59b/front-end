import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import ProfileImg from '../assets/images/profile.png'; // Chemin vers votre photo de profil
import icon_html5 from '../assets/images/html-5.png'; 
import icon_css from '../assets/images/css-3.png';
import icon_js from'../assets/images/javascript.png';
import icon_react from '../assets/images/react.png';
import icon_bootstrap from '../assets/images/bootstrap.png';
import icon_git from '../assets/images/git.png';

const About = () => {
  useEffect(() => {
    document.title = "À propos - Intégrateur Web";
  }, []);

  return (
    <section className="about-section pt-5">
      <div className="container px-5">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Section titre */}
          <div className="row mb-5">
            <div className="col-md-6">
              <h1 className="display-4 text-gradient fw-bold mb-4">À propos de moi</h1>
              <p className="lead text-muted">
                Je suis un intégrateur web passionné, spécialisé dans la création de sites web modernes, performants et responsive. 
                Mon objectif est de transformer vos idées en expériences numériques interactives et esthétiques.
              </p>
              <p>
                Fort de plusieurs années d'expérience dans le domaine, j'ai travaillé avec divers outils et technologies pour offrir des solutions sur mesure à mes clients. 
                Mon engagement envers la qualité et la satisfaction client fait de moi un partenaire de confiance pour vos projets web.
              </p>
            </div>
            <div className="col-md-6 text-center">
              <img
                src={ProfileImg}
                alt="Photo de profil"
                className="img-fluid rounded-circle shadow-lg"
                style={{ width: '250px', height: '250px' }}
              />
            </div>
          </div>

          {/* Section compétences */}
          <div className="row mb-5">
            <div className="col-md-6">
              <h2 className="fw-bold mb-3">Mes Compétences</h2>
              <ul className="list-unstyled">
                <li className="mb-2">✔️ Intégration HTML/CSS avec Bootstrap</li>
                <li className="mb-2">✔️ Création de design responsive</li>
                <li className="mb-2">✔️ Animation web avec Framer Motion et GSAP</li>
                <li className="mb-2">✔️ Optimisation des performances et SEO</li>
                <li className="mb-2">✔️ Collaboration avec des designers et développeurs</li>
                <li className="mb-2">✔️ Gestion des projets web</li>
              </ul>
            </div>
            <div className="col-md-6">
              <h2 className="fw-bold mb-3">Outils et Technologies</h2>
              <div className="row text-center">
                <div className="col-4 mb-3">
                  <img src={icon_html5} alt="HTML" className="img-fluid" style={{ height: '50px' }} />
                  <p className="mt-2">HTML</p>
                </div>
                <div className="col-4 mb-3">
                  <img src={icon_css} alt="CSS" className="img-fluid" style={{ height: '50px' }} />
                  <p className="mt-2">CSS</p>
                </div>
                <div className="col-4 mb-3">
                  <img src={icon_js} alt="JavaScript" className="img-fluid" style={{ height: '50px' }} />
                  <p className="mt-2">JavaScript</p>
                </div>
                <div className="col-4 mb-3">
                  <img src={icon_react} alt="React" className="img-fluid" style={{ height: '50px' }} />
                  <p className="mt-2">React</p>
                </div>
                <div className="col-4 mb-3">
                  <img src={icon_bootstrap} alt="Bootstrap" className="img-fluid" style={{ height: '50px' }} />
                  <p className="mt-2">Bootstrap</p>
                </div>
                <div className="col-4 mb-3">
                  <img src={icon_git} alt="Git" className="img-fluid" style={{ height: '50px' }} />
                  <p className="mt-2">Git</p>
                </div>
              </div>
            </div>
          </div>

          {/* Section parcours */}
          <div className="row">
            <div className="col-md-12">
              <h2 className="fw-bold mb-3">Mon Parcours</h2>
              <p>
                Après avoir obtenu un diplôme en développement web, j'ai travaillé sur de nombreux projets en tant qu'intégrateur web freelance.
                Ces projets m'ont permis de développer mes compétences techniques et de comprendre les besoins variés des clients.
              </p>
              <p>
                En dehors du travail, je me tiens constamment à jour avec les nouvelles tendances du développement web et participe activement à des communautés de développeurs.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;