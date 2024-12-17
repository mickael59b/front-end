import React, { useRef, useState } from 'react';
import '../assets/css/contact.css';
import Carte_map from '../assets/images/contact-bg.png';
import { Helmet } from 'react-helmet';
import ReCAPTCHA from 'react-google-recaptcha';
import axios from 'axios';
import Message from '../components/Message'; // Composant pour afficher erreurs/succès

const Contact = () => {
    const recaptchaRef = useRef(null);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        message: ''
    });
    const [formError, setFormError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formSuccess, setFormSuccess] = useState(false);

    const RECAPTCHA_SITE_KEY = "6LdVeAspAAAAAAhQb8mrSQAuuMtsW2HnLVkW_WJZ"; // Clé publique intégrée directement

    // Gestion des changements dans les champs du formulaire
    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    // Validation de l'email
    const validateEmail = (email) => {
        const isValid = /\S+@\S+\.\S+/.test(email);
        return isValid;
    };

    // Validation générale du formulaire
    const validateForm = () => {
        const { firstName, lastName, email, message } = formData;

        if (!firstName.trim() || !lastName.trim() || !email.trim() || !message.trim()) {
            console.log("Validation error: All fields are required.");
            return "Tous les champs sont obligatoires.";
        }
        if (!validateEmail(email)) {
            console.log("Validation error: Invalid email.");
            return "L'email fourni est invalide.";
        }
        if (message.length < 10) {
            console.log("Validation error: Message too short.");
            return "Votre message doit contenir au moins 10 caractères.";
        }
        console.log("Form validation passed."); // Log successful validation
        return '';
    };

    // Envoi du formulaire
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Form submission started."); // Log submission start
        const recaptchaValue = recaptchaRef.current.getValue();
        console.log(`reCAPTCHA value: ${recaptchaValue}`); // Log reCAPTCHA value

        if (!recaptchaValue) {
            console.log("reCAPTCHA validation failed."); // Log reCAPTCHA error
            setFormError("Veuillez compléter le reCAPTCHA.");
            return;
        }

        const validationError = validateForm();
        if (validationError) {
            console.log(`Form validation error: ${validationError}`); // Log validation error
            setFormError(validationError);
            return;
        }

        setIsSubmitting(true);

        try {
            console.log("Sending form data to server...", formData); // Log data being sent
            const response = await axios.post('https://back-end-api-gfl0.onrender.com/api/contact', {
                ...formData,
                recaptchaToken: recaptchaValue,
            });

            console.log("Server response:", response); // Log server response

            if (response.data.success) {
                console.log("Form submission successful."); // Log success
                setFormSuccess(true);
                setFormData({ firstName: '', lastName: '', email: '', message: '' });
                recaptchaRef.current.reset();
                setFormError('');
                setTimeout(() => setFormSuccess(false), 3000);
            } else {
                console.log("Server returned an error:", response.data); // Log server error
                setFormError('Erreur lors de l\'envoi du formulaire.');
            }
        } catch (error) {
            console.error("Error during form submission:", error); // Log error
            setFormError(
                error.response?.data.message || 'Une erreur est survenue. Veuillez réessayer plus tard.'
            );
        } finally {
            console.log("Form submission completed."); // Log completion
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
                                            className="form-control"
                                            required
                                        />
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <label htmlFor="lastName" className="form-label">Last Name *</label>
                                        <input
                                            type="text"
                                            id="lastName"
                                            value={formData.lastName}
                                            onChange={handleInputChange}
                                            className="form-control"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email *</label>
                                    <input
                                        type="email"
                                        id="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="form-control"
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="message" className="form-label">Message *</label>
                                    <textarea
                                        id="message"
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        className="form-control"
                                        rows="5"
                                        required
                                    />
                                </div>

                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <div className="recaptcha-container">
                                        <ReCAPTCHA
                                            ref={recaptchaRef}
                                            sitekey={RECAPTCHA_SITE_KEY} // Clé publique intégrée directement
                                            disabled={isSubmitting}
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                                        {isSubmitting ? 'Envoi en cours...' : 'Envoyer'}
                                    </button>
                                </div>

                                {/* Messages d'erreur et de succès */}
                                {formError && <Message type="danger" message={formError} />}
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