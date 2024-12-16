import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext'; // Importation de votre contexte Auth
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { login } = useAuth(); // Accédez à la fonction de login dans le contexte

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://back-end-api-gfl0.onrender.com/api/clients/login', { email, password });
      const { token, user } = response.data;

      if (token) {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));

        // Appelez la fonction login du contexte pour mettre à jour l'état d'authentification
        login(token); 

        navigate('/dashboard'); // Redirigez vers le tableau de bord
      }
    } catch (err) {
      setError('Email ou mot de passe incorrect');
    }
  };

  return (
    <section id="login">
      <div className="container">
        <div className="row justify-content-center mt-5">
          <div className="col-xl-12">
            <div className="row g-0">
              <div className="col-md-5 offset-md-1 d-none d-md-inline-block">
                <div className="position-relative mt-5 pt-5">
                  <Swiper
                    spaceBetween={10}
                    slidesPerView={1}
                    loop={true}
                    autoplay={{ delay: 3000 }}
                  >
                    <SwiperSlide>
                      <div className="swiper-slide-content">
                        <div className="row text-center">
                          <div className="col">
                            <img src="assets/images/hero/saas1.jpg" alt="Slide 1" className="w-75" />
                          </div>
                        </div>
                        <div className="row text-center my-4 pb-5">
                          <div className="col">
                            <h5 className="fw-medium fs-16">Manage your saas business with ease</h5>
                            <p className="text-muted">Make your saas application stand out with high-quality landing page designed and developed by professionals.</p>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide>
                      <div className="swiper-slide-content">
                        <div className="row text-center">
                          <div className="col">
                            <img src="assets/images/hero/saas2.jpg" alt="Slide 2" className="w-75" />
                          </div>
                        </div>
                        <div className="row text-center my-4 pb-5">
                          <div className="col">
                            <h5 className="fw-medium fs-16">Enhance your user experience</h5>
                            <p className="text-muted">Offer a seamless and intuitive user experience with a visually appealing design.</p>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  </Swiper>
                </div>
              </div>
              <div className="col-md-5 shadow p-4">
                <h6 className="h5 mb-0 mt-3">Welcome back!</h6>
                <p className="text-muted mt-1 mb-4">Enter your email address and password to access the admin panel.</p>
                <form onSubmit={handleSubmit} className="authentication-form">
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email <small>*</small></label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password <small>*</small></label>
                    <a href="account-forget-password.html" className="float-end text-muted text-unline-dashed ms-1 fs-13">Forgot your password?</a>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>

                  <div className="mb-3 d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center">
                      <input type="checkbox" className="form-check-input" id="checkbox-signin" />
                      <label className="form-check-label text-muted" htmlFor="checkbox-signin">Remember me</label>
                    </div>
                    <p className="text-muted mb-0">
                      <span>Don't have an account? </span>
                      <a href="register" className="text-primary fw-semibold ms-1">Sign Up</a>
                    </p>
                  </div>

                  {error && <div className="text-danger mb-3">{error}</div>}

                  <div className="mb-0 text-center d-grid">
                    <button className="btn btn-primary" type="submit">Log In</button>
                  </div>
                </form>

                <div className="py-3 text-center">
                  <span className="fs-13 fw-bold">OR</span>
                </div>

                <div className="row">
                  <div className="col-12 text-center">
                    <a href="#" className="btn btn-white w-100">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-github icon icon-xs me-2">
                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                      </svg>
                      Github
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;