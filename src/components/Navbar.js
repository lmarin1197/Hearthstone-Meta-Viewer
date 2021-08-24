import React from 'react';
import '../css/Navbar.css';
import {Link} from 'react-router-dom';

function Navbar(props) {
    return (
        <div className = 'navbar'>
            <div className = 'nav-header'>META OVERVIEW</div>
            <div className = 'section-title'>CLASSES</div>
            <ul className = 'section-list'>
                <li><Link to = '/deck/DEMONHUNTER'>Demon Hunter</Link></li>
                <li><Link to = '/deck/DRUID'>Druid</Link></li>
                <li><Link to = '/deck/HUNTER'>Hunter</Link></li>
                <li><Link to = '/deck/MAGE'>Mage</Link></li>
                <li><Link to = '/deck/PALADIN'>Paladin</Link></li>
                <li><Link to = '/deck/PRIEST'>Priest</Link></li>
                <li><Link to = '/deck/ROGUE'>Rogue</Link></li>
                <li><Link to = '/deck/SHAMAN'>Shaman</Link></li>
                <li><Link to = '/deck/WARLOCK'>Warlock</Link></li>
                <li><Link to = '/deck/WARRIOR'>Warrior</Link></li>
            </ul>
            <div className = 'section-title'>RANK RANGE</div>
            <ul className = 'section-list'>
                <li className = 'legend'><img src = 'https://static.hsreplay.net/static/images/premium.png'></img><span className = 'legend-text'>Legend: 500 and Below</span></li>
                <li className = 'legend'><img src = 'https://static.hsreplay.net/static/images/premium.png'></img><span className = 'legend-text'>Legend: 500 and Above</span></li>
                <li>Diamond</li>
                <li>Gold</li>
                <li>Silver</li>
                <li>Bronze</li>
            </ul>
            <div className = 'section-title' id = 'home'>
                <Link to = '/' >HOME</Link>
            </div>
        </div>
    );
}

export default Navbar;