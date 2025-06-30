import { Fragment, useEffect, useState, useRef } from 'react';
import { useSelector, connect } from 'react-redux';
import { useNavigate, useLocation } from "react-router-dom";
import { FaCheck, FaTimes, FaCreditCard, FaReceipt, FaExchangeAlt, FaCalendarAlt } from 'react-icons/fa';
import useTranslation from "../../hooks/useTranslation";
import { Navbar, LanguageSwitch, Footer } from '../index';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

const Billing = () => {
	const [ errMsg, setErrMsg ] = useState('');
	const errRef = useRef();

	const navigate = useNavigate();
	const location = useLocation();
	const from = location.state?.from?.pathname || '/pricing';

	const axiosPrivate = useAxiosPrivate();

	const currentUser = useSelector((state) => state.user.currentUser);

	const [ isLoading, setIsLoading ] = useState(true);

	const [cancelSuccessMsg, setCancelSuccessMsg] = useState('');

	const [ planStatus, setPlanStatus ] = useState(null);

	const [ subID, setSubID ] = useState(null);

	const [activeTab, setActiveTab] = useState('subscription');

	const [subscription, setSubscription] = useState(null);

	const { t } = useTranslation();

	const handleClick = (id, status) => {
		// currentUser.email ? navigate(from, { replace: true }) : navigate("/login");
		// console.log(id, status);

		id ? setSubID(id) : setSubID(null);

		status === "active" ? setPlanStatus(true) : setPlanStatus(false);

		setIsLoading(true);
	}

	// console.log(currentUser?.email);

	useEffect(() => {
		let isMounted = true;
		const controller = new AbortController();

		const getPlans = async () => {
		  	try {
			    const response = await axiosPrivate.post(
			      "/api/v1/users/subscriptions",
			      { email: currentUser?.email },
			      { signal: controller.signal }
			    );

			    // console.log(response.data);
			    
			    if (isMounted && response.data?.isSuccess) {
			      setIsLoading(false);
			      setSubscription(response.data?.plans[0].status === "fulfilled" ? response.data?.plans[0].value : null);
			    }
		  	}

		  	catch (error) {
		  		// console.log(error.response?.data);
			    // Check if this is a canceled request - this is normal during unmounting
			    if (error.name === 'CanceledError' || error.code === 'ERR_CANCELED') {
			      // console.log('Request was canceled', error.message);
			      return; // Don't navigate if it was just canceled
			    }

			    else if (error.response?.data) {
			    	setErrMsg(error.response?.data.message);

			    	setIsLoading(false);

			    	const interval = setTimeout(() => {
	                    if (isMounted) setErrMsg('');
	                }, 1000);

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

	useEffect(() => {
		let isMounted = true;
		const controller = new AbortController();

		const cancelPlan = async () => {
		  	try {
			    const response = await axiosPrivate.post(
			      "/api/v1/users/subscription-cancel",
			      { email: currentUser?.email, subscription_id: subID },
			      { signal: controller.signal }
			    );

			    // console.log(response.data);
			    
			    if (isMounted && response.data?.isSuccess) {
			      setIsLoading(false);
			      setSubscription(null);
			      setCancelSuccessMsg('Your subscription has been cancelled');
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

		planStatus && subID && cancelPlan();

		return () => {
			isMounted = false;
			controller.abort();
		}
	}, [planStatus, subID]);

	useEffect(() => {
		let isMounted = true;
		const controller = new AbortController();

		const interval = setTimeout(() => {
			if (isMounted) setCancelSuccessMsg('');
		}, 3000);

		return () => {
			clearTimeout(interval);
			isMounted = false;
			controller.abort();
		}
	}, [cancelSuccessMsg]);
	
	return (
		<Fragment>
			<div className="bg-black min-h-screen w-full text-white">
				{/* Background layer */}
				<div className="relative min-h-screen">
					<div className="absolute inset-0 bg-gradient-to-b from-black/95 via-black/90 to-black/95"></div>
					
					{/* Fixed Navbar */}
					<Navbar />
					
					{/* Main Content */}
					<div className="relative z-10 container mx-auto px-4 pt-24 pb-16 min-h-screen">
						{isLoading ? (
							<div className="flex justify-center items-center h-64">
								<div className="animate-spin h-12 w-12 border-4 border-emerald-500 rounded-full border-t-transparent"></div>
							</div>
						) : (
							<div className="max-w-4xl mx-auto mb-16">
								<h1 className="text-3xl font-bold mb-8 text-white">{t('billing')}</h1>

								{cancelSuccessMsg && (
									<div className="mb-6 text-center text-emerald-400 bg-emerald-900/20 border border-emerald-700 p-4 rounded-md">
										{cancelSuccessMsg}
									</div>
								)}
								
								{/* Tabs */}
								<div className="mb-8 border-b border-gray-800">
									<div className="flex space-x-8">
										<button 
											className={`pb-4 px-2 cursor-pointer ${activeTab === 'subscription' ? 'border-b-2 border-emerald-500 text-emerald-500' : 'text-gray-400'}`}
											onClick={() => setActiveTab('subscription')}
										>
											{t('subscription')}
										</button>
										<button 
											className={`pb-4 px-2 cursor-pointer ${activeTab === 'payment' ? 'border-b-2 border-emerald-500 text-emerald-500' : 'text-gray-400'}`}
											onClick={() => setActiveTab('payment')}
										>
											{t('Payment History')}
										</button>
									</div>
								</div>
								
								{/* Subscription Tab */}
								{activeTab === 'subscription' && (
									<div>
										{subscription !== null ? (
											<div>
												<div className="bg-black/60 backdrop-blur-sm border border-gray-800 rounded-lg p-6 mb-6">
													<div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
														<div>
															<h2 className="text-xl font-semibold mb-1 text-white">{t('Current Plan')}: {subscription?.product_name.toUpperCase()}</h2>
															<div className="flex items-center">
																<span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${subscription?.subscription_status === 'active' ? 'bg-emerald-600/20 text-emerald-400' : 'bg-red-600/20 text-red-400'}`}>
																	{subscription?.subscription_status === 'active' ? <FaCheck className="mr-1" /> : <FaTimes className="mr-1" />}
																	{subscription?.product_name.charAt(0).toUpperCase() + subscription?.product_name.slice(1)}
																</span>
																{subscription?.cancel_at_period_end && (
																	<span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-600/20 text-yellow-400">
																		{t('Cancels At Period End')}
																	</span>
																)}
															</div>
														</div>
														<div className="mt-4 md:mt-0">
															<p className="text-2xl font-bold text-emerald-400">
																€{(subscription?.amount/100).toFixed(2)}
																<span className="text-sm text-gray-400">/{subscription?.interval}</span>
															</p>
														</div>
													</div>
													
													<div className="border-t border-gray-800 pt-6 space-y-4">
														<div className="flex justify-between">
															<span className="text-gray-400">{t('Billing Period Starts')}</span>
															<span className="text-white">{new Date(subscription?.created).toDateString() }</span>
														</div>
														<div className="flex justify-between">
															<span className="text-gray-400">{t('Plan Duration')}</span>
															<span className="text-white">{subscription?.interval_count + " " + subscription?.interval.toUpperCase()}</span>
														</div>
													</div>
												</div>
												
												<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
														<button 
															onClick={() => handleClick(subscription?.subscription_id, subscription?.subscription_status)}
															className="flex items-center justify-center gap-2 py-3 px-6 bg-gray-700 hover:bg-gray-600 text-white rounded-md transition duration-200 cursor-pointer"
														>
															<FaTimes />
															{t('cancelSubscription')}
														</button>
												</div>
											</div>
										) : (
											<div className="text-center py-8 text-gray-400">
														<FaReceipt className="text-4xl mx-auto mb-4" />
														<p>{t('No subscription found')}</p>
											</div>
										)}
									</div>
								)}
								
								{/* Payment History Tab */}
								{activeTab === 'payment' && (
									<div>
										<div className="bg-black/60 backdrop-blur-sm border border-gray-800 rounded-lg p-6">
											<h2 className="text-xl font-semibold mb-6 text-white">{t('Payment History')}</h2>
											
											{subscription !== null ? (
												<div className="space-y-4">
														<div key={subscription?.subscription_id} className="border-b border-gray-800 pb-4">
															<div className="flex flex-col md:flex-row md:items-center md:justify-between">
																<div>
																	<div className="flex items-center">
																		<FaCalendarAlt className="text-gray-400 mr-2" />
																		<span className="text-white">{new Date(subscription?.created).toLocaleDateString()}</span>
																	</div>
																	<div className="flex items-center mt-1">
																		<FaCreditCard className="text-gray-400 mr-2" />
																		<span className="capitalize text-white">{subscription?.card_details.brand} •••• {subscription?.card_details.last4}</span>
																	</div>
																</div>
																<div className="mt-2 md:mt-0">
																	<p className="font-bold text-emerald-400">€{(subscription?.amount/100).toFixed(2)}</p>
																	<span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${subscription?.subscription_status === 'active' ? 'bg-emerald-600/20 text-emerald-400' : 'bg-red-600/20 text-red-400'}`}>
																		{subscription?.subscription_status === 'active' ? <FaCheck className="mr-1" /> : <FaTimes className="mr-1" />}
																		{subscription?.subscription_status.charAt(0).toUpperCase() + subscription?.subscription_status.slice(1)}
																	</span>
																</div>
															</div>
														</div>
												</div>
											) : (
												<div className="text-center py-8 text-gray-400">
													<FaReceipt className="text-4xl mx-auto mb-4" />
													<p>{t('No Payment History')}</p>
												</div>
											)}
										</div>
									</div>
								)}
							</div>
						)}
					</div>
					
					{/* Footer */}
					<Footer />
				</div>
			</div>
		</Fragment>
	);
};

export default connect(null, null)(Billing);