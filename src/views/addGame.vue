<template>
<div class="addGame">
    <div class="container">
        <div id="mainCard" class="card">
            <div class="card-header">
                <h1>Добавление матча
                </h1>
            </div>
            <div class="card-body">
                <form id="form" class="needs-validation" novalidate>
                    <div class="row">
                        <div class="col-md-12 order-md-1">

                            <div class="row">
                                <div class="col-md-3 mb-3">
                                    <label for="rival">Соперник</label>
                                    <input v-model="newGame.rival" type="text" class="form-control" id="rival" placeholder="Название соперника" value="" required>
                                    <div class="invalid-feedback">
                                        Необходимо название соперника.
                                    </div>
                                </div>
                                <div class="col-md-3 mb-3">
                                    <label for="rival">Соревнование</label>
                                    <input v-model="newGame.competition" type="text" class="form-control" id="competition" placeholder="Название турнира" value="" required>
                                    <div class="invalid-feedback">
                                        Необходимо название турнира.
                                    </div>
                                </div>
                                <div class="col-md-3 mb-3">
                                    <label for="firstName">Дата</label>
                                    <datepicker @update-date="updateDate" date-format="yy-dd-mm" v-once></datepicker>
                                    <div class="invalid-feedback">
                                        Необходима дата матча.
                                    </div>
                                </div>
                                <div class="col-md-3 mb-3">
                                    <label for="firstName">Тип матча</label>
                                    <select v-model="newGame.type" required id="typename" class="custom-select d-block w-100">
                                        <option value="" selected="selected" disabled>Выберите тип матча</option>
                                        <option>Домашний</option>
                                        <option>Выездной</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12 order-md-1">
                            <div class="row">
                                <div class="col-md-8 mb-3">
                                    <label>Таблица состава</label>
                                    <select id="teamType" v-on:change="swapTable();" class="custom-select d-block w-100">
                                        <option value="" selected="selected" disabled>Выберите тип заявки</option>
                                        <option value="start">Основной состав</option>
                                        <option value="sub">Резерв</option>
                                    </select>

                                    <table v-if="startFlag" class="table table-striped">
                                        <thead>
                                            <tr>
                                                <td><b>Номер</b></td>
                                                <td><b>Игрок</b></td>
                                                <td><b>Позиция</b></td>
                                                <td></td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="player in selectedStartPlayers" :key="player.id">
                                                <td>{{player.number}}</td>
                                                <td> {{player.name + " " + player.surname}}</td>
                                                <td>{{player.position}}</td>
                                                <td>
                                                    <button v-on:click="removeFromList(player.number)" type="button" class="btn btn-outline-secondary">
                                                        <i class="fas fa-user-minus"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <table v-if="subFlag" class="table table-striped">
                                        <thead>
                                            <tr>
                                                <td><b>Номер</b></td>
                                                <td><b>Игрок</b></td>
                                                <td><b>Позиция</b></td>
                                                <td></td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="player in selectedSubPlayers" :key="player.id">
                                                <td>{{player.number}}</td>
                                                <td> {{player.name + " " + player.surname}}</td>
                                                <td>{{player.position}}</td>
                                                <td>
                                                    <button v-on:click="removeFromList(player.number)" type="button" class="btn btn-outline-secondary">
                                                        <i class="fas fa-user-minus"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div class="col-md-4 mb-3">
                                    <label>Выбор игроков для стартового состава</label>
                                    <select v-on:change="addToList();" id="playersSelect" required="required" disabled="true" class="custom-select d-block w-100">
                                        <option value="default" selected="selected" disabled>
                                            Выберите игрока
                                        </option>
                                        <option v-for="player in playersArr" :key="player.id">
                                            {{"#"+player.number + " " +player.surname + " " + player.position}}
                                        </option>
                                    </select>
                                </div>

                            </div>

                        </div>

                    </div>
                    <hr class="mb-4">
                    <button v-on:click="addGame" class="btn btn-secondary btn-lg btn-block">Сохранить</button>
                </form>
            </div>

        </div>
    </div>
