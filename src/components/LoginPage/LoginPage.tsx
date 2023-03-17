import { useContext, useState } from 'react';
import AuthContext from '../../contexts/AuthContext';
import InfoOverlayContext from '../../contexts/InfoOverlayContext';
import LoginForm from './LoginForm';
import VerifyingInfoBox from './VerifyingInfoBox';
import { FaExclamationTriangle } from 'react-icons/fa';
import SignupPage from './SignupPage/SignupPage';

export default function LoginPage() {
    const { setToken } = useContext(AuthContext);
    const { setInfo } = useContext(InfoOverlayContext);
    const [isVerifying, setIsVerifying] = useState<boolean>(false);
    const [showSignup, setShowSignup] = useState<boolean>(false);

    const login = async (username: string, password: string) => {
        setIsVerifying(true);
        setInfo(null);

        try {
            const serverURL = import.meta.env.VITE_SERVER_URL;
            const response = await fetch(`${serverURL}/api/v1/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                const data = await response.json();
                const errorMessage = data.error.message;

                setInfo({
                    message: errorMessage,
                    icon: <FaExclamationTriangle />,
                });

                throw new Error(
                    `Error: ${response.status} ${response.statusText}`
                );
            }

            const data = await response.json();
            localStorage.setItem('jwtOdinBook', data.token);
            setToken(data.token);
        } catch (error: unknown) {
            console.error(error);
        }

        setIsVerifying(false);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const usernameInput = event.currentTarget.querySelector(
            '[name="username"]'
        ) as HTMLInputElement;

        const passwordInput = event.currentTarget.querySelector(
            '[name="password"]'
        ) as HTMLInputElement;

        const username = usernameInput.value;
        const password = passwordInput.value;

        try {
            await login(username, password);
        } catch (error) {
            setInfo({
                message: 'Something went wrong!',
                icon: <FaExclamationTriangle />,
            });
        }
    };

    const handleRegisterClick = () => {
        setShowSignup(true);
    };

    return (
        <div className="h-screen  bg-gray-100">
            <div className="flex justify-center items-center w-full h-full">
                <div className="h-1/2 w-5/6 sm:w-2/3 lg:w-1/3 px-4 lg:py-10 bg-white shadow-lg sm:rounded-3xl sm:p-10">
                    {isVerifying ? (
                        <VerifyingInfoBox />
                    ) : (
                        <LoginForm handleSubmit={handleSubmit} />
                    )}
                    <div className="flex w-full">
                        <button
                            onClick={handleRegisterClick}
                            className="w-full bg-green-500 text-white rounded-md px-2 py-1"
                        >
                            Register
                        </button>
                    </div>
                </div>
                {showSignup && <SignupPage setShowSignup={setShowSignup} />}
            </div>
        </div>
    );
}