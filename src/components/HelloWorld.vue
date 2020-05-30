<template>
<div class="hello">

    <h1> Здравствуйте! </h1>

    <h2> Вы можете начать работу, выбрав пункт из навигационного меню слева </h2>
    <router-link to="/players" tag="button">Игроки</router-link>
    <router-link to="/games" tag="button">Игры</router-link>

</div>
</template>

<script>
export default {
    name: 'HelloWorld',
    data() {
        return {
            msg: 'Здравствуйте!'
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
h1,
h2 {
    font-weight: normal;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    display: inline-block;
    margin: 0 10px;
}

a {
    color: #42b983;
}
</style>
