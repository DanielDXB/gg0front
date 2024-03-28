import './App.css'
import Login from './components/Login'
import Register from './components/Register'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import Profile from './components/Profile'
import AuthProvider, { useAuth } from './components/AuthProvider.jsx'
import Exercises from './components/Exercises'
import Shoulders from './components/Shoulders'
import Chest from './components/Chest'
import Abs from './components/Abs'
import Feed from './components/Feed'
import Back from './components/Back'
import Biceps from './components/Biceps'
import Triceps from './components/Triceps'
import Forearms from './components/Forearms'
import Legs from './components/Legs'
import Calves from './components/Calves'
import Nutrition from './components/Nutrition'
import Chat from './components/Chat'

function PrivateRoute({ children }) {
  const authContext = useAuth();

  if (authContext.isAuthenticated) return children;
  
  return <Navigate to="/" />;
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route exact path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/profile' element={<PrivateRoute><Profile /></PrivateRoute>} />
          <Route path='/feed'  element={<PrivateRoute><Feed  /></PrivateRoute>} />
          <Route path='/exercises' element={<PrivateRoute><Exercises /></PrivateRoute>} />
          <Route path='/nutrition' element={<PrivateRoute><Nutrition /></PrivateRoute>} />
          <Route path='/chatbot' element={<PrivateRoute><Chat /></PrivateRoute>} />



          <Route path='/shoulders' element={<PrivateRoute><Shoulders /></PrivateRoute>} />
          <Route path='/chest' element={<PrivateRoute><Chest /></PrivateRoute>} />
          <Route path='/abs' element={<PrivateRoute><Abs /></PrivateRoute>} />
          <Route path='/back' element={<PrivateRoute><Back /></PrivateRoute>} />
          <Route path='/biceps' element={<PrivateRoute><Biceps /></PrivateRoute>} />
          <Route path='/triceps' element={<PrivateRoute><Triceps /></PrivateRoute>} />
          <Route path='/forearms' element={<PrivateRoute><Forearms /></PrivateRoute>} />
          <Route path='/legs' element={<PrivateRoute><Legs /></PrivateRoute>} />
          <Route path='/calves' element={<PrivateRoute><Calves /></PrivateRoute>} />


        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
