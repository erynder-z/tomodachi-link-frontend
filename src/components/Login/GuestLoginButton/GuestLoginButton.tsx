import React from 'react';
import ButtonBusy from '../../UiElements/LoadingSpinner/ButtonBusy';
import { MdKeyboardDoubleArrowRight } from 'react-icons/md';

type GuestLoginButtonProps = {
    handleGuestLogin: () => void;
    isSubmitting: boolean;
};

export default function GuestLoginButton({
    handleGuestLogin,
    isSubmitting,
}: GuestLoginButtonProps) {
    return (
        <button
            disabled={isSubmitting}
            onClick={handleGuestLogin}
            className={`relative overflow-hidden w-full bg-indigo-900 text-white text-xl font-bold rounded transition duration-500 ease-in-out ${
                isSubmitting
                    ? 'bg-gray-500 cursor-not-allowed'
                    : 'hover:bg-indigo-700'
            }`}
        >
            {isSubmitting ? (
                <ButtonBusy />
            ) : (
                <span className="z-10 relative w-full flex justify-center items-center group p-4">
                    <span className="transition-all duration-300 group-hover:pr-4">
                        Login as guest
                        <span className="opacity-0 absolute -right-0 group-hover:right-4 md:group-hover:right-8 transition-all duration-300 group-hover:opacity-100">
                            <MdKeyboardDoubleArrowRight size="1.5em" />
                        </span>
                    </span>
                </span>
            )}
        </button>
    );
}
