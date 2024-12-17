import React, { useRef, useState } from 'react';
import '../assets/css/contact.css';
import Carte_map from '../assets/images/contact-bg.png';
import { Helmet } from 'react-helmet';
import ReCAPTCHA from 'react-google-recaptcha';
import axios from 'axios';
import validator from 'validator';
import Message from '../components/Message'; // Composant pour afficher erreurs/succès

const Contact = () => {
    const recaptchaRef = useRef(null);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        message: '',
    });
    const [formErrors, setFormErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formSuccess, setFormSuccess] = useState(false);

    // Gestion des changements dans les champs du formulaire
    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    // Validation générale du formulaire
    const validateForm = () => {
        const errors = {};
        if (!formData.firstName.trim()) errors.firstName = 'Le prénom est obligatoire.';
        if (!formData.lastName.trim()) errors.lastName = 'Le nom est obligatoire.';
        if (!validator.isEmail(formData.email)) errors.email = "L'email fourni est invalide.";
        if (formData.message.trim().length < 10) errors.message = 'Le message doit contenir au moins 10 caractères.';
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    // Envoi du formulaire
    const handleSubmit = async (e) => {
        e.preventDefault();
        const recaptchaValue = recaptchaRef.current.getValue();

        if (!recaptchaValue) {
            setFormErrors({ recaptcha: "Veuillez compléter le reCAPTCHA." });
            return;
        }

        if (!validateForm()) return;

        setIsSubmitting(true);

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/contact`, {
                ...formData,
                recaptchaToken: recaptchaValue,
            });

            if (response.data.success) {
                setFormSuccess(true);
                setFormData({ firstName: '', lastName: '', email: '', message: '' });
                recaptchaRef.current.reset();
                setFormErrors({});
                setTimeout(() => setFormSuccess(false), 3000);
            } else {
                setFormErrors({ global: 'Erreur lors de l\'envoi du formulaire.' });
            }
        } catch (error) {
            setFormErrors({ global: error.response?.data.message || 'Une erreur est survenue. Veuillez réessayer plus tard.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <Helmet>
                <title>Contact - Mon Portfolio</title>
                <meta
                    name="description"
                    content="Contactez-moi pour discuter de votre projet et découvrir comment je peux vous aider à faire briller votre marque."
                />
            </Helmet>

            <div id="contact" className="py-5">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 mb-4">
                            <div className="heading pb-5">
                                <h2>Let's level up your brand, together</h2>
                                <p>
                                    Contactez-moi pour discuter de votre projet et découvrir comment je peux
                                    vous aider à faire briller votre marque.
                                </p>
                                <img className="carte_img" src={Carte_map} alt="Carte_map" />
                            </div>
                        </div>

                        <div className="col-lg-6 mb-4">
                            <form onSubmit={handleSubmit} noValidate>
                                <div className="row mb-3">
                                    <div className="col-12 col-md-6">
                                        <label htmlFor="firstName" className="form-label">First Name *</label>
                                        <input
                                            type="text"
                                            id="firstName"
                                            value={formData.firstName}
                                            onChange={handleInputChange}
                                            className={`form-control ${formErrors.firstName ? 'is-invalid' : ''}`}
                                            required
                                        />
                                        {formErrors.firstName && (
                                            <div className="invalid-feedback">{formErrors.firstName}</div>
                                        )}
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <label htmlFor="lastName" className="form-label">Last Name *</label>
                                        <input
                                            type="text"
                                            id="lastName"
                                            value={formData.lastName}
                                            onChange={handleInputChange}
                                            className={`form-control ${formErrors.lastName ? 'is-invalid' : ''}`}
                                            required
                                        />
                                        {formErrors.lastName && (
                                            <div className="invalid-feedback">{formErrors.lastName}</div>
                                        )}
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email *</label>
                                    <input
                                        type="email"
                                        id="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className={`form-control ${formErrors.email ? 'is-invalid' : ''}`}
                                        required
                                    />
                                    {formErrors.email && (
                                        <div className="invalid-feedback">{formErrors.email}</div>
                                    )}
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="message" className="form-label">Message *</label>
                                    <textarea
                                        id="message"
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        className={`form-control ${formErrors.message ? 'is-invalid' : ''}`}
                                        rows="5"
                                        required
                                    />
                                    {formErrors.message && (
                                        <div className="invalid-feedback">{formErrors.message}</div>
                                    )}
                                </div>

                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <div className="recaptcha-container">
                                        <ReCAPTCHA
                                            ref={recaptchaRef}
                                            sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
                                            disabled={isSubmitting}
                                        />
                                        {formErrors.recaptcha && (
                                            <div className="text-danger small">{formErrors.recaptcha}</div>
                                        )}
                                    </div>
                                    <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                                        {isSubmitting ? 'Envoi en cours...' : 'Envoyer'}
                                    </button>
                                </div>

                                {/* Messages d'erreur globales */}
                                {formErrors.global && <Message type="danger" message={formErrors.global} />}
                                {formSuccess && <Message type="success" message="Votre message a été envoyé avec succès !" />}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Contact;