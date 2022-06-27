import { loadStripe } from "@stripe/stripe-js"

const initStripe = async () => {
	const stripePromise = await loadStripe(
		"pk_test_51LEiL9Lf1upELHeD46KRRzQELWjUkHTQ7gfirZkRaWJs9ZEwh9OXA4OuVH3atsGVIu8COcsBbAgkOcBr3vPl5wDs008bhky2K4"
	)
	return stripePromise
}

export default initStripe
