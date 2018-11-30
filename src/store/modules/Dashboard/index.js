import {
  UPLOAD_FILE,
  GET_AUTH_USER,
  ON_CHECKING_FILES,
  FILTER_FILES,
  SHARE_FILE,
  DELETE_FILE,
  SIGNOUT
} from '../../constants'

import getAuthUser from './getAuthUser'
import uploadFile from './uploadFile'
import onCheckingFiles from './onCheckingFiles'
import filterFiles from './filterFiles'
import shareFile from './shareFile'
import deleteFile from './deleteFile'
import signout from './signout'

export default {
  state: {
    userFiles: [],
    loadingFiles: false,
    authUserId: null,
    sharedWithSuccess: false,
    deletedWithSuccess: false,
    authUser: {
      type: null
    }
  },
  actions: {
    [GET_AUTH_USER]: getAuthUser,
    [UPLOAD_FILE]: uploadFile,
    [ON_CHECKING_FILES]: onCheckingFiles,
    [FILTER_FILES]: filterFiles,
    [SHARE_FILE]: shareFile,
    [DELETE_FILE]: deleteFile,
    [SIGNOUT]: signout
  }
}
