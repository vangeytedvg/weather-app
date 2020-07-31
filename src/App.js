import React, { useState, useEffect } from 'react'
import './App.css'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import {
    Collapse, Navbar, NavbarToggler, NavbarBrand,
    Nav,
    NavItem,
    NavbarText,
    NavLink,
    Container
} from 'reactstrap';
// Own Components
import Home from './Components/ui/Home'
import Daily from './Components/ui/Daily'
import Days16 from './Components/ui/Days16'
import SearchWeather from './Components/ui/SearchWeather'
import denkaIMG from './img/denkatech.png'


function App() {

    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    return (
        <Router>
            <Navbar color="dark" dark expand="sm" className="mb-5">
                <NavbarBrand>
                    <Link to="/">
                        <img src={denkaIMG} alt="Logo"></img>
                    </Link>
                </NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                        <NavItem>
                            <Link style={{ color: 'white' }} to="/">Current weather</Link>
                        </NavItem><div> | </div>
                        <NavItem>
                            <Link style={{ color: 'white' }} to="/dayly">Daily</Link>
                        </NavItem><div> | </div> 
                    </Nav>
                    <NavbarText>Danny's Weather App</NavbarText>
                </Collapse>
            </Navbar>
            <Switch>
                <Route exact path="/"><Home /></Route>
                <Route exact path="/dayly"><Daily /></Route>

            </Switch>

        </Router>
    );
}

export default App;
