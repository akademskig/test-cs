<template>
  <div class="q-pa-xl">
   <q-input type="textarea" v-model ="inputText" ></q-input>
   <q-btn @click="onSubmit">Send</q-btn>
   <div v-if="hasError" class="text-red ">{{errorValue}}</div>
   <q-chat-message v-model ="inputText"></q-chat-message>
  </div>
</template>

<script>
import { isContentForbidden } from './filterutils'
export default {
  name: 'PageIndex',
  data () {
    return { inputText: 'Do you like cumnsee.com?  ', hasError: false, errorValue: '' }
  },
  methods: {
    onSubmit () {
      this.filterBlacklisted(this.inputText)
    },

    filterBlacklisted (value) {
      const res = isContentForbidden(value)
      if (res !== 'allowed') {
        this.hasError = true
        this.errorValue = res
        setTimeout(() => {
          this.hasError = false
        }, 2000)
      } else {
        this.hasError = false
      }
    }
  }
}
</script>
