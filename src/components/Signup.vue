<template>
  <div class='signup'>

    <form novalidate class="md-layout" @submit.prevent="validateUser">
      <md-card class="md-layout-item md-size-40 md-small-size-100 md-accent">
        <md-card-header>
          <div class="md-title">Cadastre-se</div>
        </md-card-header>

        <md-card-content>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('firstName')">
                <label for="first-name">Nome</label>
                <md-input name="first-name" id="first-name" autocomplete="given-name" v-model="form.firstName" :disabled="sending" />
                <span class="md-error" v-if="!$v.form.firstName.required">O nome é obrigatório</span>
                <span class="md-error" v-else-if="!$v.form.firstName.minlength">Nome inválido</span>
              </md-field>
            </div>

            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('lastName')">
                <label for="last-name">Sobrenome</label>
                <md-input name="last-name" id="last-name" autocomplete="family-name" v-model="form.lastName" :disabled="sending" />
                <span class="md-error" v-if="!$v.form.lastName.required">O sobrenome é obrigatório</span>
                <span class="md-error" v-else-if="!$v.form.lastName.minlength">Sobrenome inválido</span>
              </md-field>
            </div>
          </div>

          <md-field :class="getValidationClass('email')">
            <label for="email">Email</label>
            <md-input type="email" name="email" id="email" autocomplete="email" v-model="form.email" :disabled="sending" />
            <span class="md-error" v-if="!$v.form.email.required">O email é obrigatório</span>
            <span class="md-error" v-else-if="!$v.form.email.email">Email inválido</span>
          </md-field>

          <md-field :class="getValidationClass('password')">
            <label for="password">Senha</label>
            <md-input type="password" name="password" id="password" autocomplete="password" v-model="form.password" :disabled="sending" />
            <span class="md-error" v-if="!$v.form.password.required">A senha é obrigatório</span>
            <span class="md-error" v-else-if="!$v.form.password.password">Senha inválida</span>
          </md-field>
        </md-card-content>

        <md-progress-bar md-mode="indeterminate" v-if="sending" />

        <md-card-actions>
          <md-button type="submit" id="send-button" class="md-raised" :disabled="sending">Cadastrar</md-button>
        </md-card-actions>
      </md-card>

      <md-snackbar :md-active.sync="userSaved">O usuário {{ fullName }} foi criado com sucesso!</md-snackbar>
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

import { SIGNUP } from '@/store/actions'

export default {
  name: 'Signup',
  mixins: [validationMixin],
  data: () => ({
    form: {
      firstName: null,
      lastName: null,
      email: null,
      password: null
    }
  }),
  computed: mapState({
    fullName: state => state.Signup.userName,
    userSaved: state => state.Signup.userSaved,
    sending: state => state.Signup.sending
  }),
  validations: {
    form: {
      firstName: {
        required,
        minLength: minLength(3)
      },
      lastName: {
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

      if (field) {
        return {
          'md-invalid': field.$invalid && field.$dirty
        }
      }
    },
    saveUser () {
      this.$store.dispatch(SIGNUP, {
        fullName: `${this.form.firstName} ${this.form.lastName}`,
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
    margin: 100px auto;
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

</style>
