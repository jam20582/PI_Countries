import './App.css';
import {Routes , Route} from 'react-router-dom'
import {Countries} from './components/Countries.jsx';
import {CountryDetail} from './components/CountryDetail.jsx';
import {LandingPage} from './components/LandingPage.jsx';
import {Header} from './components/Header.jsx';
import {ActForm} from './components/ActForm.jsx';
import {About} from './components/About.jsx';
import {useLocation} from 'react-router-dom';



function App() {
  const {pathname} = useLocation();
  return (
    <div className='App'>
      
      {pathname === '/home'  ? <Header /> : null }
      
      <Routes>
        <Route path='/' element={<LandingPage />}  />
        <Route path='/home' element={<Countries />} />
        <Route path='/countries/:id' element={<CountryDetail />} />
        <Route path='/activity' element={<ActForm />} />
        <Route path='/about' element={<About />} />
      </Routes>
    </div>
  );
}
export default App;


