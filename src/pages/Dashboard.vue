<template>
  <div class='dashboard'>

    <!-- start User Options -->
    <md-menu id="user-options-menu" md-size="auto" md-direction="bottom-end" :md-offset-y=1 :md-active.sync="clickUserOptions">
      <md-button class="md-icon-button md-accent" md-menu-trigger>
        <md-icon>person</md-icon>
      </md-button>

      <md-menu-content>
        <md-menu-item>
          <button class="user-options-item">Configurações</button>
        </md-menu-item>

        <md-menu-item>
          <button class="user-options-item" @click="signout">Sair</button>
        </md-menu-item>
      </md-menu-content>
    </md-menu>
    <!-- end user Options -->

    <!-- start Form Search -->
    <form id="form-search" novalidate class="md-layout">
      <md-content id="search-content" class="md-layout-item md-size-80 md-small-size-100 md-accent">

        <div class="md-layout md-gutter">
          <div class="md-layout-item md-size-70 md-small-size-100">
            <md-field md-inline class="md-layout-item">
              <label>Pesquise...</label>
              <md-input v-model="search"></md-input>
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
                v-model="date"
                label="Por data"
                prepend-icon="event"
              ></v-text-field>
              <v-date-picker locale="pt-br" header-color="grey darken-4" v-model="date" :landscape=true>
                <v-spacer></v-spacer>
                <v-btn flat color="primary" @click="menu = false">Cancelar</v-btn>
                <v-btn flat color="primary" @click="$refs.menu.save(date)">OK</v-btn>
              </v-date-picker>

            </v-menu>
          </div>

          <div class="md-layout-item md-size-10 md-small-size-100">
            <vue-clip :on-drag-enter="complete" :options="options">
              <template slot="clip-uploader-action">
                <div>
                  <div class="dz-message">
                    <md-button type="file" id="novo-arquivo" class="md-icon-button md-raised">
                      <md-icon>add</md-icon>
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
            <img :src="userFile.downloadUrl">
          </md-card-media>

          <md-card-area>
            <md-card-header>
              <span class="md-title">{{ userFile.name }}</span>
              <span class="md-subhead">{{ userFile.type }}</span>
            </md-card-header>

            <md-card-actions>
              <md-button class="md-icon-button" :href="userFile.downloadUrl" target="_blank">
                <md-icon>cloud_download</md-icon>
              </md-button>
            </md-card-actions>
          </md-card-area>
        </md-card-media-cover>
      </md-card>
    </div>

    <md-empty-state id="empty-state" v-if="!hasFiles"
      md-rounded
      md-icon="access_time"
      md-label="Nenhum arquivo ainda"
      md-description="Seja o primeiro a inserir um arquivo, é fácil!"
      :md-size=350
    >
    </md-empty-state>
    <!-- end Files Content -->

  </div>
</template>

<script>
import { mapState } from 'vuex'
import { db, storageRef } from '../../api/firebase'
import { FETCH_FILES, SIGNOUT } from '@/store/constants'

export default {
  name: 'Dashboard',
  data: () => ({
    search: null,
    date: null,
    menu: false,
    clickUserOptions: false,
    options: {
      url: (file) => {
        file = file[0]

        const blobFile = new Blob(
          [file],
          { type: file.type }
        )

        // Create a file document reference to use in upload and store metadata
        const fileDoc = db.collection('files').doc()
        const uploadTask = storageRef.child(`files/${fileDoc.id}`).put(blobFile)

        uploadTask.on('state_changed', function (snapshot) {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          console.log('Upload is ' + progress + '% done')
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused')
              break
            case 'running':
              console.log('Upload is running')
              break
          }
        }, function (error) {
          console.error(error)
        }, function () {
          // Handle successful uploads on complete
          uploadTask.snapshot.ref.getMetadata().then(function (snapshot) {
            fileDoc.set({
              name: file.name,
              type: snapshot.contentType,
              downloadUrl: snapshot.downloadURLs[0],
              size: snapshot.size,
              postedIn: snapshot.timeCreated
            })
          })
        })
      }
    }
  }),
  computed: mapState({
    userFiles: state => state.Dashboard.userFiles,
    hasFiles: state => state.Dashboard.userFiles.length !== 0
  }),
  created () {
    this.$store.dispatch(FETCH_FILES)
  },
  methods: {
    complete (file) {},
    signout () {
      this.$store.dispatch(SIGNOUT)
    }
  }
}
</script>

<style lang="scss" scoped>
  @charset 'utf-8';

  #form-search {
    width: 100%;
  }

  #search-content {
    margin: auto;
    padding: 0px 20px 0px 20px;
  }

  #empty-state {
    margin-top: 5%
  }

  #files-content {
    width: 80%;
    margin: 3% auto
  }

  #date-field {
    margin-top: 4px;
  }

  #novo-arquivo {
    margin-top: 18px;
    background-color: #237b90;
  }

  #user-options-menu {
    float: right;
    margin-right: 1%;
  }

  .user-options-item {
    margin: auto
  }

  .card-file {
    width: 320px;
    margin: 4px;
    display: inline-block;
    vertical-align: top;
  }

</style>
