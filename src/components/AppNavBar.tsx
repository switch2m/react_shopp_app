import React from "react";
import { useState } from "react";
import {
    Collapse,
    Navbar,
    NavbarBrand,
    NavItem,
    NavLink,
} from "reactstrap";

function AppNavBar(){

    const [isOpen, setIsOpen] = useState(false);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const onClickTaggle = () => {
        setIsOpen(!isOpen)
    }

    return (
        <div>
                <Navbar>
                    <div className='nav-center'>
                        <div className='nav-header'>
                            <NavbarBrand href="/" className="para">ShoppingList</NavbarBrand>
                            <Collapse isOpen={isOpen} navbar>
                                <NavItem>
                                    <NavLink href="/http://www.google.com/" className="para">Google</NavLink>
                                </NavItem>
                            </Collapse>
                        </div>
                    </div>
                </Navbar>
            </div>
    )
}

export default AppNavBar;