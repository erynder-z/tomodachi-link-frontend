import React from 'react';
import ButtonBusy from '../../LoadingSpinner/ButtonBusy';

type SignupFormProps = {
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
    isSubmitting: boolean;
};

export default function SignupForm({
    handleSubmit,
    isSubmitting,
}: SignupFormProps) {
    return (
        <div className="max-w-md mx-auto">
            <div>
                <h1 className="text-2xl font-semibold">Set up your account</h1>
            </div>
            <form
                action=""
                method="POST"
                onSubmit={handleSubmit}
                className="divide-y divide-gray-200"
            >
                <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                    <div className="relative z-0">
                        <input
                            required
                            autoComplete="off"
                            id="firstName"
                            name="firstName"
                            type="text"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-cPink peer"
                            placeholder=" "
                        />
                        <label
                            htmlFor="firstName"
                            className="absolute text-sm text-gray-900 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-cPink peer-focus:font-bold peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            First name
                        </label>
                    </div>
                    <div className="relative z-0">
                        <input
                            required
                            autoComplete="off"
                            id="lastName"
                            name="lastName"
                            type="text"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-cPink peer"
                            placeholder=" "
                        />
                        <label
                            htmlFor="lastName"
                            className="absolute text-sm text-gray-900 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-cPink peer-focus:font-bold peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Last name
                        </label>
                    </div>
                    <div className="relative z-0">
                        <input
                            required
                            autoComplete="off"
                            id="email"
                            name="email"
                            type="email"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-cPink peer"
                            placeholder=" "
                        />
                        <label
                            htmlFor="email"
                            className="absolute text-sm text-gray-900 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-cPink peer-focus:font-bold peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Email
                        </label>
                    </div>
                    <div className="relative z-0">
                        <input
                            required
                            autoComplete="off"
                            id="username"
                            name="username"
                            type="text"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-cPink peer"
                            placeholder=" "
                        />
                        <label
                            htmlFor="username"
                            className="absolute text-sm text-gray-900 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-cPink peer-focus:font-bold peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Username
                        </label>
                    </div>
                    <div className="relative z-0">
                        <input
                            required
                            autoComplete="off"
                            id="password"
                            name="password"
                            type="password"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-cPink peer"
                            placeholder=" "
                        />
                        <label
                            htmlFor="password"
                            className="absolute text-sm text-gray-900 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-cPink peer-focus:font-bold peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Password
                        </label>
                    </div>
                    <div className="relative z-0">
                        <input
                            required
                            autoComplete="off"
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-cPink peer"
                            placeholder=" "
                        />
                        <label
                            htmlFor="confirmPassword"
                            className="absolute text-sm text-gray-900 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-cPink peer-focus:font-bold peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Confirm password
                        </label>
                    </div>
                    <div className="flex w-full">
                        <button
                            disabled={isSubmitting}
                            className={`w-full relative overflow-hidden text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out group ${
                                isSubmitting ? 'bg-gray-500' : 'bg-green-500'
                            }`}
                        >
                            <span
                                className={`absolute top-0 left-0 h-full w-full transform -translate-x-full transition duration-300 ease-in-out group-hover:translate-x-0 ${
                                    isSubmitting
                                        ? 'bg-gray-500'
                                        : 'bg-green-600'
                                }`}
                            ></span>
                            {isSubmitting ? (
                                <ButtonBusy />
                            ) : (
                                <span className="z-10 relative">Register</span>
                            )}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
