import { mapState } from 'vuex';
<template>
  <v-layout>
    <v-flex>
      <v-card>
        <v-card-text>
          <h3>Bienvenido {{ usuario.nombre }}</h3>
        </v-card-text>

        <v-card-text style="height: 60vh; overflow: auto" v-chat-scroll>
          <div :class="item.uid === usuario.uid ? 'text-xs-right' : 'text-xs-left'"
               v-for="(item, index) in mensajes" :key="index">
            <v-chip>
              <v-avatar>
                <img :src="item.foto" :alt="usuario.nombre">
              </v-avatar>
              {{ item.mensaje }}
            </v-chip>
            <p class="caption mr-3">{{ item.fecha }}</p>
          </div>
        </v-card-text>

        <v-card-text>
          <v-form @submit.prevent="enviarMensaje" v-model="valido">
            <v-text-field 
                v-model="mensaje" 
                label="Escribe tu mensaje aqui"
                required
                :rules="reglas">
            </v-text-field>
          </v-form>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapState } from 'vuex';
import { db } from '@/firebase';
import moment from 'moment';

  export default {
    data() {
      return {
        mensaje: '',
        valido: false,
        reglas: [
          v => !!v || 'Tienes que escribir un mensaje'
        ],
        mensajes: []
      }
    },
    computed: {
      ...mapState(['usuario'])
    },
    methods: {
      enviarMensaje() {
        if(this.valido) {

          db.collection('chats').add({
            mensaje: this.mensaje,
            nombre: this.usuario.nombre,
            foto: this.usuario.foto,
            uid: this.usuario.uid,
            fecha: Date.now()
          }).catch(error => {
            console.error(error);
          })

          this.mensaje = '';
        } else {
          console.log('No escribiste nada');
        }
      }
    },
    created() {

      moment.locale('es');

      let ref = db.collection('chats').orderBy('fecha', 'desc').limit(10);

      ref.onSnapshot(querySnapshot => {
        this.mensajes = [];

        querySnapshot.forEach(doc => {
          this.mensajes.unshift({
            mensaje: doc.data().mensaje,
            foto: doc.data().foto,
            nombre: doc.data().nombre,
            uid: doc.data().uid,
            fecha: moment(doc.data().fecha).format('lll')
          });
        });
      });
    }
  }

</script>
