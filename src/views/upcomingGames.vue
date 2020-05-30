<template>
<div class="upcomingGames">
    <div id="con" class="container">
        <div class="card">
            <div class="card-header">
                <h3>Предстоящие матчи</h3>
            </div>
            <div class="card-body">
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <td><b>Соперник</b></td>
                            <td><b>Соревнование</b></td>
                            <td><b>Тип матча</b></td>
                            <td><b>Дата</b></td>
                            <td></td>
                            <td></td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="game in games">
                            <td>{{game.rival}}</td>
                            <td>{{game.competition}}</td>
                            <td>{{game.type}}</td>
                            <td>{{game.date}}</td>
                            <td>
                                <router-link :to="{path: '/editGame/' + game.id}"><i class="fas fa-edit"></i></router-link>
                            </td>
                            <td>
                                <router-link :to="{path: '/upcomingGame/' + game.id}"><i class="fa fa-info-circle"></i></router-link>
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

let gamesRef = db.ref('events/upcomingGames')

export default {
    name: 'upcomingGames',
    firebase: {
        games: gamesRef,
    },
    data() {
        return {

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
