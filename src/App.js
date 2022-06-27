import styled from "styled-components/macro"
import { Routes, Route } from "react-router-dom"
import GlobalStyle from "./components/styles/GlobalStyles"
import { AppContextProvider } from "./hooks/AppContext"
import Home from "./pages/home"
import FilterProducts from "./pages/filterProducts"
import ProductDetails from "./pages/productDetails"
import Header from "./components/header"
import NotFound from "./components/notFound"
import Help from "./pages/help"
import Login from "./pages/login"
import Profile from "./pages/profile"
import ResetPassword from "./components/resetPassword"
import Footer from "./components/footer"
import Terms from "./pages/terms"
import Privacy from "./pages/privacy"
import Buy from "./pages/buy"
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import CanceledOrder from "./components/canceledOrder"
const stripePromise = loadStripe(
	"pk_test_51LEiL9Lf1upELHeD46KRRzQELWjUkHTQ7gfirZkRaWJs9ZEwh9OXA4OuVH3atsGVIu8COcsBbAgkOcBr3vPl5wDs008bhky2K4"
)

function App() {
	return (
		<AppContextProvider>
			<GlobalStyle />
			<Header />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/sneakers" element={<FilterProducts />} />
				<Route path="/sneakers/:urlKey" element={<ProductDetails />} />
				<Route path="/buy/:urlKey" element={<Buy />} />
				<Route path="/help" element={<Help />} />
				<Route path="/login" element={<Login />} />
				<Route path="/profile" element={<Profile />} />
				<Route
					path="/buy/:urlKey"
					element={
						<Elements stripe={stripePromise}>
							<Buy />
						</Elements>
					}
				/>
				<Route path="/reset-password" element={<ResetPassword />} />
				<Route path="/order/cancel" element={<CanceledOrder />} />
				<Route path="/terms" element={<Terms />} />
				<Route path="/privacy" element={<Privacy />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
			<Footer />
		</AppContextProvider>
	)
}

export default App

//move it to utilities component
//wrap the main element around everything and set it's max width etc,
//for pages that need something else make it take parameter of the current path
//and customise the styles from there
const Main = styled.main``
