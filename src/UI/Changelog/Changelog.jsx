import { connect } from "react-redux";
import { LanguageSwitch, Navbar } from "../../components";
import useTranslation from "../../hooks/useTranslation";

const Changelog = () => {
	const { t } = useTranslation();

	return (
		<div className="bg-black min-h-screen w-full text-white">
			{/* Background layer */}
			<div className="relative min-h-screen">
				<div className="absolute inset-0 bg-gradient-to-b from-black/95 via-black/90 to-black/95"></div>
				
				{/* Fixed Navbar */}
				<Navbar />

				{/* Main Content */}
				<div className="relative z-10 max-w-4xl mx-auto pt-24 pb-8 px-6 sm:px-8 md:px-10">
					<div className="bg-black/80 rounded-lg border border-gray-800/50 backdrop-blur-sm p-6 sm:p-8 md:p-10">
						<h1 className="text-3xl sm:text-4xl font-bold mb-8 text-center text-white">{t('changelog')}</h1>

						<div className="space-y-8">
							<div className="border-l-4 border-emerald-500 pl-6 py-2">
								<p className="text-xl font-semibold text-white flex items-center justify-between">
									<span>{t('version')} 1.4.0</span>
									<span className="text-sm text-gray-400">{t('changelog140Date')}</span>
								</p>
								<ul className="mt-4 space-y-3 text-gray-300">
									<li className="flex items-start">
										<span className="w-2 h-2 bg-emerald-500 rounded-full mt-1.5 mr-3 flex-shrink-0"></span>
										<span>{t('changelog140Entry1')}</span>
									</li>
									<li className="flex items-start">
										<span className="w-2 h-2 bg-emerald-500 rounded-full mt-1.5 mr-3 flex-shrink-0"></span>
										<span>{t('changelog140Entry2')}</span>
									</li>
									<li className="flex items-start">
										<span className="w-2 h-2 bg-emerald-500 rounded-full mt-1.5 mr-3 flex-shrink-0"></span>
										<span>{t('changelog140Entry3')}</span>
									</li>
								</ul>
							</div>

							<div className="border-l-4 border-emerald-500 pl-6 py-2">
								<p className="text-xl font-semibold text-white flex items-center justify-between">
									<span>{t('version')} 1.3.2</span>
									<span className="text-sm text-gray-400">{t('changelog132Date')}</span>
								</p>
								<ul className="mt-4 space-y-3 text-gray-300">
									<li className="flex items-start">
										<span className="w-2 h-2 bg-emerald-500 rounded-full mt-1.5 mr-3 flex-shrink-0"></span>
										<span>{t('changelog132Entry1')}</span>
									</li>
									<li className="flex items-start">
										<span className="w-2 h-2 bg-emerald-500 rounded-full mt-1.5 mr-3 flex-shrink-0"></span>
										<span>{t('changelog132Entry2')}</span>
									</li>
								</ul>
							</div>

							<div className="border-l-4 border-emerald-500 pl-6 py-2">
								<p className="text-xl font-semibold text-white flex items-center justify-between">
									<span>{t('version')} 1.3.0</span>
									<span className="text-sm text-gray-400">{t('changelog130Date')}</span>
								</p>
								<ul className="mt-4 space-y-3 text-gray-300">
									<li className="flex items-start">
										<span className="w-2 h-2 bg-emerald-500 rounded-full mt-1.5 mr-3 flex-shrink-0"></span>
										<span>{t('changelog130Entry1')}</span>
									</li>
									<li className="flex items-start">
										<span className="w-2 h-2 bg-emerald-500 rounded-full mt-1.5 mr-3 flex-shrink-0"></span>
										<span>{t('changelog130Entry2')}</span>
									</li>
								</ul>
							</div>

							<div className="border-l-4 border-emerald-500 pl-6 py-2">
								<p className="text-xl font-semibold text-white flex items-center justify-between">
									<span>{t('version')} 1.0.0</span>
									<span className="text-sm text-gray-400">{t('changelog100Date')}</span>
								</p>
								<ul className="mt-4 space-y-3 text-gray-300">
									<li className="flex items-start">
										<span className="w-2 h-2 bg-emerald-500 rounded-full mt-1.5 mr-3 flex-shrink-0"></span>
										<span>{t('changelog100Entry1')}</span>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
				
				{/* Footer */}
				<div className="relative z-10 w-full border-t border-gray-800 py-6 px-4 mt-auto bg-black/60 backdrop-blur-sm">
					<div className="max-w-6xl mx-auto">
						<div className="flex flex-col md:flex-row justify-between items-center mb-6 sm:mb-8">
							<div className="text-emerald-50 font-bold text-xl mb-4 md:mb-0">
								YENUMAX
							</div>
							<LanguageSwitch showFullNames={true} />
						</div>

						<div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs text-gray-400">
							<div>
								<ul className="space-y-2">
									<li><a href="#" className="hover:text-emerald-500 transition duration-300 cursor-pointer">{t('faq')}</a></li>
									<li><a href="#" className="hover:text-emerald-500 transition duration-300 cursor-pointer">{t('cookiePreferences')}</a></li>
								</ul>
							</div>
							<div>
								<ul className="space-y-2">
									<li><a href="#" className="hover:text-emerald-500 transition duration-300 cursor-pointer">{t('helpCenter')}</a></li>
									<li><a href="#" className="hover:text-emerald-500 transition duration-300 cursor-pointer">{t('corporateInfo')}</a></li>
								</ul>
							</div>
							<div>
								<ul className="space-y-2">
									<li><a href="#" className="hover:text-emerald-500 transition duration-300 cursor-pointer">{t('contactUs')}</a></li>
									<li><a href="#" className="hover:text-emerald-500 transition duration-300 cursor-pointer">{t('investorRelations')}</a></li>
								</ul>
							</div>
							<div>
								<ul className="space-y-2">
									<li><a href="#" className="hover:text-emerald-500 transition duration-300 cursor-pointer">{t('onlyOn')}</a></li>
									<li><a href="#" className="hover:text-emerald-500 transition duration-300 cursor-pointer">{t('mediaCenter')}</a></li>
								</ul>
							</div>
						</div>
						
						<p className="text-gray-400 mt-6 text-xs text-center md:text-left">
							{t('questions')}
						</p>
						<p className="text-gray-400 mt-1 text-xs text-center md:text-left">
							{t('country')}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default connect(null, null)(Changelog);