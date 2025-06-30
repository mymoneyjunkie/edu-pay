import { Fragment, useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { FaUpload, FaUser, FaEnvelope, FaLock, FaEyeSlash, FaEye, FaArrowRight } from "react-icons/fa6";
import { Loader, LanguageSwitch, ThemeSwitcher, Footer } from "../index";
import axiosInstance from '../../api/axios';
import axios from 'axios';
import { connect } from "react-redux";
import { setCurrentUser } from "../../redux/user/user.actions";
import useTranslation from "../../hooks/useTranslation";

// Import the background image

const Register = ({setCurrentUser}) => {
	const userRef = useRef();
	const errRef = useRef();

	const BASE_IMG_URL = import.meta.env.VITE_IMG_URL;
	const { t } = useTranslation();

	const navigate = useNavigate();

	const [ userInput, setUserInput ] = useState({
		email: '',
		password: '',
		confirmPassword: ''
	})

	const [ showPassword, setShowPassword ] = useState({
		password: false,
		confirmPassword: false
	});

	const [ inputError, setInputError ] = useState({
		email: '',
		password: '',
		confirmPassword: ''
	})

	const [ errMsg, setErrMsg ] = useState('');
	const [ isLoading, setIsLoading ] = useState(false);

	const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
	const PASSWORD_REGEX = /^[A-Za-z0-9!@#$%^&*(),.?":{}|<>]{6,}$/;

	const handleEmailChange = (e) => {
		setUserInput((prevState) => {
			return {
				...prevState,
				email: e.target.value
			}
		})
	}

	const handlePasswordChange = (e) => {
		setUserInput((prevState) => {
			return {
				...prevState,
				password: e.target.value
			}
		})
	}

	const handleConfirmPasswordChange = (e) => {
		setUserInput((prevState) => {
			return {
				...prevState, 
				confirmPassword: e.target.value
			}
		})
	}

	useEffect(() => {
		userRef.current.focus();
	}, []);

	useEffect(() => {
		const result = EMAIL_REGEX.test(userInput.email);

		setInputError((prevState) => {
			return {
				...prevState,
				email: result
			}
		})
	}, [userInput.email])

	useEffect(() => {
		const passwordValid = PASSWORD_REGEX.test(userInput.password);
		const passwordsMatch = userInput.password === userInput.confirmPassword;

		// console.log(passwordsMatch);

		setInputError((prevState) => ({
			...prevState,
			password: userInput.password ? passwordValid : '',
			confirmPassword: userInput.confirmPassword ? passwordsMatch : ''
		}));
	}, [userInput.password, userInput.confirmPassword]);

	useEffect(() => {
		setErrMsg('');

		setInputError({
			email: '',
			password: '',
			confirmPassword: ''
		})
	}, [userInput.email, userInput.password, userInput.confirmPassword])
	
	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!userInput.email || !userInput.password || !userInput.confirmPassword) {
    		setInputError((prevState) => {
	    		return {
	    			...prevState,
	    			email: userInput.email === '' ? true : false,
	    			password: userInput.password === '' ? true : false,
	    			name: userInput.name === '' ? true : false,
	    			confirmPassword: userInput.confirmPassword === '' ? true : false,
	    		}
	    	});
    		return;
    	}

    	else {
    		try {
    			setIsLoading(true);

				const response = await axiosInstance.post('/api/v1/auth/register',
	    			{
						email: userInput.email,
						password: userInput.password,
						cpassword: userInput.confirmPassword
					},
					{
					    headers: {
					      'Content-Type': 'application/json', // Send data as JSON
					    },
					    withCredentials: true,
					}
	    		);

	    		if (response.data && response.data.isSuccess) {
	    			setUserInput({
						email: '',
						password: '',
						confirmPassword: ''
	    			})

	    			setCurrentUser({
					  email: userInput.email,
					  token: response.data.token
					});

	    			// Always navigate to pricing page after successful registration (Netflix-style)
	    			navigate('/pricing', { replace: true });
	    		}

	    		else {
	    			setErrMsg("Register Failed...");
	    		}
	    	}

	    	catch (err) {
	    		if (!err?.response) {
	    			setErrMsg("Failed to Register. Try Again...");
	    		}
	    		else if (err.response.data?.statusCode === 400 && !err.response.data?.isSuccess) {
	    			setErrMsg(err.response?.data.message);
	    		}

	    		else if (err.response.data?.statusCode === 401) {
	    			setErrMsg(err.response?.data.message)
	    		}

	    		else {
	    			setErrMsg("Register Failed...");
	    		}
	    	}
	    	
	    	finally {
		      setIsLoading(false); // Stop loading after request completes
		    }
    	}
	}

	const togglePasswordVisibility = (field) => {
		setShowPassword(prevState => ({
	    	...prevState,
			[field]: !prevState[field]
	  	}));
	}

	return (
		<Fragment>
			<div className="bg-black min-h-screen w-full text-white">
				{/* Background layer */}
				<div className="relative min-h-screen">
					<div className="absolute inset-0 bg-gradient-to-b from-black/95 via-black/90 to-black/95"></div>
					
					{/* Navigation with centered logo */}
					<nav className="w-full fixed top-0 left-0 z-50 bg-black py-4 px-4 sm:px-6 md:px-16 border-b border-gray-800/50">
						<div className="flex justify-between items-center">
							<Link to="/" className="text-emerald-50 font-bold text-2xl sm:text-3xl md:text-5xl">
								FITNESS
							</Link>
							<div className="flex gap-2 sm:gap-4 items-center">
								{/* Theme Switcher */}
								{/*<ThemeSwitcher />*/}
								
								{/* Desktop Language Switch - shows full names */}
								<div className="hidden md:block">
									<LanguageSwitch showFullNames={true} />
								</div>
								{/* Mobile Language Switch - shows abbreviations */}
								<div className="md:hidden">
									<LanguageSwitch showFullNames={false} />
								</div>
							</div>
						</div>
					</nav>
					
					{/* Registration Form Container */}
					<div className="relative z-10 max-w-md mx-auto mt-20 sm:mt-24 md:mt-32 mb-8 p-6 sm:p-8 md:p-10 bg-black/80 rounded-lg border border-gray-800/50 backdrop-blur-sm">
						{isLoading ? (
							<div className="flex justify-center items-center h-64">
								<div className="animate-spin h-12 w-12 border-4 border-emerald-500 rounded-full border-t-transparent"></div>
							</div>
						) : (
							<>
								{errMsg && (
									<div 
										ref={errRef}
										className="bg-red-900/20 border border-red-800/50 text-red-200 p-3 rounded-md mb-6 text-center text-sm"
										aria-live="assertive"
									>
										{errMsg}
									</div>
								)}
								
								
									<>
										<h1 className="text-2xl sm:text-3xl font-bold mb-2 text-white">{t('createAccount')}</h1>
										<p className="text-gray-400 text-sm sm:text-base mb-6">{t('startyourstreamingjourney')}</p>
										
										<form onSubmit={handleSubmit} className="space-y-5">
											<div className="space-y-1">
												<div className={`relative ${inputError.email === false ? 'border-red-500' : 'border-gray-600'} bg-black/60 border rounded-md focus-within:border-emerald-500 transition duration-300`}>
													<div className="flex items-center">
														<span className="pl-3 text-gray-400">
													      <FaEnvelope />
													    </span>
													    <input
													     	type="email"
													     	ref={userRef}
															className="w-full bg-transparent py-3 px-3 focus:outline-none text-white text-sm sm:text-base"
													      	placeholder={t('email')}
													      	value={userInput.email}
													      	onChange={handleEmailChange}
															required
													    />
													</div>
												</div>
													{inputError.email && (
							          		<p className="text-red-500 text-sm mt-2">{t('pleaseEnterValidEmail')}</p>
							        		)}
											</div>

											<div className="space-y-1">
												<div className={`relative ${inputError.password === false ? 'border-red-500' : 'border-gray-600'} bg-black/60 border rounded-md focus-within:border-emerald-500 transition duration-300`}>
													<div className="flex items-center">
														<span className="pl-3 text-gray-400">
													      <FaLock />
													    </span>
													    <input
															type={showPassword.password ? "text" : "password"}
															className="w-full bg-transparent py-3 px-3 focus:outline-none text-white text-sm sm:text-base"
														      value={userInput.password}
														      onChange={handlePasswordChange}
																placeholder={t('passowrd')}
																required
														/>
														<button
															type="button"
													        onClick={() => togglePasswordVisibility('password')}
															className="cursor-pointer text-gray-400 pr-3 hover:text-emerald-500 transition duration-300"
													  >
															{showPassword.password ? <FaEyeSlash /> : <FaEye />}
														</button>
													</div>
												</div>
												{inputError.password && (
							          	<p className="text-red-500 text-sm mt-2">{t('passwordValid')}</p>
							        	)}
											</div>

											<div className="space-y-1">
												<div className={`relative ${userInput.confirmPassword && inputError.confirmPassword === false ? 'border-red-500' : 'border-gray-600'} bg-black/60 border rounded-md focus-within:border-emerald-500 transition duration-300`}>
													<div className="flex items-center">
														<span className="pl-3 text-gray-400">
								      						<FaLock />
								    					</span>
								    					<input
																type={showPassword.confirmPassword ? "text" : "password"}
																className="w-full bg-transparent py-3 px-3 focus:outline-none text-white text-sm sm:text-base"
								      						value={userInput.confirmPassword}
								      						onChange={handleConfirmPasswordChange}
																placeholder={t('confirmPassword')}
																required
								    					/>
														<button
															type="button"
							          						onClick={() => togglePasswordVisibility('confirmPassword')}
															className="cursor-pointer text-gray-400 pr-3 hover:text-emerald-500 transition duration-300"
							        					>
															{showPassword.confirmPassword ? <FaEyeSlash /> : <FaEye />}
														</button>
													</div>
												</div>
													{inputError.confirmPassword === false && (
								          	<p className="text-red-500 text-sm mt-2">{t('passwordMustMatch')}</p>
								        	)}
								  		</div>
											
											<button
												type="submit"
												className="w-full cursor-pointer bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-md font-medium transition duration-300 flex items-center justify-center mt-4"
											>
												{t('createAccountButton')} <FaArrowRight className="ml-2" />
											</button>
											
											<p className="text-gray-500 text-xs mt-4">
												{t('agreeToTerms')} <Link to="/terms" className="text-emerald-500 hover:text-emerald-400">{t('termsOfUse')}</Link> {t('acknowledgePrivacy')} <Link to="/privacy" className="text-emerald-500 hover:text-emerald-400">{t('privacyPolicy')}</Link>.
											</p>

											<p className="text-center mb-2 text-md sm:mt-5 text-gray-400 font-medium">{t('alreadyHaveAccount')} 
												<Link to="/login" className="text-white font-medium hover:text-emerald-800"> {t('signIn')}</Link>
											</p>
										</form>
									</>
								
							</>
						)}
					</div>

					{/* Footer */}
					<Footer />
				</div>
			</div>
		</Fragment>
	);
};

export default connect(
  null,
  { setCurrentUser }
)(Register);