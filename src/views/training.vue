<template>
<div class="training">
    <div class="container">
        <div id="mainCard" class="card">
            <div class="card-header">
                <h1>Сведения о тренировке
                </h1>
                <div class="badge badge-secondary">
                    {{"Название: " +
              training.name +
              " | " +
              "Дата: " +
              training.date +
              " | " +
              "Время: " +
              training.time
              }}
                </div>

            </div>
            <div class="card-body">
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
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="player in training.players">
                                            <td>{{player.number}}</td>
                                            <td> {{player.name + " " + player.surname}}</td>
                                            <td>{{player.position}}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div class="col-md-5 mb-3">
                                <label for="exampleFormControlTextarea1">Описание тренировки</label>
                                <textarea class="form-control" id="desc" readonly placeholder="Введите описание тренировки" :rows="rows"></textarea>
                            </div>

                        </div>

                    </div>

                </div>
            </div>
        </div>

    </div>
</div>
</template>

<script>
import Vue from 'vue'

/* eslint-disable */

import db from "@/firebase.js";

let gamesRef = db.ref("events/completeGames");

let trainingsRef = db.ref("events/trainings");

let playersRef = db.ref('players');

export default {
    name: "training",
    el: '#app',
    components: {

    },
    methods: {

    },
    firebase: {
        games: gamesRef,
        players: playersRef
    },
    data() {
        return {
            id: "",
            training: "",
            rows: 0
        };

    },
    created() {

        this.id = window.location.href.split("/").pop();

        db.ref("events/trainings/" + this.id).once("value", snapshot => {
            this.training = snapshot.val();

            var el = document.getElementById("desc")
            el.value = this.training.description

            this.rows = (this.training.players.length + 1) * 2
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
