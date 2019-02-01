import algoliaClient from '../../../../api/algolia'

export default function filterFiles ({ state }, payload) {
  state.loadingFiles = true

  const index = algoliaClient.initIndex(`files_#${state.authUserId}`)

  index.setSettings({
    queryType: 'prefixAll',
    searchableAttributes: ['name', 'postedIn']
  })

  index.search(payload)
    .then(function (content) {
      state.userFiles = []
      const files = content.hits

      if (files.length === 0) state.loadingFiles = false

      files.forEach(function (file) {
        state.userFiles.push({ id: file.objectID, ...file })
      })

      state.loadingFiles = false
    })
    .catch((error) => {
      state.loadingFiles = false
      console.error(error)
    })
}
