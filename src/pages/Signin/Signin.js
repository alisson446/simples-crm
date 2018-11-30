import { mapState } from 'vuex'
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'

import { SIGNIN } from '@/store/constants'

export default {
  name: 'Signin',
  mixins: [validationMixin],
  data: () => ({
    form: {
      userOrEmail: null,
      password: null
    }
  }),
  computed: mapState({
    userLogged: state => state.Signin.userLogged,
    checking: state => state.Signin.checking,
    loginError: state => state.Signin.loginError
  }),
  validations: {
    form: {
      userOrEmail: {
        required
      },
      password: {
        required
      }
    }
  },
  methods: {
    getValidationClass (fieldName) {
      const field = this.$v.form[fieldName]

      return {
        'md-invalid': field && field.$invalid && field.$dirty
      }
    },
    login () {
      this.$store.dispatch(SIGNIN, {
        userOrEmail: `${this.form.userOrEmail}`,
        password: this.form.password
      })
    },
    validateUser () {
      this.$v.$touch()

      if (!this.$v.$invalid) {
        this.login()
      }
    }
  }
}
