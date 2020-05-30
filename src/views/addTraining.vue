<template>
<div class="AddTraining">
    <div class="container">
        <div id="mainCard" class="card">
            <div class="card-header">
                <h1>Добавление тренировки
                </h1>
            </div>
            <div class="card-body">
                <form id="form" v-on:submit.prevent="addPlayer" class="needs-validation" novalidate>
                    <div class="row">
                        <div class="col-md-12 order-md-1">
                            <div class="row">
                                <div class="col-md-3 mb-3">
                                    <label>Название тренировки</label>
                                    <input v-model="newTraining.name" type="text" class="form-control" id="name" placeholder="Название тренировки" value="" required>
                                </div>
                                <div class="col-md-3 mb-3">
                                    <label for="firstName">Дата</label>
                                    <datepicker @update-date="updateDate" date-format="yy-dd-mm" v-once></datepicker>
                                </div>
                                <div class="col-md-3 mb-3">
                                    <label for="firstName">Время</label>
                                    <input v-model="newTraining.time" id="time" name="appt" placeholder="Введите время тренировки" class="form-control" type="text" required>
                                </div>
                                <div class="col-md-3 mb-3">
                                    <label>Выбор участников тренировки</label>
                                    <select v-on:change="addToList();" id="playersSelect" required="required" class="custom-select d-block w-100">
                                        <option value="default" selected="selected" disabled>Выберите игрока</option>
                                        <option v-for="player in playersArr">{{"#"+player.number + " " +player.surname + " " + player.position}}</option>
                                    </select>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-12 order-md-1">
                                    <div class="row">
                                        <div class="col-md-7 mb-3">
                                            <label>Таблица состава</label>
                                            <table class="table table-striped">
                                                <thead>
                                                    <tr>
                                                        <td><b>Номер</b></td>
                                                        <td><b>Игрок</b></td>
                                                        <td><b>Позиция</b></td>
                                                        <td></td>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr v-for="player in trainingPlayers">
                                                        <td>{{player.number}}</td>
                                                        <td> {{player.name + " " + player.surname}}</td>
                                                        <td>{{player.position}}</td>
                                                        <td><button v-on:click="removeFromList(player.number)" type="button" class="btn btn-outline-secondary"><i class="fas fa-user-minus"></i></button></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div class="col-md-5 mb-3">
                                            <label for="exampleFormControlTextarea1">Описание тренировки</label>
                                            <textarea class="form-control" id="desc" placeholder="Введите описание тренировки" :rows="rows"></textarea>
                                        </div>

                                    </div>

                                </div>

                            </div>
                        </div>
                    </div>

                    <hr class="mb-4">
                    <button v-on:click="addTraining" class="btn btn-secondary btn-lg btn-block">Сохранить</button>
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
            dateFormat: 'yy-mm-dd',
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

let trainingsRef = db.ref("events/trainings");

let playersRef = db.ref('players');

export default {
    name: "AddTraining",
    el: '#app',
    components: {

    },
    methods: {
        isValid: function (sample) {
            var regexp = /(^1[0123456789]{1}|^2[0123]{1}|^[1234567890]{1}):(0|[12345]{1})[1234567890]{1}$/;
            return regexp.test(sample);
        },
        addTraining: function () {
            this.newTraining.players = this.trainingPlayers

            var date = document.getElementById('datePicker').value

            var des = document.getElementById('desc').value

            this.newTraining.description = des

            this.newTraining.date = date

            if (!this.isValid(this.newTraining.time)) {
                alert("Введите время в формате часы:минуты\n Пример: 12:45")
                return
            }

            var id = trainingsRef.push(this.newTraining);

            this.newTraining.id = id.key

            db.ref('events/trainings/' + id.key)
                .set(this.newTraining)
                .then(() => {

                    document.location.reload();
                })

        },
        addToList: function () {
            this.rows += this.trainingPlayers.length + 1
            var sel = document.getElementById('playersSelect')

            var str = sel.value.split(" ")

            var p = this.playersArr.find(item => item.number == str[0].replace("#", ""));

            this.trainingPlayers.push(p)

            this.playersArr = this.playersArr.filter(item => item != p)
            sel.selectedIndex = 0
        },
        removeFromList: function (num) {

            var p = this.trainingPlayers.find(item => item.number == num);
            this.playersArr.unshift(p)
            this.playersArr.sort((a, b) => (a.number > b.number) ? 1 : ((b.number > a.number) ? -1 : 0));
            this.trainingPlayers = this.trainingPlayers.filter(item => item != p)

        }

    },
    firebase: {
        games: gamesRef,
        players: playersRef
    },
    data() {
        return {
            newTraining: {
                name: '',
                date: '',
                time: '',
                players: '',
                description: [],
                id: ''
            },
            playersArr: [],
            trainingPlayers: [],
            rows: 3
        };
    },
    created() {

        this.playersArr = []
        var arr = []
        db.ref("players").once("value", snapshot => {
            var playersObj = snapshot.val();

            snapshot.forEach(function (ss) {
                arr.push(ss.val());
            });
            this.playersArr = arr

            var view = document.getElementById('mainCard')

            if (view == null) {
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
