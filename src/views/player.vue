<template>
<div class="player">
    <div id="con" class="container">
        <div class="card ">
            <div class="card-header">
                <h3>{{ iplayer.name + " " + iplayer.surname }}</h3>
                <h4>{{ iplayer.position }}</h4>
                <h4>
                    <div class="badge badge-secondary">
                        {{"Игры: " +
              iplayer.games +
              " | " +
              "Голы: " +
              iplayer.goals +
              " | " +
              "Ассисты: " +
              iplayer.assists
              }}
                    </div>
                    <br>
                    <div class="badge badge-secondary">
                        {{
              "Рост: " +
              iplayer.height +
              " | " +
              "Вес: " +
              iplayer.weight
              }}
                    </div>
                </h4>
                <button class="btn btn-outline-dark">
                    <a :href="'mailto: ' +iplayer.email">
                        <i class="fas fa-envelope"></i>
                    </a>
                </button>

            </div>

            <div class="card-body">
                <table class="table table-striped">
                    <thead v-if="filtered.length > 0">
                        <tr>
                            <td>
                                <b>Соперник</b>
                            </td>
                            <td>
                                <b>Дата</b>
                            </td>
                            <td>
                                <b>Счет</b>
                            </td>
                            <td>
                                <b>Минут на поле</b>
                            </td>
                            <td>
                                <b>Голы</b>
                            </td>
                            <td>
                                <b>Ассисты</b>
                            </td>
                        </tr>
                    </thead>
                    <thead v-else>
                        <h2>Матчей не найдено</h2>
                    </thead>
                    <tbody>
                        <tr v-for="game in filtered" :key="game.id">
                            <td>{{ game.rival }}</td>
                            <td>{{ game.date.replace(/-/g,".") }}</td>
                            <td v-if="game.type === 'Домашний'">{{game.scored + " : " + game.conceded}}</td>
                            <td v-else>{{game.conceded + " : " + game.scored}}</td>
                            <td>{{ game.starting.find(item => item.id === id).minutes }}</td>
                            <td>{{ game.ourGoals.filter(goal => goal.scoarer === id).length }}</td>
                            <td>{{ game.ourGoals.filter(goal => goal.assistant === id).length }}</td>
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

import db from "@/firebase.js";

let playerRef = db.ref("players");

export default {
    name: "Player",
    firebase: {
        players: playerRef
    },
    data() {
        return {
            players: [],
            iplayer: "",
            playerGames: [],
            filtered: [],
            id: ""
        };
    },
    created() {
        this.id = window.location.href.split("/").pop();

        db.ref("players/" + this.id).once("value", snapshot => {
            this.iplayer = snapshot.val();
        });

        db.ref("events/completeGames").once("value", snapshot => {
            var arr = [];
            snapshot.forEach(function (ss) {
                arr.push(ss.val());
            });

            this.playerGames = arr;

            this.filtered = this.playerGames.filter(currentValue =>
                currentValue.starting.some(item => item.id === this.id)
            );
        });
    },
    methods: {
        hideModal: function () {
            this.open = false;
        },

        addPlayer: function () {
            this.newPlayer.games = 0;
            this.newPlayer.goals = 0;
            this.newPlayer.assists = 0;
            playersRef.push(this.newPlayer);
            //restart form
            (this.newPlayer.name = ""),
            (this.newPlayer.surname = ""),
            (this.newPlayer.number = "");
        },
        removePlayer: function (player) {
            playersRef.child(player[".key"]).remove();
        }
    }
};
</script>

<style>
#app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
