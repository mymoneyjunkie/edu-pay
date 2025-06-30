import { Navbar, Footer } from '../index';

const Layout = ({ children }) => {
	return (
		<>
			<header>
				<Navbar />
			</header>

			<section className="md:mt-20">
				{children}
			</section>

			<footer>
				<Footer />
			</footer>
		</>
	)
}

export default Layout;