import GlobalStyle from "./components/styles/GlobalStyles"
import Store from "./pages/store"
import News from "./pages/news"
import About from "./pages/about"
import Header from "./components/header"
import NewsPost from "./components/newsPost"
import NotFound from "./components/notFound"
import Help from "./pages/help"
import { Routes, Route } from "react-router-dom"

function App() {
	return (
		<>
			<GlobalStyle />
			<Header />
			<Routes>
				<Route path="/" element={<Store />} />
				{/* <Route path="/news" element={<News />} />
				<Route path="/news/:slug" element={<NewsPost />} />
				<Route path="/about" element={<About />} />
				<Route path="/help" element={<Help />} /> */}
				<Route path="*" element={<NotFound />} />
			</Routes>
		</>
	)
}

export default App
