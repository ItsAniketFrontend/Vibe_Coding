import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Properties from './pages/Properties';
import CityPage from './pages/CityPage';
import PlotTypePage from './pages/PlotTypePage';
import LocationPage from './pages/LocationPage';
import PlotDetailPage from './pages/PlotDetailPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import NotFound from './pages/NotFound';
import AboutUs from './pages/AboutUs';
import Contact from './pages/Contact';

function App() {
  return (
    <Router>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-body)', color: 'var(--text-body)' }}>
        <Navbar />
        <main style={{ flex: 1, paddingTop: '80px' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            {/* Old /properties filter routes maintained for backward compatibility & filtering */}
            <Route path="/properties" element={<Properties />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<Contact />} />
            
            {/* New SEO Dynamic Structure */}
            {/* /jaipur */}
            <Route path="/:city" element={<CityPage />} />
            {/* /jaipur/residential-plots */}
            <Route path="/:city/:plotType" element={<PlotTypePage />} />
            {/* /jaipur/residential-plots/jagatpura */}
            <Route path="/:city/:plotType/:location" element={<LocationPage />} />
            {/* /plot/jaipur/residential-plots/jagatpura/premium-residential-plot */}
            <Route path="/plot/:city/:plotType/:location/:slug" element={<PlotDetailPage />} />

            <Route path="/admin/*" element={<AdminDashboard />} />
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
