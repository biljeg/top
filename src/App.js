import { Routes, Route } from "react-router-dom"

import GlobalStyle from "./components/styles/GlobalStyles"
import AppContextProvider from "./hooks/AppContext"
import Home from "./pages/home"
import FilterProducts from "./pages/filterProducts"
import ProductDetails from "./pages/productDetails"
import News from "./pages/news"
import NewsPost from "./pages/newsPost"
import About from "./pages/about"
import Header from "./components/header"
import NotFound from "./components/notFound"
import Help from "./pages/help"
import Login from "./pages/login"
import Profile from "./pages/profile"
import ResetPassword from "./components/resetPassword"
import Footer from "./components/footer"

function App() {
	return (
		<AppContextProvider>
			<GlobalStyle />
			<Header />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/sneakers" element={<FilterProducts />} />
				<Route path="/sneakers/:urlKey" element={<ProductDetails />} />
				{/* <Route path="/news" element={<News />} />
				<Route path="/news/:slug" element={<NewsPost />} />
				<Route path="/about" element={<About />} />
			<Route path="/help" element={<Help />} /> */}
				<Route path="/login" element={<Login />} />
				<Route path="/profile" element={<Profile />} />
				<Route path="/reset-password" element={<ResetPassword />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
			<Footer />
		</AppContextProvider>
	)
}

export default App
