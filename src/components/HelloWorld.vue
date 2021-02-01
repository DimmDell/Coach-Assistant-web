<template>
<div class="hello">
    <div class="headers">
        <h1> Здравствуйте! </h1>
        <h2> Вы можете начать работу, выбрав пункт из навигационного меню слева</h2>
        <h3>Также вы можете перейти к одному из разделов, нажав на кнопку ниже</h3>
    </div>

    <div class="buttons">
        <router-link to="/players" tag="button" class="btn btn-outline-dark">Игроки</router-link>
        <router-link to="/games" tag="button" class="btn btn-outline-dark">Сыгранные матчи</router-link>
        <router-link to="/trainings" tag="button" class="btn btn-outline-dark">Тренировки</router-link>
        <router-link to="/upcomingGames" tag="button" class="btn btn-outline-dark">Предстоящие матчи</router-link>
    </div>

    <div class="coach-pic">
        <img src="../assets/coach.png">
    </div>
</div>
</template>

<script>
export default {
    name: 'HelloWorld',
    data() {
        return {
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

img {
    width: 30%;
    height: 30%;
}

.coach-pic {
    margin-top: 3%;
}

.headers {
    margin-right: 7%;
    margin-left: 7%;
}

.buttons {
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-right: 10%;
    margin-left: 10%;

}
</style>
