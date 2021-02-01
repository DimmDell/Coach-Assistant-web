<template>
<div class="upcomingGame">
    <div id="con" class="container">

        <div class="card">
            <div class="card-header">
                <h3>Состав на матч
                </h3>

            </div>
            <div class="card-body">
                <h5 style="text-align: left">Основной состав</h5>
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <td><b>Игрок</b></td>
                            <td><b>Голы</b></td>
                            <td><b>Ассисты</b></td>
                        </tr>
                    </thead>

                    <tbody>
                        <tr v-for="player in igame.starting" :key="player.id">
                            <td>
                                <router-link :to="{ path: '/player/' + player.ID }">{{
                    player.name + " " + player.surname
                  }}</router-link>
                            </td>
                            <td>
                                {{
                    arr.find(item => item.id == player.id).goals
                  }}
                            </td>
                            <td>
                                {{
                    arr.find(item => item.id == player.id).assists
                  }}
                            </td>

                        </tr>
                    </tbody>
                </table>
                <h5 style="text-align: left">Резерв</h5>
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <td><b>Игрок</b></td>
                            <td><b>Голы</b></td>
                            <td><b>Ассисты</b></td>
                        </tr>
                    </thead>

                    <tbody>
                        <tr v-for="player in igame.substitutions" :key="player.id">
                            <td>
                                <router-link :to="{ path: '/player/' + player.ID }">{{
                    player.name + " " + player.surname
                  }}</router-link>
                            </td>
                            <td>
                                {{
                    arr.find(item => item.id == player.id).goals
                  }}
                            </td>
                            <td>
                                {{
                    arr.find(item => item.id == player.id).assists
                  }}
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
let playersRef = db.ref('players')
let gamesRef = db.ref('events/upcomingGames')

export default {
    name: 'upcomingGame',
    firebase: {
        players: playersRef,
    },
    data() {
        return {
            players: [],
            id: '',
            igame: '',
            arr: []
        }
    },
    created() {
        this.id = window.location.href.split("/").pop();

        db.ref("events/upcomingGames/" + this.id).once("value", snapshot => {
            this.igame = snapshot.val();

            db.ref("players").once("value", snapshot => {
                var playersObj = snapshot.val();
                var a = []
                snapshot.forEach(function (ss) {
                    a.push(ss.val());
                });

                this.arr = a;

                this.igame.starting.forEach(function (g) {
                    var p = this.arr.find(item => item.id === g.id);
                    g.name = p.name + " " + p.surname;
                });

                this.igame.substitutions.forEach(function (g) {
                    var p = this.arr.find(item => item.id === g.id);
                    g.name = p.name + " " + p.surname;
                });
            });
        });

        db.ref("teamName").once("value", snapshot => {
            this.ourTeam = snapshot.val();

        });
    }
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
