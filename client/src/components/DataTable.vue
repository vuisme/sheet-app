<template>
  <v-data-table :headers="headers" :items="items" class="elevation-1">
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Google Sheets Data</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">New Item</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">New Item</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4" v-for="field in fields" :key="field">
                    <v-text-field v-model="newItem[field]" :label="field"></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="dialog = false">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="addItem">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
  </v-data-table>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      headers: [
        { text: 'ID', value: 'id' },
        { text: 'Name', value: 'name' },
        { text: 'Email', value: 'email' }
      ],
      items: [],
      dialog: false,
      newItem: {
        id: '',
        name: '',
        email: ''
      },
      fields: ['id', 'name', 'email']
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      axios.get(`${process.env.VUE_APP_API_URL}/data`).then(response => {
        this.items = response.data
      }).catch(error => {
        console.error(error)
      })
    },
    addItem () {
      axios.post(`${process.env.VUE_APP_API_URL}/data`, this.newItem).then(response => {
        this.items.push(response.data)
        this.dialog = false
        this.newItem = { id: '', name: '', email: '' }
      }).catch(error => {
        console.error(error)
      })
    }
  }
}
</script>

<style scoped>
</style>
