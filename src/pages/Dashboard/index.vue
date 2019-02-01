<template>
  <div class='dashboard'>

    <!-- start User Options -->
    <md-menu id="user-options-menu" md-size="auto" md-direction="bottom-end" :md-offset-y=1 :md-active.sync="clickUserOptions">
      <md-button class="md-icon-button md-accent" md-menu-trigger>
        <md-icon>person</md-icon>
      </md-button>

      <md-menu-content>
        <md-menu-item>
          <button class="user-options-item" @click="signout">Sair</button>
        </md-menu-item>
      </md-menu-content>
    </md-menu>
    <!-- end user Options -->

    <!-- start Form Search -->
    <form id="form-search" novalidate class="md-layout" @submit.prevent="() => false">
      <md-content id="search-content" class="md-layout-item md-size-80 md-small-size-100 md-accent">

        <div class="md-layout md-gutter">
          <div class="md-layout-item md-size-70 md-small-size-100">
            <md-field md-inline class="md-layout-item">
              <label>Nome do Arquivo</label>
              <md-input v-model="searchName"></md-input>
            </md-field>
          </div>

          <div data-app="true" class="md-layout-item md-size-20 md-small-size-100">
            <v-menu
              id="date-field"
              ref="menu"
              :close-on-content-click="false"
              v-model="menu"
              :nudge-right="40"
              :return-value.sync="date"
              lazy
              transition="scale-transition"
              offset-y
              full-width
              min-width="290px"
            >
              <v-text-field
                slot="activator"
                v-model="dateFormatted"
                label="Data"
                prepend-icon="event"
                @blur="date = parseDate(dateFormatted)"
              >
              </v-text-field>

              <v-date-picker locale="pt-br" header-color="grey darken-4" v-model="date" @input="!menu" :landscape=true>
                <v-spacer></v-spacer>
                <v-btn flat color="primary" @click="menu = false">Cancelar</v-btn>
                <v-btn flat color="primary" @click="$refs.menu.save(date)">OK</v-btn>
              </v-date-picker>
            </v-menu>
          </div>

          <div class="md-layout-item md-size-10 md-small-size-100">
            <vue-clip :options="options" :on-added-file="addedFile">
              <template slot="clip-uploader-action">
                <div>
                  <div class="dz-message">
                    <md-button type="file" id="new-file" class="md-icon-button md-raised">
                      <md-icon>add</md-icon>
                      <md-tooltip md-direction="top">Novo Arquivo</md-tooltip>
                    </md-button>
                  </div>
                </div>
              </template>
            </vue-clip>
          </div>
        </div>

      </md-content>
    </form>
    <!-- end Form Search -->

    <!-- start Files Content -->
    <div id="files-content" v-if="hasFiles">
      <md-card class="card-file" v-for="userFile in userFiles" :key="userFile.id">
        <md-card-media-cover md-solid>
          <md-card-media md-ratio="1:1">
            <img :src="userFile.downloadUrl"/>
          </md-card-media>

          <md-card-area>
            <md-card-header>
              <span class="md-title">{{ userFile.name }}</span>
              <span class="md-subhead">{{ userFile.type }}</span>
            </md-card-header>

            <md-card-actions>
              <md-button class="md-icon-button" :href="userFile.downloadUrl" target="_blank">
                <md-icon>cloud_download</md-icon>
                <md-tooltip md-direction="top">Baixar</md-tooltip>
              </md-button>

              <md-button class="md-icon-button" @click="openShareDialog(userFile.id)">
                <md-icon>share</md-icon>
                <md-tooltip md-direction="top">Compartilhar</md-tooltip>
              </md-button>

              <md-button class="md-icon-button" @click="openDeleteDialog(userFile.id)">
                <md-icon>delete</md-icon>
                <md-tooltip md-direction="top">Remover</md-tooltip>
              </md-button>
            </md-card-actions>
          </md-card-area>
        </md-card-media-cover>
      </md-card>
    </div>

    <md-progress-spinner v-if="loadingFiles" class="md-accent" md-mode="indeterminate" :md-diameter="100"></md-progress-spinner>

    <md-empty-state id="empty-state" v-if="!hasFiles && !loadingFiles"
      md-rounded
      md-icon="access_time"
      md-label="Nenhum arquivo ainda"
      md-description="Seja o primeiro a inserir um arquivo, é fácil!"
      :md-size=350
    >
    </md-empty-state>
    <!-- end Files Content -->

    <!-- start Sharing with users dialog -->
    <md-dialog :md-active.sync="showShareDialog" class="md-layout-item md-size-30">
      <md-dialog-title>Compartilhar com...</md-dialog-title>

      <md-dialog-content>
        <md-field md-inline class="md-layout-item">
          <label>Email</label>
          <md-input v-model="file.emailToShare"></md-input>
        </md-field>
      </md-dialog-content>

      <md-dialog-actions>
        <md-button class="md-primary" @click="closeShareDialog">Cancelar</md-button>
        <md-button class="md-primary" @click="shareFile(file.toShare, file.emailToShare)">Compartilhar</md-button>
      </md-dialog-actions>
    </md-dialog>

    <md-snackbar :md-active.sync="sharedWithSuccess" :md-duration="100">Compartilhado com sucesso</md-snackbar>
    <!-- end Sharing with users dialog -->

    <!-- start Deleting file dialog -->
    <md-dialog :md-active.sync="showDeleteDialog" class="md-layout-item md-size-20">
      <md-dialog-title>Tem certeza?</md-dialog-title>

      <md-dialog-actions>
        <md-button class="md-primary" @click="showDeleteDialog = false">Cancelar</md-button>
        <md-button class="md-primary" @click="deleteFile(file.toDelete)">Deletar</md-button>
      </md-dialog-actions>
    </md-dialog>

    <md-snackbar :md-active.sync="deletedWithSuccess" :md-duration="100">Deletado com sucesso</md-snackbar>
    <!-- end Deleting file dialog -->
  </div>
</template>

<script>
</script>

<script src="./Dashboard.js"></script>
<style lang="scss" scoped src="./Dashboard.css"></style>
