<template>
<div class="games">
    <div id="con" class="container">
        <div class="card">
            <div class="card-header">
                <h3>Сыгранные матчи</h3>
            </div>
            <div class="card-body">
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <td><b>Соперник</b></td>
                            <td><b>Соревнование</b></td>
                            <td><b>Тип матча</b></td>
                            <td><b>Дата</b></td>
                            <td><b>Счет</b></td>
                            <td><b></b></td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="game in games">
                            <td>{{game.rival}}</td>
                            <td>{{game.competition}}</td>
                            <td>{{game.type}}</td>
                            <td>{{game.date}}</td>
                            <td v-if="game.type == 'Выездной'">{{game.conceded + " : " + game.scored}}</td>
                            <td v-if="game.type == 'Домашний'">{{game.scored + " : " + game.conceded}}</td>
                            <td>
                                <router-link :to="{path: '/game/' + game.id}"><i class="fa fa-info-circle"></i></router-link>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>
</template>

<script>
/* eslint-disable */
import db from '@/firebase.js'

let gamesRef = db.ref('events/completeGames')

export default {
    name: 'Games',
    firebase: {
        games: gamesRef,
    },
    data() {
        return {
            games: []
        }
    },
    methods: {}
}
</script>

<style>
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
