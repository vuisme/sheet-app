<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>Google Sheets Data</v-card-title>
          <v-card-text>
            <data-table></data-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import DataTable from '@/components/DataTable.vue'

export default {
  name: 'Home',
  components: {
    DataTable
  }
}
</script>

<style scoped>
</style>
