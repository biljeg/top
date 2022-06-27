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
import CanceledOrder from "./components/canceledOrder"
import SellProduct from "./pages/sellProduct/SellProduct.component"
import SellMenu from "./pages/sellMenu"

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
				<Route path="/buy/:urlKey" element={<Buy />} />
				<Route path="/sell" element={<SellMenu />} />
				<Route path="/sell/:urlKey" element={<SellProduct />} />
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
