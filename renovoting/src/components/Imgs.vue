<template>
  <div class="img">
    <div class="head">
      <ul class="head">
        <li class="head"><h1>RenoVoting</h1></li>
        <li class="head"><p><a href="http://45.55.223.61:8000">Give us your own Ideas!</a></p></li>
        <li class="head"><p><a href="http://45.55.223.61:8000/#/vote">Vote on our Images!</a></p></li>
      </ul>
    </div>
    
    <div class="block">
    
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
 div.block {
   /* position: relative; */
   /* position: absolute; */
   padding: 20px;
   padding-top: 150px;
   background-color: #F2F0F0;
 }

  div.block button {
    -webkit-transition-duration: 0.4s; /* Safari */
    transition-duration: 0.4s;
    border-radius: 50%;
    background-color: #B0ABAB;
    border: none;
    padding: 15px 15px;
}

 div.block button:hover {
    /* background-color: #333; */
    background-color: #646161;
    color: white;
  }


 /* div.block button {
   border-radius: 30%;
   background-color: white;
   color: black;
   border: 2px solid #333;
 } */

 div.head {
   /* background-color: blue; */
   /* padding-bottom: 20px; */
   height: 150px;
   position: absolute;
   top: 0px;
   left:0px;
   right:0px;
 }
div.head ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
    background-color: #646161;
}

div.head li {
    float: left;
}

 div.head li a {
    display: block;
    color: white;
    text-align: center;
    text-align: justify;
    padding: 14px 16px;
    text-decoration: none;
}

/* Change the link color to #111 (black) on hover */
div.head li a:hover {
    background-color: #111;
}

footer a {
  display: block;
  color: black;
  text-align: center;
  text-align: justify;
  padding: 14px 16px;
  text-decoration:none;
}
</style>
