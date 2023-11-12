import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Header } from './components/Header';
import Characters from './components/pages/Characters/Characters';
import Episodes from './components/pages/Episodes/Episodes';
import Locations from './components/pages/Locations/Locations';
import NotFound from './components/pages/NotFound/NotFound';
import { SingleItem } from './components/pages/SingleItem';


function App() {
  return (
    <div className="App">
        <Header />
        <Routes>
           <Route index path='/' element={<Characters />}></Route>
           <Route path='/episodes' element={<Episodes />}></Route>
           <Route path='/locations' element={<Locations />}></Route>
           <Route path='/character/:id' element={<SingleItem />}></Route>
           <Route path='*' element={<NotFound />}></Route>
        </Routes>
    </div>
  );
}

export default App;
