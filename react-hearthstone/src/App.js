import './css/App.css';
import Decklist from './components/Decklist'
import Navbar from './components/Navbar'
import Tierlist from './components/Tierlist'
import { Route , Link , Redirect} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <div id = 'nav'><Navbar /></div>
      <div>
        <a href="https://playhearthstone.com/en-us"><img id = 'hs-logo' src="https://upload.wikimedia.org/wikipedia/en/f/f2/Hearthstone_2016_logo.png" alt="" /></a>
        <Route exact path = '/' 
          render = {routerProps => <div id = 'tier-list'><Tierlist /></div>}  
        />
        <Route exact path = '/deck/:id' 
          component = {Decklist}
          // render = {(routerProps) => (
          //   < Decklist match = {routerProps.match}/>
          // )}
        />
        <p id = 'credits'>Credits: <a href = 'https://git.generalassemb.ly/dguma'>Dylan Guma</a>, <a href = 'https://git.generalassemb.ly/jexxe'>Jesse Watson</a>, <a href = 'https://git.generalassemb.ly/evolvd444'>Omar Abudeh</a></p>
      </div>
      
    </div>
  );
}

export default App;
