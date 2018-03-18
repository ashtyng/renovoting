<template>
  <div class="img">
    <h1>RenoVoting</h1>
      
    <ul>
        <li v-for="pic in nextQuestion.pics">
	         <img v-bind:src="pic" v-on:click= "vote(pic)"/>
        </li>
    </ul>

    <div v-if= "results">
      <ul>
        <li v-for="vote in nextQuestion.votes"><p>Votes: {{vote}}</p></li>
      </ul>
      <button type="submit" v-on:click="nextQ()">next</button>
    </div>

  </div>
</template>

<script>
 import axios from 'axios';
 export default {
   name: 'Img',
   data () {
     return {
       questions: [],
       results: false,
       current: 0,
     }
   },
   computed: {
    nextQuestion: function() {
      return this.questions[this.current];
    }
   },
   created: function() {
     this.getQs();
   },
   methods: {
     getQs: function() {
     console.log("calling node");
       axios.get("/api/questions").then(response => {
         this.questions = response.data;
         console.log("response="+this.questions);
	       return true;
       }).catch(err => {
       });
     },

     vote: function(pic) {
      var Picindex=-1;
      for(let i=0;i<this.nextQuestion.pics.length;i++) {
        if(this.questions[this.current].pics[i]===pic) {
          Picindex=i;
        }
      }

       axios.put("/api/questions/" + this.current +"/"+ Picindex, {
       }).then(response => {
	       this.getQs();
         this.results=true;
         return true;
       }).catch(err => {
       });
     },

     nextQ: function() {
        this.results=false;
        this.current+=1;
        if(this.current===this.questions.length) {
          this.current=0;
        }
     }
     
   }
 }
</script>

<style scoped>
 ul {
     list-style: none;
 }

 li {
     background: #f3f3f3;
     width: 500px;
     min-height: 30px;
     padding: 10px;
     margin-bottom: 10px;
     font-size: 1em;
     display: flex;
     align-items: center;
 }

 .delete {
     display: none;
     margin-left: auto;
 }

 li:hover .delete {
     display: block;
 }

 label {
     width: 400px;
 }

 .completed {
     text-decoration: line-through;
 }

 /* Form */

 input[type=checkbox] {
     transform: scale(1.5);
     margin-right: 10px;
 }

 input[type=text] {
     font-size: 1em;
 }

 button {
     font-family: 'Arvo';
     font-size: 1em;
 }
 .controls {
     margin-top: 20px;
 }
</style>