import algoliasearch from "algoliasearch/lite"
import { loadStripe } from "@stripe/stripe-js"

export const searchClient = algoliasearch(
	"QFNT159X4M",
	"30117fb0af35b5c53ae0824f2f2a869c"
)

const initStripe = async () => {
	const stripePromise = await loadStripe(
		"pk_test_51LEiL9Lf1upELHeD46KRRzQELWjUkHTQ7gfirZkRaWJs9ZEwh9OXA4OuVH3atsGVIu8COcsBbAgkOcBr3vPl5wDs008bhky2K4"
	)
	return stripePromise
}

export const index = searchClient.initIndex("sneakers")
export default initStripe
