<template>
  <div class="chat card mt-3 col-md-10 offset-md-1 mt-4">
    <div class="card-body">
      <div class="card-title">
        <h3>Chat Group</h3>
        Olá {{user}}
        <hr>
      </div>
      <div class="card-body message-chat">
        <div class="messages" v-for="(msg, index) in messages" :key="index">
          <p>
            <span class="date mx-1">{{msg.date}}</span>
            <span class="user font-weight-bold mx-2" v-if="!warning">{{ msg.user }}:</span>
            <span class="message">{{ msg.message }}</span>
          </p>
        </div>
      </div>
    </div>
    <div class="card-footer">
      <form @submit.prevent="sendMessage">
        <div class="input-group">
          <input
            type="text"
            v-model="message"
            class="form-control"
            placeholder="Digite uma mensagem"
          >
          <span class="input-group-btn">
            <button type="submit" class="btn ml-1 btn-success">Send</button>
          </span>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import io from 'socket.io-client';

export default {
  data: () => ({
    warning: false,
    //  user: '',
    message: '',
    messages: [],
    socket: io('localhost:5990'),
  }),
  computed: {
    user() {
      return this.$route.params.user;
    },
  },
  methods: {
    sendMessage(e) {
      e.preventDefault();
      this.socket.emit('SEND_MESSAGE', {
        user: this.user,
        message: this.message,
      });
      this.message = '';
    },
  },
  mounted() {
    this.socket.on('MESSAGE', data => {
      this.warning = false;
      console.log(data);
      this.messages = [...this.messages, data];
      // you can also do this.messages.push(data)
    });
    this.socket.on('msgParaCliente', data => {
      this.warning = true;
      console.log('a', data.user);
      let infoMsg = {
        message: data.user + data.message,
        date: data.date,
      };
      //  console.log(infoMsg);
      //    console.log(infoMsg.date);
      this.messages = [...this.messages, infoMsg];
    });
  },
};
</script>

<style>
.message-chat {
  overflow: auto;
  height: 53vh;
}
</style>

