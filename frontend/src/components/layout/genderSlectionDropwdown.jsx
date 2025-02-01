import React from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import './GenderSelectionDropdown.css'; // Assuming you create a CSS file for styles

function GenderSelectionDropdown() {
    const handleSelect = (eventKey) => {
        console.log(`Selected: ${eventKey}`);
        // Handle the selection logic here
    };

    return (
        <DropdownButton 
            id="gender-dropdown" 
            title="Select Gender" 
            className="gender-select"
            onSelect={handleSelect}
            variant="light"
        >
            <Dropdown.Menu className='gender-dropdown'>
                <Dropdown.Item eventKey="4.1">Male</Dropdown.Item>
                <Dropdown.Item eventKey="4.2">Female</Dropdown.Item>
                <Dropdown.Item eventKey="4.3">We are a Couple</Dropdown.Item>
                <Dropdown.Item eventKey="4.4">Separated link</Dropdown.Item>
                <Dropdown.Divider />
            </Dropdown.Menu>
        </DropdownButton>
    );
}

export default GenderSelectionDropdown;