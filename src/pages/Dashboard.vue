<template>
  <div class='dashboard'>

    <form novalidate class="md-layout">
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
              <v-date-picker locale="pt-br" header-color="grey darken-4" v-model="date" landscape="true">
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

      <md-empty-state class="empty-state"
        md-rounded
        md-icon="access_time"
        md-label="Nenhum arquivo ainda"
        md-description="Seja o primeiro a inserir um arquivo, é fácil!"
        :md-size=350
      >
      </md-empty-state>
    </form>

  </div>
</template>

<script>
import { db, storageRef } from '../../api/firebase'

export default {
  name: 'Dashboard',
  data: () => ({
    search: null,
    date: null,
    menu: false,
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
  methods: {
    complete (file) {}
  }
}
</script>

<style lang="scss" scoped>
  @charset 'utf-8';

  #search-content {
    margin: 20px auto;
    padding: 0px 20px 0px 20px;
  }

  .empty-state {
    margin-top: 5%
  }

  #date-field {
    margin-top: 4px;
  }

  #novo-arquivo {
    margin-top: 18px;
    background-color: #237b90;
  }

</style>
