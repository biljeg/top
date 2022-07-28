import { Routes, Route } from "react-router-dom"
import styled from "styled-components/macro"

import GlobalStyle from "./components/styles/GlobalStyles"
import { AppContextProvider } from "./hooks/AppContext"
import CanceledOrder from "./components/canceledOrder"
import Header from "./components/header"
import NotFound from "./components/notFound"
import ResetPassword from "./components/resetPassword"
import Footer from "./components/footer"
import Home from "./pages/home"
import FilterProducts from "./pages/filterProducts"
import ProductDetails from "./pages/productDetails"
import Help from "./pages/help"
import Login from "./pages/login"
import Profile from "./pages/profile"
import Terms from "./pages/terms"
import Privacy from "./pages/privacy"
import Buy from "./pages/buy"
import SellProduct from "./pages/sellProduct"
import SellMenu from "./pages/sellMenu"

function App() {
	return (
		<AppContextProvider>
			<GlobalStyle />
			<Header />
			<PageWrapper>
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
			</PageWrapper>
			<Footer />
		</AppContextProvider>
	)
}

export default App

const PageWrapper = styled.div`
	display: flex;
	justify-content: center;
	width: 100%;
	background-color: ${props => props.theme.colors.white};
`
