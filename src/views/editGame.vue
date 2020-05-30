<template>
<div class="editGame">
    <div class="container">

        <vue-modaltor v-on:submit.prevent="addPlayer" id="theirGoalsModal" :visible="theirOpen" @hide="theirHideModal" :resize-width='{1200:"60%",992:"80%",768:"90%"}'>
            <div class="card-body">
                <div class="card">
                    <div class="card-heading">
                    </div>
                    <div class="card-body">
                        <form id="theirForm">
                            <div class="row">
                                <div class="col-md-12 order-md-1">
                                    <div class="row">
                                        <div class="col-md-3 mb-3">
                                            <label>Тип гола</label>
                                            <select v-on:change="setTheirOG" id="theirGoalTypeSel" required="required" class="custom-select d-block w-100">
                                                <option value="С игры" selected="selected">C игры</option>
                                                <option>Пенальти</option>
                                                <option>Штрафной</option>
                                                <option>Автогол</option>
                                            </select>
                                        </div>
                                        <div class="col-md-3 mb-3">
                                            <label>Игрок, забивший гол</label>
                                            <select v-if="theirOG" id="theirOGScoarer" required="required" class="custom-select d-block w-100">
                                                <option value="default" selected="selected">Выберите игрока</option>
                                                <option v-for="player in game.starting">{{"#"+player.number + " " +player.surname + " " + player.position}}</option>
                                            </select>
                                            <input v-if="!theirOG" type="text" class="form-control" id="theirScoarer" placeholder="Введите фамилию игрока" value required>
                                        </div>
                                        <div class="col-md-3 mb-3">
                                            <label>Ассистент</label>
                                            <select v-if="theirOS" id="theirOGAssistant" required="required" class="custom-select d-block w-100">
                                                <option value="default" selected="selected">Выберите игрока</option>
                                                <option v-for="player in playersArr">{{"#"+player.number + " " +player.surname + " " + player.position}}</option>
                                            </select>
                                            <input v-if="!theirOS" type="text" class="form-control" id="theirAssistant" placeholder="Введите фамилию игрока" value required>
                                        </div>
                                        <div class="col-md-3 mb-3">
                                            <label for="rival">Минута</label>
                                            <input type="text" class="form-control" id="theirMinute" placeholder="Минута гола" value required>
                                            <div class="invalid-feedback">
                                                Необходимо название соперника.
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-12 order-md-1">
                                    <div class="row">
                                        <div class="col-md-3 mb-3">

                                        </div>
                                        <div class="col-md-3 mb-3">

                                        </div>
                                        <div class="col-md-3 mb-3">
                                            <input v-on:change="setTheirOS" type="checkbox" id="theirOSCB">
                                            <label>Ассист соперника</label>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <hr class="mb-4">
                            <button v-on:click="addTheirGoal" class="btn btn-secondary btn-lg btn-block">Добавить гол</button>
                        </form>
                    </div>
                </div>
        </vue-modaltor>

        <vue-modaltor id="ourGoalsModal" v-on:submit.prevent="addPlayer" :visible="ourOpen" @hide="ourHideModal" :resize-width='{1200:"60%",992:"80%",768:"90%"}'>
            <div class="card-body">
                <div class="card">
                    <div class="card-heading">
                    </div>
                    <div class="card-body">
                        <form id="ourForm">
                            <div class="row">
                                <div class="col-md-12 order-md-1">
                                    <div class="row">
                                        <div class="col-md-3 mb-3">
                                            <label>Тип гола</label>
                                            <select v-on:change="setOurOG" id="ourGoalTypeSel" required="required" class="custom-select d-block w-100">
                                                <option value="С игры" selected="selected">C игры</option>
                                                <option>Пенальти</option>
                                                <option>Штрафной</option>
                                                <option>Автогол</option>
                                            </select>
                                        </div>
                                        <div class="col-md-3 mb-3">
                                            <label>Игрок, забивший гол</label>
                                            <select v-if="!ourOG" id="ourScoarer" required="required" class="custom-select d-block w-100">
                                                <option value="default" selected="selected">Выберите игрока</option>
                                                <option v-for="player in game.starting">{{"#"+player.number + " " +player.surname + " " + player.position}}</option>
                                            </select>
                                            <input v-if="ourOG" type="text" class="form-control" id="ourOGScoarer" placeholder="Введите фамилию игрока" value required>
                                        </div>
                                        <div class="col-md-3 mb-3">
                                            <label>Ассистент</label>
                                            <select v-if="!ourOS" id="ourAssistant" class="custom-select d-block w-100">
                                                <option value="" selected="selected">Выберите игрока</option>
                                                <option v-for="player in playersArr">{{"#"+player.number + " " +player.surname + " " + player.position}}</option>
                                            </select>
                                            <input v-if="ourOS" id="ourOGAssistant" type="text" class="form-control" placeholder="Введите фамилию игрока" value>
                                        </div>
                                        <div class="col-md-3 mb-3">
                                            <label for="rival">Минута</label>
                                            <input type="text" class="form-control" id="ourMinute" placeholder="Минута гола" value required>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-12 order-md-1">
                                    <div class="row">
                                        <div class="col-md-3 mb-3">

                                        </div>
                                        <div class="col-md-3 mb-3">

                                        </div>
                                        <div class="col-md-3 mb-3">
                                            <input v-on:change="setOurOS" type="checkbox" id="ourOSCB">
                                            <label>Ассист соперника</label>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <hr class="mb-4">
                            <button v-on:click="addOurGoal" class="btn btn-secondary btn-lg btn-block">Добавить гол</button>
                        </form>
                    </div>
                </div>
        </vue-modaltor>

        <div id="mainCard" class="card">
            <div class="card-header">
                <h1>Редактирование матча
                </h1>
            </div>
            <div class="card-body">

                <div class="row">
                    <div class="col-md-12 order-md-1">
                        <div class="row">
                            <div class="col-md-6 mb-3">
                                <h2 v-if="game.type === 'Домашний'" class="float-left">{{ourTeam}}</h2>
                                <h2 v-else class="float-left">{{game.rival}}</h2>
                                <button v-if="game.type == 'Домашний'" @click="ourOpen=true;" type="button" class=" btn btn-secondary">Добавить гол</button>
                                <button v-else @click="theirOpen=true;" type="button" class=" btn btn-secondary">Добавить гол</button>
                            </div>
                            <div class="col-md-6 mb-3">
                                <h2 v-if="game.type === 'Домашний'" class="float-right">{{game.rival}}</h2>
                                <h2 v-else class="float-right">{{ourTeam}}</h2>
                                <button v-if="game.type != 'Домашний'" @click="ourOpen=true;" type="button" class=" btn btn-secondary">Добавить гол</button>
                                <button v-else @click="theirOpen=true;" type="button" class=" btn btn-secondary">Добавить гол</button>
                            </div>
                        </div>
                    </div>

                    <div class="col-md-12 order-md-2">
                        <div class="row">
                            <div class="col-md-4 mb-3">
                                <ul class="float-left" style="list-style-type: none">
                                    <li v-for="goal in this.homeGoalsShow">
                                        <b>{{ goal.minute }}</b> {{ " " + goal.scoarer
                }}<span v-if="goal.assistant">{{
                  " (" + goal.assistant + ") "
                }}</span>
                                    </li>
                                </ul>
                            </div>

                            <div class="col-md-4 mb-3">
                                <h1>{{homeGoalsShow.length + " : " + awayGoalsShow.length}}
                            </div>

                            <div class="col-md-4 mb-3">
                                <ul class="float-left" style="list-style-type: none">
                                    <li v-for="goal in this.awayGoalsShow">
                                        <b>{{ goal.minute }}</b> {{ " " + goal.scoarer
                }}<span v-if="goal.assistant">{{
                  " (" + goal.assistant + ") "
                }}</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div class="col-md-12 order-md-3">
                        <div class="row">
                            <div class="col-md-12 mb-3">
                                <h5 style="text-align: left">Основной состав</h5>
                                <table class="table table-striped">
                                    <thead>
                                        <tr>
                                            <td><b>Номер</b></td>
                                            <td><b>Игрок</b></td>
                                            <td><b>Голы</b></td>
                                            <td><b>Ассисты</b></td>
                                            <td><b>Минуты</b></td>
                                            <td><b>Карточка</b></td>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        <tr v-for="player in game.starting">
                                            <td>
                                                {{player.number}}
                                            </td>
                                            <td> {{player.name + " " +player.surname}}</td>
                                            <td>
                                                {{startArr.find(elem => elem.id == player.id).goals}}
                                            </td>
                                            <td>
                                                {{startArr.find(elem => elem.id == player.id).assists}}
                                            </td>
                                            <td>
                                                <input class="w-50" v-on:change="minChange(player.id)" :id="player.id+'min'" type='text'>
                                            </td>
                                            <td>
                                                <select v-on:change="cardChange(player.id)" :id="player.id+'card'" required="required" class="custom-select w-auto">
                                                    <option value="Нет" selected="selected">Нет</option>
                                                    <option value="yellow">Желтая</option>
                                                    <option value="red">Красная</option>

                                                </select>
                                            </td>

                                        </tr>
                                    </tbody>
                                </table>

                                <h5 style="text-align: left">Резерв</h5>
                                <table class="table table-striped">
                                    <thead>
                                        <tr>
                                            <td><b>Номер</b></td>
                                            <td><b>Игрок</b></td>
                                            <td><b>Голы</b></td>
                                            <td><b>Ассисты</b></td>
                                            <td><b>Минуты</b></td>
                                            <td><b>Карточка</b></td>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        <tr v-for="player in game.substitutions">
                                            <td>
                                                {{player.number}}
                                            </td>
                                            <td> {{player.name + " " +player.surname}}</td>
                                            <td>
                                                {{subsArr.find(elem => elem.id == player.id).goals}}
                                            </td>
                                            <td>
                                                {{subsArr.find(elem => elem.id == player.id).assists}}
                                            </td>
                                            <td>
                                                <input class="w-50" v-on:change="minChange(player.id)" :id="player.id+'min'" type='text'>
                                            </td>
                                            <td>
                                                <select v-on:change="cardChange(player.id)" :id="player.id+'card'" required="required" class="custom-select w-auto">
                                                    <option value="" selected="selected">Нет</option>
                                                    <option value="yellow">Желтая</option>
                                                    <option value="red">Красная</option>
                                                </select>
                                            </td>

                                        </tr>
                                    </tbody>
                                </table>

                            </div>

                        </div>
                    </div>

                </div>
                <hr class="mb-4">
                <button v-on:click="save" class="btn btn-secondary btn-lg btn-block">Сохранить</button>
            </div>
        </div>
    </div>
