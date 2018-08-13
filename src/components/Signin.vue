<template>
  <div class='signup'>

    <form novalidate class="md-layout" @submit.prevent="validateUser">
      <md-card class="md-layout-item md-size-35 md-small-size-100 md-accent">
        <md-card-header>
          <div class="md-title">Login</div>
        </md-card-header>

        <md-card-content>
          <md-field :class="getValidationClass('userAccount')">
            <label for="userAccount">Usuário ou Email</label>
            <md-input name="userAccount" id="userAccount" autocomplete="given-name" v-model="form.userAccount" :disabled="sending" />
            <span class="md-error" v-if="!$v.form.userAccount.required">O usuário ou email é obrigatório</span>
          </md-field>

          <md-field :class="getValidationClass('password')">
            <label for="password">Senha</label>
            <md-input type="password" name="password" id="password" autocomplete="password" v-model="form.password" :disabled="sending" />
            <span class="md-error" v-if="!$v.form.password.required">A senha é obrigatória</span>
          </md-field>
        </md-card-content>

        <md-progress-bar md-mode="indeterminate" v-if="sending" />

        <md-card-actions>
          <div id="signup-label">Não possui uma conta?
            <a href="#/signup">Cadastre-se</a>
          </div>
          <md-button type="submit" id="send-button" class="md-raised" :disabled="sending">Entrar</md-button>
        </md-card-actions>
      </md-card>

      <md-snackbar :md-active.sync="userSaved">O usuário {{ userAccount }} foi criado com sucesso!</md-snackbar>
    </form>
  </div>

</template>

<script>

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
} from '@/store/actions'

export default {
  name: 'Signup',
  mixins: [validationMixin],
  data: () => ({
    form: {
      userAccount: null,
      name: null,
      email: null,
      password: null
    }
  }),
  computed: mapState({
    userAccountExists: state => state.Signup.userAccountExists,
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
    getValidationClass (fieldName) {
      const field = this.$v.form[fieldName]
      let fieldValueExists = false

      // Check if field value already exists
      if (fieldName === 'userAccount' || fieldName === 'email') {
        this.$store.dispatch(CHECK_FIELD_VALUE_EXISTS, {
          field: fieldName,
          value: this.form[fieldName]
        })

        fieldValueExists = this[`${fieldName}Exists`]
      }

      if (field) {
        return {
          'md-invalid': (field.$invalid && field.$dirty) || fieldValueExists
        }
      }
    },
    saveUser () {
      this.$store.dispatch(SIGNUP, {
        userAccount: `${this.form.userAccount}`,
        name: `${this.form.name}`,
        email: this.form.email,
        password: this.form.password
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
</script>

<style lang="scss" scoped>
  @charset 'utf-8';

  .md-card {
    margin: 130px auto;
    padding: 10px;
  }

  .md-card-content {
    padding-left: 20px;
    padding-right: 20px;
  }

  .md-progress-bar {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
  }

  #send-button {
    background-color: #237b90;
    color: white
  }

  #signup-label {
    margin-right: 115px;
  }

</style>
