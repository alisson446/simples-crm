<template>
  <div class='signup'>

    <form novalidate class="md-layout" @submit.prevent="validateUser">
      <md-card class="md-layout-item md-size-35 md-small-size-100 md-accent">
        <md-card-header>
          <div class="md-title">Cadastre-se</div>
        </md-card-header>

        <md-card-content>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-size-50 md-small-size-100">
              <md-field :class="$v.form.userAccount.required ? userAccountClass : getValidationClass('userAccount')">
                <label for="userAccount">Usuário</label>
                <md-input :onkeypress="checkFieldValueExists('userAccount')" name="userAccount" id="userAccount" autocomplete="given-name" v-model="form.userAccount" :disabled="sending" />
                <span class="md-error" v-if="!$v.form.userAccount.required">O nome de usuário é obrigatório</span>
                <span class="md-error" v-else-if="userAccountInvalided">Não pode conter caracteres inválidos</span>
                <span class="md-error" v-else-if="userAccountExists">Nome de usuário já existente</span>
              </md-field>
            </div>

            <div class="md-layout-item md-size-50 md-small-size-100">
              <md-field :class="getValidationClass('name')">
                <label for="name">Nome</label>
                <md-input name="name" id="name" autocomplete="family-name" v-model="form.name" :disabled="sending" />
                <span class="md-error" v-if="!$v.form.name.required">O nome é obrigatório</span>
                <span class="md-error" v-else-if="!$v.form.name.minlength">Nome deve conter pelo menos 3 dígitos</span>
              </md-field>
            </div>
          </div>

          <md-field :class="getValidationClass('company')">
            <label for="company">Empresa</label>
            <md-input type="company" name="company" id="company" autocomplete="company" v-model="form.company" :disabled="sending" />
            <span class="md-error" v-if="!$v.form.company.required">O nome da empresa é obrigatório</span>
          </md-field>

          <md-field :class="$v.form.email.required ? emailClass : getValidationClass('email')">
            <label for="email">Email</label>
            <md-input type="email" :onkeypress="checkFieldValueExists('email')" name="email" id="email" autocomplete="email" v-model="form.email" :disabled="sending" />
            <span class="md-error" v-if="!$v.form.email.required">O email é obrigatório</span>
            <span class="md-error" v-else-if="!$v.form.email.email">Formato de email inválido</span>
            <span class="md-error" v-else-if="emailExists">Email já existente</span>
          </md-field>

          <md-field :class="getValidationClass('password')">
            <label for="password">Senha</label>
            <md-input type="password" name="password" id="password" autocomplete="password" v-model="form.password" :disabled="sending" />
            <span class="md-error" v-if="!$v.form.password.required">A senha é obrigatória</span>
            <span class="md-error" v-else-if="!$v.form.password.minLength">A senha deve conter pelo menos 6 dígitos</span>
          </md-field>
        </md-card-content>

        <md-progress-bar md-mode="indeterminate" v-if="sending" />

        <md-card-actions>
          <router-link to="/" id="backward-button">
            <md-button class="md-icon-button">
              <md-icon>keyboard_backspace</md-icon>
              <md-tooltip md-direction="top">Voltar</md-tooltip>
            </md-button>
          </router-link>

          <md-button type="submit" id="send-button" class="md-raised" :disabled="sending || checkingField">Cadastrar</md-button>
        </md-card-actions>
      </md-card>

      <md-snackbar :md-active.sync="userSaved">O usuário {{ userAccount }} foi criado com sucesso!</md-snackbar>
    </form>

  </div>
</template>

<script src="./Signup.js"></script>
<style lang="scss" scoped src="./Signup.css"></style>
