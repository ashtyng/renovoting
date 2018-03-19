<template>
  <div class="todo">
    <a href="http://45.55.223.61:8000/#/vote">Vote on Image Ideas!</a>
    <h1>RenoVoting</h1>
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