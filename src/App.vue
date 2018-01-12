<template>
  <div id="app">
		<transition name="fade"  >
			 <router-view/>
	    </transition>
  
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
/*@import 'assets/theme/theme-darkblue/index.css';*/
@import 'assets/reset.css';

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.fade-enter-active,
.fade-leave-active {
	transition: all .2s ease;
}

.fade-enter,
.fade-leave-active {
	opacity: 0;
}
</style>
