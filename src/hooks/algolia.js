import algoliasearch from "algoliasearch/lite"

export const searchClient = algoliasearch(
	"QFNT159X4M",
	"30117fb0af35b5c53ae0824f2f2a869c"
)

export const index = searchClient.initIndex("sneakers")
