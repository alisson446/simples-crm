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
          <router-link to="/signup" id="signup-link">
            Sem conta? Cadastra-se
          </router-link>

          <md-button type="submit" id="send-button" class="md-raised" :disabled="checking">Entrar</md-button>
        </md-card-actions>
      </md-card>

      <md-snackbar id="loginError" :md-active.sync="loginError">Usuário ou senha inválidos!</md-snackbar>
    </form>

  </div>
</template>

<script src="./Signin.js"></script>
<style lang="scss" scoped src="./Signin.css"></style>
