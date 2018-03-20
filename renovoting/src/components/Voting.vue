<template>
    <div class="head">
      <ul class="head">
        <li class="head"><h1>RenoVoting</h1></li>
        <li class="head"><p><a href="http://45.55.223.61:8000">Give us your own Ideas!</a></p></li>
        <li class="head"><p><a href="http://45.55.223.61:8000/#/vote">Vote on our Images!</a></p></li>
      </ul>
    </div>

    <div class="block">
    <form v-on:submit.prevent="addItem">
      <input type="text" v-model="text">
      <button type="submit">Add a Renovation Idea to our list!</button>
    </form>
    <ul>
      <li v-for="item in filteredItems" draggable="true" v-on:dragstart="dragItem(item)" v-on:dragover.prevent v-on:drop="dropItem(item)">
	<label v-bind:class="{ completed: item.completed }">{{ item.text }}</label><button v-on:click="deleteItem(item)" class="delete">X</button>
      </li>
    </ul>
    </div>
  </div>
</template>

<script>
 import axios from 'axios';
 export default {
   name: 'Voting',
   data () {
     return {
       items: [],
       text: '',
       show: 'all',
       drag: {},
     }
   },
   computed: {
     activeItems: function() {
       return this.items.filter(function(item) {
	     return !item.completed;
       });
     },
     filteredItems: function() {
       if (this.show === 'active')
	 return this.items.filter(function(item) {
	   return !item.completed;
	 });
       if (this.show === 'completed')
	 return this.items.filter(function(item) {
	   return item.completed;
	 });
       return this.items;
     },
   },
   created: function() {
     this.getItems();
   },
   methods: {
     getItems: function() {
       axios.get("/api/items").then(response => {
	       this.items = response.data;
	       return true;
       }).catch(err => {
       });
     },
     addItem: function() {
       axios.post("/api/items", {
	 text: this.text,
	 completed: false
       }).then(response => {
	 this.text = "";
	 this.getItems();
	 return true;
       }).catch(err => {
       });
     },
     completeItem: function(item) {
       axios.put("/api/items/" + item.id, {
	 text: item.text,
	 completed: !item.completed,
	 orderChange: false,
       }).then(response => {
	 return true;
       }).catch(err => {
       });
     },
     deleteItem: function(item) {
       axios.delete("/api/items/" + item.id).then(response => {
	 this.getItems();
	 return true;
       }).catch(err => {
       });
     },
     showAll: function() {
       this.show = 'all';
     },
     showActive: function() {
       this.show = 'active';
     },
     showCompleted: function() {
       this.show = 'completed';
     },
     deleteCompleted: function() {
       this.items.forEach(item => {
	 if (item.completed)
	   this.deleteItem(item)
       });
     },
     dragItem: function(item) {
       this.drag = item;
     },
     dropItem: function(item) {
       axios.put("/api/items/" + this.drag.id, {
	 text: this.drag.text,
	 completed: this.drag.completed,
	 orderChange: true,
	 orderTarget: item.id
       }).then(response => {
	 this.getItems();
	 return true;
       }).catch(err => {
       });
     },
   }
 }
</script>

<style scoped>
ul {
     list-style: none;
 }
 div.block li {
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
   /* background-color: #B0ABAB; */
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
