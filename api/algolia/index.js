import algoliasearch from 'algoliasearch'

export default algoliasearch(
  process.env.ALGOLIA.APLICATION_ID,
  process.env.ALGOLIA.API_KEY
)
