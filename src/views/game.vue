<template>
<div class="game">
    <div id="con" class="container">
        <div class="card">
            <div class="card-header">
                <div class="d-flex flex-row justify-content-between my-flex-container">
                    <div class="p-2 my-flex-item">
                        <h1>{{ ourTeam }}</h1>
                    </div>
                    <div class="p-2 my-flex-item">
                        <h1>{{ igame.rival }}</h1>
                    </div>
                </div>

                <h1 v-if="igame.type === 'Домашний' && ((igame.ourGoals != 'undefined') || (igame.theirGoals != 'undefined') )">
                    {{ igame.scored + " : " + igame.conceded }}
                </h1>

                <h1 v-if="igame.type === 'Выездной' && ((igame.ourGoals != 'undefined') || (igame.theirGoals != 'undefined') )">
                    {{ igame.conceded + " : " + igame.scored }}
                </h1>
                <h1 v-if="((igame.ourGoals == 'undefined') && (igame.theirGoals == 'undefined') )">
                    {{ 0 + " : " + 0 }}
                </h1>

                <div v-if="igame.type === 'Домашний' && ((igame.ourGoals != 'undefined') || (igame.theirGoals != 'undefined') )" style="clear: both">
                    <ul class="float-left" style="padding: 0;  list-style-type: none">
                        <li v-for="(goal, index) in igame.ourGoals">
                            <b>{{ goal.minute }}</b>
                            <router-link :to="{ path: '/player/' + goal.scID }">{{
                  " " + goal.scoarer
                }}</router-link>
                            <router-link :to="{ path: '/player/' + goal.asID }">
                                <span v-if="goal.assistant">
                                    {{ " (" + goal.assistant + ") " }}</span>
                            </router-link>
                        </li>
                    </ul>
                    <ul class="float-right" style=" text-align:right; list-style-type: none">
                        <li v-for="goal in igame.theirGoals">
                            <b>{{ goal.minute }}</b> {{ " " + goal.scoarer
                }}<span v-if="goal.assistant">{{
                  " (" + goal.assistant + ") "
                }}</span>
                        </li>
                    </ul>
                </div>

                <div v-if="igame.type === 'Выездной' && ((igame.ourGoals != 'undefined') || (igame.theirGoals != 'undefined') )" style="clear: both">
                    <ul class="float-right" style="list-style-type: none">
                        <li v-for="goal in igame.theirGoals">
                            <b>{{ goal.minute }}</b> {{ " " + goal.scoarer }}
                            <span v-if="goal.assistant">
                                {{ " (" + goal.assistant + ") " }}</span>
                        </li>
                    </ul>
                    <ul class="float-left" style="list-style-type: none">
                        <li v-for="goal in igame.ourGoals">
                            <b>{{ goal.minute }}</b> {{ " " + goal.scoarer }}
                            <span v-if="goal.assistant">
                                {{ " (" + goal.assistant + ") " }}</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="card-body">
                <h5 style="text-align: left">Основной состав</h5>
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <td><b>Игрок</b></td>
                            <td><b>Минут на поле</b></td>
                            <td><b>Голы</b></td>
                            <td><b>Ассисты</b></td>
                            <td><b>Карточки</b></td>
                        </tr>
                    </thead>

                    <tbody>
                        <tr v-for="player in igame.starting">
                            <td>
                                <router-link :to="{ path: '/player/' + player.id }">{{
                    player.name
                  }}</router-link>
                            </td>
                            <td>{{ player.minutes }}</td>
                            <td v-if=" igame.ourGoals != 'undefined' ">
                                {{
                    igame.ourGoals.filter(goal => player.id === goal.scID)
                      .length
                  }}
                            </td>
                            <td v-else>
                                0
                            </td>
                            <td v-if=" igame.ourGoals != 'undefined' ">
                                {{
                    igame.ourGoals.filter(goal => player.id === goal.asID)
                      .length
                  }}
                            </td>
                            <td v-else>
                                0
                            </td>
                            <td v-if="player.redCard"><img src="../assets/red.png" /></td>
                            <td v-else-if="player.yellowCard">
                                <img src="../assets/yellow.png" />
                            </td>
                            <td v-else></td>
                        </tr>
                    </tbody>
                </table>
                <h5 style="text-align: left">Резерв</h5>
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <td><b>Игрок</b></td>
                            <td><b>Минут на поле</b></td>
                            <td><b>Голы</b></td>
                            <td><b>Ассисты</b></td>
                            <td><b>Карточки</b></td>
                        </tr>
                    </thead>

                    <tbody>
                        <tr v-for="player in igame.substitutions">
                            <td>
                                <router-link :to="{ path: '/player/' + player.id }">{{
                    player.name
                  }}</router-link>
                            </td>
                            <td>{{ player.minutes }}</td>
                            <td v-if=" igame.ourGoals != undefined ">
                                {{
                    igame.ourGoals.filter(goal => player.id === goal.scID)
                      .length
                  }}
                            </td>
                            <td v-else>
                                0
                            </td>
                            <td v-if=" igame.ourGoals != undefined ">
                                {{
                    igame.ourGoals.filter(goal => player.id === goal.asID)
                      .length
                  }}
                            </td>
                            <td v-else>
                                0
                            </td>
                            <td v-if="player.redCard"><img src="../assets/red.png" /></td>
                            <td v-else-if="player.yellowCard">
                                <img src="../assets/yellow.png" />
                            </td>
                            <td v-else></td>
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
import db from "@/firebase.js";

let gamesRef = db.ref("completeGames");

export default {
    name: "Games",
    firebase: {
        games: gamesRef
    },
    data() {
        return {
            games: [],
            id: "",
            igame: "",
            ourTeam: "",
            players: [],
            goals: []
        };
    },
    created() {
        this.id = window.location.href.split("/").pop();
        this.scoarerIDs = [];

        db.ref("events/completeGames/" + this.id).once("value", snapshot => {
            this.igame = snapshot.val();

            db.ref("players").once("value", snapshot => {
                var playersObj = snapshot.val();
                var arr = [];
                snapshot.forEach(function (ss) {
                    arr.push(ss.val());
                });

                if (this.ourGoals != "undefined") {
                    this.igame.ourGoals.forEach(function (g) {
                        var p = arr.find(item => item.id === g.scoarer);
                        g.scID = g.scoarer;
                        g.scoarer = p.surname;
                        if (g.assistant != "undefined") {
                            var p = arr.find(item => item.id === g.assistant);
                            g.asID = g.assistant;
                            g.assistant = p.surname;

                        }
                    });
                }

                this.igame.starting.forEach(function (g) {
                    var p = arr.find(item => item.id === g.id);

                    g.name = p.name + " " + p.surname;

                });

                this.igame.substitutions.forEach(function (g) {
                    var p = arr.find(item => item.id === g.id);
                    g.name = p.name + " " + p.surname;
                });
            });
        });

        db.ref("teamName").once("value", snapshot => {
            this.ourTeam = snapshot.val();

        });
    },
    methods: {}
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
