import { BrowserRouter as Router } from 'react-router-dom'; // Import Router
import { AuthProvider } from './context/AuthContext'; // Import du fournisseur de contexte
import Header from './components/Header';
import Footer from './components/Footer';
import Feedback from './components/Feedback';
import AppRoutes from './routes/AppRoutes'; // Importation des routes

const App = () => {
  return (
    // Le Router doit englober tous les composants utilisant react-router
    <Router>
      {/* AuthProvider peut maintenant utiliser useNavigate sans problème */}
      <AuthProvider>
        <Header />
        <Feedback />
        <AppRoutes /> {/* Utilisation des routes depuis AppRoutes.jsx */}
        <Footer />
      </AuthProvider>
    </Router>
  );
};

export default App;
