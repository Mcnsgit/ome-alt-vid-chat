import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

function NavigateButton({ text, to, variant }) {
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        function simulateNetworkRequest() {
            return new Promise(resolve => {
                setTimeout(resolve, 2000);
            });
        }

        if (isLoading) {
            simulateNetworkRequest().then(() => {
                setLoading(false);
            });
        }
    }, [isLoading]);

    const handleClick = () => setLoading(true);

    return (
        <Link to={to} style={{ textDecoration: 'none' }}>
            <Button
                variant={variant}
                onClick={handleClick}
                disabled={isLoading}
            >
                {isLoading ? 'Loading...' : text}
            </Button>
        </Link>
    );
}

export default NavigateButton;