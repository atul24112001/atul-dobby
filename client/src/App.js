import './App.css';
import Authentication from './components/Authentication';
import Main from './components/Main';
import AuthContextProvider from './context/authContext';


function App() {
  return (
    <AuthContextProvider>
      <div>
        <Main />
        <Authentication />
      </div>
    </AuthContextProvider>
  );
}

export default App;
