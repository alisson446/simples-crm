<template>
  <div class='signin'>

    <form novalidate class="md-layout" @submit.prevent="validateUser">
      <md-card class="md-layout-item md-size-35 md-small-size-100 md-accent">
        <md-card-header>
          <div class="md-title">Login</div>
        </md-card-header>

        <md-card-content>
          <md-field :class="getValidationClass('userOrEmail')">
            <label for="userOrEmail">Usuário ou Email</label>
            <md-input name="userOrEmail" id="userOrEmail" autocomplete="given-name" v-model="form.userOrEmail" :disabled="checking" />
            <span class="md-error" v-if="!$v.form.userOrEmail.required">O usuário ou email é obrigatório</span>
          </md-field>

          <md-field :class="getValidationClass('password')">
            <label for="password">Senha</label>
            <md-input type="password" name="password" id="password" autocomplete="password" v-model="form.password" :disabled="checking" />
            <span class="md-error" v-if="!$v.form.password.required">A senha é obrigatória</span>
          </md-field>
        </md-card-content>

        <md-progress-bar md-mode="indeterminate" v-if="checking" />

        <md-card-actions>
          <div id="signup-label">Não possui uma conta?
            <router-link to="/signup">Cadastre-se</router-link>
          </div>
          <md-button type="submit" id="send-button" class="md-raised" :disabled="checking">Entrar</md-button>
        </md-card-actions>
      </md-card>

      <md-snackbar id="loginError" :md-active.sync="loginError">Usuário ou senha inválidos!</md-snackbar>
    </form>

  </div>
</template>

<script>
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

  #loginError {
    background-color: #D32F2F;
  }

</style>
