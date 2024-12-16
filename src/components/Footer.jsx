// src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import News from './Newsletter'; // Assurez-vous que le composant Newsletter existe et est fonctionnel
import '../assets/css/footer.css';

const Footer = () => {
  return (
    <footer className="footer pt-10 pb-5 mt-auto bg-light footer-light">
      <div className="container">
        <News /> {/* Insertion du composant News (newsletter) */}
        
        <div className="row">
          <div className="col-lg-3">
            <h5 className="footer-brand">Mickael Boutte</h5>
            <p className="mb-3">
              Développeur web | Passionné par l'innovation et la création d'expériences numériques.
            </p>
            <div className="d-flex">
              {/* Liens réseaux sociaux */}
              <a
                href="https://twitter.com/mon_compte"
                target="_blank"
                className="text-dark me-3"
                title="Twitter"
                rel="noreferrer"
              >
                <i className="fab fa-twitter fa-lg"></i>
              </a>
              <a
                href="https://github.com/mon_compte"
                target="_blank"
                className="text-dark me-3"
                title="GitHub"
                rel="noreferrer"
              >
                <i className="fab fa-github fa-lg"></i>
              </a>
              <a
                href="https://facebook.com/mon_compte"
                target="_blank"
                className="text-dark"
                title="Facebook"
                rel="noreferrer"
              >
                <i className="fab fa-facebook fa-lg"></i>
              </a>
            </div>
          </div>

          <div className="col-lg-9">
            <div className="row">
              {/* Liens supplémentaires */}
              <FooterLinks title="Produits" links={['Thèmes', 'Templates', 'UI Kits']} />
              <FooterLinks title="Ressources" links={['Documentation', 'Tutoriels', 'Blog']} />
              <FooterLinks title="Entreprise" links={['À propos', 'Carrières', 'Contact']} />
            </div>
          </div>
        </div>

        {/* Section copyright */}
        <div className="text-center mt-4">
          <p className="small text-muted">&copy; 2024 Mickael Boutte | Acti-Informatique. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

// Composant pour les liens de footer
const FooterLinks = ({ title, links }) => (
  <div className="col-md-4 mb-3">
    <h6 className="text-uppercase-expanded text-xs mb-4">{title}</h6>
    <ul className="list-unstyled mb-0">
      {links.map((link, index) => (
        <li key={index} className="mb-2">
          {/* Conversion du lien en format URL */}
          <Link to={`/${link.toLowerCase().replace(/\s+/g, '-')}`}>
            {link}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

export default Footer;