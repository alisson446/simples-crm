import { mapState } from 'vuex'
import {
  UPLOAD_FILE,
  GET_AUTH_USER,
  ON_CHECKING_FILES,
  FILTER_FILES,
  SHARE_FILE,
  DELETE_FILE,
  SIGNOUT
} from '@/store/constants'

export default {
  name: 'Dashboard',
  data: () => ({
    searchName: null,
    date: null,
    dateFormatted: null,
    menu: false,
    clickUserOptions: false,
    showShareDialog: false,
    showDeleteDialog: false,
    file: {
      toShare: null,
      emailToShare: null,
      toDelete: null
    },
    options: {
      url: '/'
    }
  }),
  watch: {
    searchName: function () {
      this.filterFiles()
    },
    date: function () {
      this.filterFiles()
      this.dateFormatted = this.formatDate(this.date)
    }
  },
  computed: {
    sharedWithSuccess: {
      get: function () { return this.$store.state.Dashboard.sharedWithSuccess },
      set: function (newValue) { return newValue }
    },
    deletedWithSuccess: {
      get: function () { return this.$store.state.Dashboard.deletedWithSuccess },
      set: function (newValue) { return newValue }
    },
    ...mapState({
      userFiles: state => state.Dashboard.userFiles,
      hasFiles: state => state.Dashboard.userFiles.length !== 0,
      loadingFiles: state => state.Dashboard.loadingFiles,
      computedDateFormatted () {
        return this.formatDate(this.date)
      }
    })
  },
  created () {
    this.$store.dispatch(GET_AUTH_USER)
    this.$store.dispatch(ON_CHECKING_FILES)
  },
  methods: {
    addedFile (file) {
      this.$store.dispatch(UPLOAD_FILE, file._file)
    },
    filterFiles () {
      const name = this.searchName ? this.searchName : ''
      const date = this.date ? this.date : ''
      const query = `${name} ${date}`

      this.$store.dispatch(FILTER_FILES, query)
    },
    shareFile (fileId, email) {
      this.showShareDialog = false
      this.file.toShare = null
      this.file.emailToShare = null

      if (email) {
        this.$store.dispatch(SHARE_FILE, { fileId, email })
      }
    },
    deleteFile (fileId) {
      this.showDeleteDialog = false
      this.file.toDelete = null

      this.$store.dispatch(DELETE_FILE, fileId)
    },
    openShareDialog (fileId) {
      this.showShareDialog = true
      this.file.toShare = fileId
    },
    closeShareDialog () {
      this.showShareDialog = false
      this.file.emailToShare = null
    },
    openDeleteDialog (fileId) {
      this.showDeleteDialog = true
      this.file.toDelete = fileId
    },
    formatDate (date) {
      if (!date) return null

      const [year, month, day] = date.split('-')
      return `${day}/${month}/${year}`
    },
    parseDate (date) {
      if (!date) return null

      const [month, day, year] = date.split('/')
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    },
    signout () {
      this.$store.dispatch(SIGNOUT)
    }
  }
}
