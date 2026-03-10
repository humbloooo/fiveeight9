import logo from '../assets/brand/logo.png';

const StableLogo = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem 0' }}>
            <img src={logo} alt="Five Eight 9 Logo" style={{ width: '100%', maxWidth: '300px', height: 'auto' }} />
        </div>
    );
};

export default StableLogo;
