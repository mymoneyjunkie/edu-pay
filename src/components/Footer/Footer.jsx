import { Link } from 'react-router-dom';
import { LanguageSwitch } from '../index';
import useTranslation from "../../hooks/useTranslation";

const Footer = () => {
	const { t } = useTranslation();

	// const [ pages, setPages ] = useState([
	//   {
	//     label: "Support",
	//     path: "/support",
	//   },
	//   {
	//     label: "Privacy",
	//     path: "/privacy",
	//   },
	//   {
	//     label: "Terms",
	//     path: "/terms",
	//   },
	//   {
	//     label: "DMCA",
	//     path: "/dmca",
	//   },
	//   {
	//     label: "EULA",
	//     path: "/eula",
	//   }
	// ]);

	return (
		<div className="relative z-10 w-full border-t border-gray-800 py-8 px-4 bg-black/60 backdrop-blur-sm">
			<div className="max-w-6xl mx-auto">
				<div className="flex flex-col md:flex-row justify-between items-center mb-8">
					<div className="text-emerald-50 font-bold text-xl mb-4 md:mb-0">
						FITNESS
					</div>
					<LanguageSwitch showFullNames={true} />
				</div>
							
				<div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs text-gray-400 mb-8">
					<div>
						<ul className="space-y-2">
							<li><a href="/support" className="hover:text-emerald-500 transition duration-300 cursor-pointer">{t('support')}</a></li>
							<li><a href="/privacy" className="hover:text-emerald-500 transition duration-300 cursor-pointer">{t('privacy')}</a></li>
						</ul>
					</div>
					<div>
						<ul className="space-y-2">
							<li><a href="#" className="hover:text-emerald-500 transition duration-300 cursor-pointer">{t('helpcenter')}</a></li>
							<li><a href="#" className="hover:text-emerald-500 transition duration-300 cursor-pointer">{t('cookiepreferences')}</a></li>
						</ul>
					</div>
					<div>
						<ul className="space-y-2">
							<li><a href="/terms" className="hover:text-emerald-500 transition duration-300 cursor-pointer">{t('termsofuse')}</a></li>
							<li><a href="/eula" className="hover:text-emerald-500 transition duration-300 cursor-pointer">EULA</a></li>
						</ul>
					</div>
					<div>
						<ul className="space-y-2">
							<li><a href="/dmca" className="hover:text-emerald-500 transition duration-300 cursor-pointer">DMCA</a></li>
							<li><a href="#" className="hover:text-emerald-500 transition duration-300 cursor-pointer">{t('contactUs')}</a></li>
						</ul>
					</div>
				</div>
				
				<div className="border-t border-gray-800 pt-6">
					<p className="text-gray-400 text-xs text-center md:text-left mb-2">
						{t('questions')}
					</p>
					<p className="text-gray-400 text-xs text-center md:text-left">
						{t('country')}
					</p>
				</div>
			</div>
		</div>
	)
}

export default Footer;