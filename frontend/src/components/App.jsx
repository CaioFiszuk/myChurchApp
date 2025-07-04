import { Routes, Route } from 'react-router-dom';
import  Header  from '../components/Header';
import  Main  from '../components/Main';
import  Dashboard  from '../components/Dashboard';

function App() {

  return (
    <div>
      <Routes>
        <Route 
          path='/'
          element={
            <>
              <Header />
              <Main />
            </>
          }
        />

       <Route 
          path='/admin'
          element={<Dashboard />}
        />

      </Routes>
    </div>
  )
}

export default App;