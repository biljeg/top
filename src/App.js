import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import GlobalStyle from "./components/styles/GlobalStyles"
import Home from "./pages/home"
import Campgrounds from "./pages/destinations"
import BlogPage from "./pages/blogPage"
import About from "./pages/about"
import Header from "./components/header"
import Blog from "./components/blog/Blog.component"
import Campground from "./components/destination"
import NotFound from "./components/notFound"
import { QueryClient, QueryClientProvider } from "react-query"
const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
		},
	},
})

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<Router>
				<GlobalStyle />
				<Header />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/destinations" element={<Campgrounds />} />
					<Route path="/destinations/:destinationId" element={<Campground />} />
					<Route path="/blog" element={<BlogPage />} />
					<Route path="/blog/:slug" element={<Blog />} />
					<Route path="/about" element={<About />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</Router>
		</QueryClientProvider>
	)
}

export default App