</div>
</template>

<script>
import Vue from 'vue'
/* eslint-disable */

import db from "@/firebase.js";

Vue.component('datepicker', {
    template: '<input type="text" id="datePicker" value="" required placeholder="Выберите дату матча" class="form-control"/>',
    props: ['dateFormat'],
    mounted: function () {
        var self = this;
        $(this.$el).datepicker({
            dateFormat: 'yyyy-mm-dd',
            onSelect: function (date) {
                self.$emit('update-date', date);
                this.date = date

            }
        });
    },
    beforeDestroy: function () {
        $(this.$el).datepicker('hide').datepicker('destroy');
    }
});

let gamesRef = db.ref("events/completeGames");

let newGamesRef = db.ref("events/upcomingGames");

let playersRef = db.ref('players');

export default {
    name: "AddGame",
    el: '#app',
    components: {

    },
    methods: {
        removeFromList: function (num) {

            if (this.startFlag) {
                var p = this.selectedStartPlayers.find(item => item.number == num);
                this.playersArr.unshift(p)
                this.playersArr.sort((a, b) => (a.number > b.number) ? 1 : ((b.number > a.number) ? -1 : 0));
                this.selectedStartPlayers = this.selectedStartPlayers.filter(item => item != p)
            } else if (this.subFlag) {
                var p = this.selectedSubPlayers.find(item => item.number == num);
                this.playersArr.unshift(p)
                this.playersArr.sort((a, b) => (a.number > b.number) ? 1 : ((b.number > a.number) ? -1 : 0));
                this.selectedSubPlayers = this.selectedSubPlayers.filter(item => item != p)
            }

        },
        addToList: function () {

            var sel = document.getElementById('playersSelect')

            var str = sel.value.split(" ")

            var p = this.playersArr.find(item => item.number == str[0].replace("#", ""));

            if (this.startFlag) {
                this.selectedStartPlayers.push(p)
            } else {
                this.selectedSubPlayers.push(p)
            }
            this.playersArr = this.playersArr.filter(item => item != p)
            sel.selectedIndex = 0
        },
        swapTable: function () {
            var sel = document.getElementById('teamType')
            var team = document.getElementById('playersSelect')
            team.disabled = false
            if (sel.value == "start") {
                this.startFlag = true
                this.subFlag = false
            } else {
                this.startFlag = false
                this.subFlag = true
            }

        },
        addGame: function () {

            var sel = document.getElementById('datePicker')

            if (!document.forms["form"].reportValidity()) {
                return
            }

            this.newGame.starting = this.selectedStartPlayers

            var gdate = sel.value

            this.newGame.date = gdate

            if (this.newGame.starting.length != 11) {
                alert("В стартовом составе необходимо 11 игроков")
                return
            }

            this.newGame.substitutions = this.selectedSubPlayers
            if (this.newGame.substitutions.length == 0) {
                alert("Вы не добавили игроков запаса")
                return
            }

            var ng = newGamesRef.push(this.newGame);

            this.newGame.id = ng.key

            db.ref('events/upcomingGames/' + ng.key)
                .set(this.newGame)
                .then(() => {

                    document.location.reload();
                })

        }
    },
    firebase: {
        games: gamesRef,
        players: playersRef
    },
    data() {
        return {
            newGame: {
                rival: '',
                date: '',
                type: '',
                starting: [],
                substitutions: [],
                competition: '',
                id: ''
            },
            fdate: null,
            selectedStartPlayers: [],
            selectedSubPlayers: [],
            playersArr: [],
            startFlag: false,
            subFlag: false
        };
    },
    created() {

        this.playersArr = [];
        var arr = [];
        db.ref("players").once("value", snapshot => {
            var playersObj = snapshot.val();

            snapshot.forEach(function (ss) {
                arr.push(ss.val());
            });
            this.playersArr = arr;

            var view = document.getElementById('mainCard');

            if (!("mainCard" in window)) {
                document.location.reload();
            }

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
