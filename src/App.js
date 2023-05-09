
import './App.css';
import NavBar from './componets/NavBar';
import News from './componets/News';

function App() {
  return (
    <div className="App">
   <NavBar/>
   <News pageSize="6"/>
    </div>
  );
}

export default App;
