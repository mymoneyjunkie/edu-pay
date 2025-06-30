import { useEffect, useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import { FaCheck, FaBars, FaSignOutAlt } from "react-icons/fa";
import { LanguageSwitch, Navbar } from "../../components";
import useTranslation from "../../hooks/useTranslation";
import { Footer } from "../../components";
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

// Import the background image for consistency with landing page
// import netflixBg from '../../assets/netflix_bg_new.jpg';

const Home = () => {
	const [ errMsg, setErrMsg ] = useState('');
	// const [ isLoading, setIsLoading ] = useState(false);
	const errRef = useRef();
	const navigate = useNavigate();
	const currentUser = useSelector((state) => state.user.currentUser);
	const [isLoading, setIsLoading] = useState(true);
	const { t } = useTranslation();

	const axiosPrivate = useAxiosPrivate();

	useEffect(() => {
		// Simulate API load
		const timer = setTimeout(() => {
			setIsLoading(false);
		}, 1000);
		
		return () => clearTimeout(timer);
	}, []);

	const handleClick = () => {
		currentUser?.email ? navigate('/pricing', { replace: true }) : navigate("/login");
	}

	useEffect(() => {
		let isMounted = true;
		const controller = new AbortController();

		const getPlans = async () => {
		  	try {
			    const response = await axiosPrivate.post(
			      "/api/v1/users/subscription-home",
			      { email: currentUser?.email },
			      { signal: controller.signal }
			    );
			    
			    if (isMounted) {
			      setIsLoading(false);
			    }
		  	}

		  	catch (error) {
			    // Check if this is a canceled request - this is normal during unmounting
			    if (error.name === 'CanceledError' || error.code === 'ERR_CANCELED') {
			      // console.log('Request was canceled', error.message);
			      return; // Don't navigate if it was just canceled
			    }

			    else if (error.response?.data) {
			    	setErrMsg(error.response?.data.message);

			    	const interval = setTimeout(() => {
	                    if (isMounted) setErrMsg('');
	                }, 3000);

	                // Clear the timeout on cleanup
	                return () => {
	                    clearTimeout(interval);
	                };
			    }
			    
			    // Only navigate to login for actual auth errors
			    else if (error.response?.data.statusCode === 401) {
			      navigate("/login", { state: { from: location }, replace: true });
			    }

			    else {
			    	// console.error("Error fetching plans:", error);
			    	return;
			    }
		  	}
		};

		getPlans();

		return () => {
			isMounted = false;
			controller.abort();
		}
	}, []);

	return (
		<div className="bg-black min-h-screen w-full text-white">
			{/* Background layer */}
			<div className="relative min-h-screen">
				<div className="absolute inset-0 bg-gradient-to-b from-black/95 via-black/90 to-black/95"></div>
				
				{/* Navigation */}
				<Navbar />

				{isLoading ? (
					<div className="relative z-10 flex justify-center items-center h-[80vh] pt-20">
						<div className="animate-spin h-12 w-12 border-4 border-emerald-500 rounded-full border-t-transparent"></div>
					</div>
				) : (
					<div className="relative z-10 max-w-4xl mx-auto mt-20 sm:mt-24 md:mt-32 mb-20 p-6 sm:p-8 md:p-10 bg-black/80 rounded-lg border-0 lg:border border-gray-800/50 backdrop-blur-sm">
						<div className="flex flex-col items-center">
							{/* Circle with checkmark */}
							<div className="border-2 border-emerald-500 rounded-full p-3 flex items-center justify-center w-16 h-16 mb-6">
								<FaCheck className="text-emerald-500" size={24} />
							</div>

							<div className="mb-2">
								<p className="uppercase text-base font-medium text-gray-300">{t('step3of4')}</p>
							</div>

							<div className="mb-8">
								<p className="text-2xl lg:text-4xl">{t('chooseYourPlan')}</p>
							</div>

							<div className="border-0 flex justify-center items-center mb-8">
								<table className="table-auto border-0 xs:pl-12 xs:pr-10 xd:pl-20 xm:pl-25 xm:pr-15 sm:px-4 border-separate border-spacing-y-2">
								  <tbody>
								    <tr>
								      <td><FaCheck className="text-emerald-500" fontSize={20} fontWeight={0} /></td>
								      <td className="text-lg subpixel-antialiased xm:line-clamp-0 sm:line-clamp-2">
								      	{t('noCommitments')}
								      </td>
								    </tr>
								    <tr>
								      <td><FaCheck className="text-emerald-500" fontSize={20} fontWeight={0} /></td>
								      <td className="text-lg subpixel-antialiased xm:line-clamp-0 sm:line-clamp-2">
								      	{t('allFitness')}
								      </td>
								    </tr>
								    <tr>
								      <td><FaCheck className="text-emerald-500" fontSize={20} fontWeight={0} /></td>
								      <td className="text-lg subpixel-antialiased xm:line-clamp-0 sm:line-clamp-2">
								      	{t('noAds')}
								      </td>
								    </tr>
								  </tbody>
								</table>
							</div>
							
							<div className="w-60 md:w-90">
								<button 
									type="button"
									onClick={handleClick} 
									className="w-full font-medium py-3 bg-emerald-600 hover:bg-emerald-700 text-lg text-white tracking-wide cursor-pointer transition duration-300 ease-in-out rounded-md"
								>
									{t('next')}
								</button>
							</div>
						</div>
					</div>
				)}
				
				{/* Footer */}
				<Footer />
			</div>
		</div>
	);
};

export default Home;