</template>

<script>
import Vue from 'vue'
/* eslint-disable */

import db from "@/firebase.js";

let gamesRef = db.ref("events/completeGames");

let newGamesRef = db.ref("events/upcomingGames");

let playersRef = db.ref('players');

export default {
    name: "editGame",
    el: '#app',
    components: {

    },
    methods: {

        minChange: function (id) {
            var el = document.getElementById(id + 'min').value

            if (this.startArr.find(item => item.id == id) != null) {
                this.startArr.find(item => item.id == id).minutes = el
            } else if (this.subsArr.find(item => item.id == id) != null) {
                this.subsArr.find(item => item.id == id).minutes = el
            }

        },
        cardChange: function (id) {

            var el = document.getElementById(id + 'card').value

            if (this.startArr.find(item => item.id == id) != null) {
                if (el == 'red') {
                    this.startArr.find(item => item.id == id).redCard = true
                } else if (el == 'yellow') {
                    this.startArr.find(item => item.id == id).yellowCard = true
                }
            } else if (this.subsArr.find(item => item.id == id) != null) {
                if (el == 'red') {
                    this.subsArr.find(item => item.id == id).redCard = true
                } else if (el == 'yellow') {
                    this.subsArr.find(item => item.id == id).yellowCard = true
                }
            }

        },
        save: function () {
            var starting = []
            var subs = []

            this.startArr.forEach(item => {
                var p = {
                    id: item.id,
                    minutes: parseInt(item.minutes),
                    redCard: item.redCard,
                    yellowCard: item.yellowCard
                }
                starting.push(p)
            })

            this.subsArr.forEach(item => {
                var p = {
                    id: item.id,
                    minutes: parseInt(item.minutes),
                    redCard: item.redCard,
                    yellowCard: item.yellowCard
                }
                subs.push(p)
            })

            var game = {
                competition: this.game.competition,
                conceded: this.theirGoals.length,
                date: this.game.date,
                id: this.game.id,
                ourGoals: this.ourGoals,
                rival: this.game.rival,
                scored: this.ourGoals.length,
                starting: starting,
                substitutions: subs,
                theirGoals: this.theirGoals,
                type: this.game.type
            }

            var ng = db.ref('events/completeGames').push(game);

            game.id = ng.key

            this.game.starting.forEach(element => {
                element.games += 1

                var goals = this.ourGoals.filter(goal => goal.scoarer == element.id).length
                var assists = this.ourGoals.filter(goal => goal.assistant == element.id).length

                element.goals += goals
                element.assists += assists

                db.ref('players/' + element.id)
                    .set(element)
                    .then(() => {})

            });

            this.game.substitutions.forEach(element => {
                element.games += 1

                var goals = this.ourGoals.filter(goal => goal.scoarer == element.id).length
                var assists = this.ourGoals.filter(goal => goal.assistant == element.id).length

                element.goals += goals
                element.assists += assists

                db.ref('players/' + element.id)
                    .set(element)
                    .then(() => {})

            });

            db.ref('events/completeGames/' + ng.key)
                .set(game)
                .then(() => {

                    document.location.reload();
                })

        },
        addOurGoal: function () {

            this.ourNum++

            var SCnumber = null

            var scoarer = null
            var SCid = null
            if (document.getElementById('ourScoarer') != null) {
                scoarer = document.getElementById('ourScoarer').value.split(" ")[1]
                SCnumber = document.getElementById('ourScoarer').value.split(" ")[0].replace('#', '')
                SCid = this.playersArr.find(item => item.number == SCnumber).id

                if (this.startArr.find(item => item.id == SCid) != null) {
                    this.startArr.find(item => item.id == SCid).goals++

                } else if (this.subsArr.find(item => item.id == SCid) != null) {
                    this.subsArr.find(item => item.id == SCid).goals++
                }
            } else if (document.getElementById('ourOGScoarer') != null) {
                scoarer = document.getElementById('ourOGScoarer').value

            }

            var ASnumber = null
            var assistant = null
            var ASid = null
            if (document.getElementById('ourAssistant') != null) {
                assistant = document.getElementById('ourAssistant').value.split(" ")[1]
                ASnumber = document.getElementById('ourAssistant').value.split(" ")[0].replace('#', '')
                ASid = this.playersArr.find(item => item.number == ASnumber).id

                if (this.startArr.find(item => item.id == ASid) != null) {
                    this.startArr.find(item => item.id == ASid).assists += 1

                } else if (this.subsArr.find(item => item.id == ASid) != null) {
                    this.subsArr.find(item => item.id == ASid).assists += 1
                }
            } else if (document.getElementById('ourOGAssistant') != null) {
                assistant = document.getElementById('ourOGAssistant').value

            }

            var type = document.getElementById('ourGoalTypeSel').value

            var minute = document.getElementById('ourMinute').value

            var goal = {
                scoarer: scoarer,
                assistant: assistant,
                type: type,
                minute: minute
            }

            var ng = {
                scoarer: SCid,
                assistant: ASid,
                type: type,
                minute: parseInt(minute),
                num: parseInt(this.ourNum)
            }

            if (this.game.type == 'Домашний') {
                this.homeGoalsShow.push(goal)
            } else {
                this.awayGoalsShow.push(goal)
            }

            this.ourGoals.push(ng)

        },
        addTheirGoal: function () {

            this.theirNum++
            var scoarer = null
            if (document.getElementById('theirScoarer') != null) {
                scoarer = document.getElementById('theirScoarer').value

            } else if (document.getElementById('theirOGScoarer') != null) {
                scoarer = document.getElementById('theirOGScoarer').value

            }

            var assistant = null
            if (document.getElementById('theirAssistant') != null) {
                assistant = document.getElementById('theirAssistant').value

            } else if (document.getElementById('theirOGAssistant') != null) {
                assistant = document.getElementById('theirOGAssistant').value

            }

            var type = document.getElementById('theirGoalTypeSel').value

            var minute = document.getElementById('theirMinute').value

            var goal = {
                scoarer: scoarer,
                assistant: assistant,
                type: type,
                minute: parseInt(minute),
                num: parseInt(this.theirNum)
            }

            if (this.game.type == 'Выездной') {
                this.homeGoalsShow.push(goal)
            } else {
                this.awayGoalsShow.push(goal)
            }

            goal.num = this.theirNum
            this.theirGoals.push(goal)

        },

        ourHideModal: function () {
            this.ourOpen = false;
        },
        theirHideModal: function () {
            this.theirOpen = false;
        },

        setOurOG: function () {
            var sel = document.getElementById('ourGoalTypeSel');

            if (sel.value == 'Автогол') {
                this.ourOG = true
            } else {
                this.ourOG = false
            }
        },
        setOurOS: function () {
            var sel = document.getElementById('ourOSCB');

            if (sel.value) {
                this.ourOS = true
            } else {
                this.ourOS = false
            }
        },
        setTheirOG: function () {
            var sel = document.getElementById('theirGoalTypeSel');

            if (sel.value == 'Автогол') {
                this.theirOG = true

            } else {
                this.theirOG = false

            }
        },
        setTheirOS: function () {
            var sel = document.getElementById('theirOSCB');

            if (sel.value) {
                this.theirOS = false
            } else {
                this.theirOS = true
            }
        }

    },
    firebase: {
        games: gamesRef,
        players: playersRef
    },
    data() {
        return {
            ourOpen: false,
            theirOpen: false,
            id: "",
            ourTeam: "",
            game: "",
            homeGoalsShow: [],
            awayGoalsShow: [],
            ourGoals: [],
            theirGoals: [],
            ourOG: false,
            ourOS: false,
            theirOG: false,
            theirOS: false,
            startArr: [],
            subsArr: [],
            ourNum: 0,
            theirNum: 0
        };
    },
    created() {
        this.id = window.location.href.split("/").pop();

        this.homeGoalsShow = []
        this.awayGoalsShow = []

        db.ref("teamName").once("value", snapshot => {
            this.ourTeam = snapshot.val();

        });

        db.ref("events/upcomingGames/" + this.id).once("value", snapshot => {
            this.game = snapshot.val();

            this.startArr = []
            this.subsArr = []

            var arr = []
            this.game.starting.forEach(element => {
                var p = {
                    id: element.id,
                    minutes: 0,
                    redCard: false,
                    yellowCard: false,
                    goals: 0,
                    assists: 0
                }
                arr.push(p)

            });
            this.startArr = arr

            arr = []
            this.game.substitutions.forEach(element => {
                var p = {
                    id: element.id,
                    minutes: 0,
                    redCard: false,
                    yellowCard: false,
                    goals: 0,
                    assists: 0
                }
                arr.push(p)

            });
            this.subsArr = arr

        });

        var arr = []

        this.playersArr = []

        arr = []
        db.ref("players").once("value", snapshot => {
            var playersObj = snapshot.val();

            snapshot.forEach(function (ss) {
                arr.push(ss.val());

            });
            this.playersArr = arr

        });

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
