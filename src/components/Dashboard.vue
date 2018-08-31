<template>
  <div class='dashboard'>

    <form novalidate class="md-layout">
      <md-content id="search-content" class="md-layout-item md-size-80 md-small-size-100 md-accent">

        <div class="md-layout md-gutter">
          <div class="md-layout-item md-size-80 md-small-size-100">
            <md-field md-inline class="md-layout-item">
              <label>Pesquise...</label>
              <md-input v-model="search"></md-input>
            </md-field>
          </div>

          <div class="md-layout-item md-size-21 md-small-size-100">
            <md-datepicker md-immediately v-model="selectedDate">
              <label>Por data</label>
            </md-datepicker>
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
export default {
  name: 'Dashboard',
  data: () => ({
    search: null,
    selectedDate: null
  })
}
</script>

<style lang="scss" scoped>
  @charset 'utf-8';

  #search-content {
    margin: 20px auto;
    padding: 0px 20px 0px 20px;
  }

  .empty-state {
    margin-top: 3%
  }

</style>
