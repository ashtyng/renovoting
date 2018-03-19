<template>
  <div class="img">
  <a href="http://45.55.223.61:8000">Give us your own Ideas!</a>
    <h1>RenoVoting</h1>
      
    <ul>
        <li v-for="pic in nextQuestion.pics">
	         <img v-bind:src="pic" v-on:click= "vote(pic)"/>

        </li>
    </ul>

    <div v-if= "results">
      <ul>
        <li class="votes" v-for="vote in nextQuestion.votes">Votes: {{vote}}</li>
      </ul>
      <button type="submit" v-on:click="nextQ()">next</button>
    </div>
    <footer><a href="https://github.com/ashtyng/renovoting.git">Git Repo</a></footer>
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
      if(this.results===true) {
        return;
      }

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
     padding: 10px;
     margin-bottom: 10px;
     font-size: 1em;
     display: inline;
     align-items: center;
 }
 img {
  height: 400px;
 }

 li.votes {
     padding: 120px;
 }
</style>