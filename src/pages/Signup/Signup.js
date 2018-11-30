import { mapState } from 'vuex'
import { validationMixin } from 'vuelidate'
import {
  required,
  email,
  minLength
} from 'vuelidate/lib/validators'

import {
  SIGNUP,
  CHECK_FIELD_VALUE_EXISTS
} from '@/store/constants'

export default {
  name: 'Signup',
  mixins: [validationMixin],
  data: () => ({
    form: {
      userAccount: null,
      name: null,
      company: null,
      email: null,
      password: null
    },
    prevUserAccountValue: null,
    prevEmailValue: null,
    userAccountClass: null,
    emailClass: null,
    checkingField: false
  }),
  computed: mapState({
    userAccountExists: state => state.Signup.userAccountExists,
    userAccountInvalided: state => state.Signup.userAccountInvalided,
    emailExists: state => state.Signup.emailExists,
    userAccount: state => state.Signup.userAccount,
    userSaved: state => state.Signup.userSaved,
    sending: state => state.Signup.sending
  }),
  validations: {
    form: {
      userAccount: {
        required
      },
      name: {
        required,
        minLength: minLength(3)
      },
      company: {
        required
      },
      email: {
        required,
        email
      },
      password: {
        required,
        minLength: minLength(6)
      }
    }
  },
  methods: {
    isInvalid (fieldName) {
      const field = this.$v.form[fieldName]
      return field && field.$invalid && field.$dirty
    },
    getValidationClass (fieldName) {
      return {
        'md-invalid': this.isInvalid(fieldName)
      }
    },
    checkFieldValueExists (fieldName) {
      // Check if previous value typed is equal to current
      if (
        (fieldName === 'userAccount' && this.prevUserAccountValue !== this.form.userAccount) ||
        (fieldName === 'email' && this.prevEmailValue !== this.form.email)
      ) {
        this.prevUserAccountValue = this.form.userAccount
        this.prevEmailValue = this.form.email
        this.checkingField = true

        // Check if value exists in database
        this.$store.dispatch(CHECK_FIELD_VALUE_EXISTS, {
          field: fieldName,
          value: this.form[fieldName]
        })
          .then(() => {
            this.checkingField = false

            // Set property class like valid or not
            this[`${fieldName}Class`] = {
              'md-invalid': (
                this.isInvalid(fieldName) || this[`${fieldName}Exists`] || this[`${fieldName}Invalided`]
              )
            }
          })
      }
    },
    clearForm () {
      this.$v.$reset()
      this.form.userAccount = null
      this.form.name = null
      this.form.company = null
      this.form.email = null
      this.form.password = null
    },
    saveUser () {
      this.$store.dispatch(SIGNUP, {
        userAccount: `${this.form.userAccount}`,
        name: `${this.form.name}`,
        company: `${this.form.company}`,
        email: this.form.email,
        password: this.form.password
      })
        .then(() => {
          this.clearForm()
        })
    },
    validateUser () {
      this.$v.$touch()

      if (!this.$v.$invalid) {
        this.saveUser()
      }
    }
  }
}
