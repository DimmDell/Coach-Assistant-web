<template>
<div class="trainings">
    <div id="con" class="container">

        <div class="card">
            <div class="card-header">
                <h3>
                    Тренировки
                </h3>
            </div>
            <div class="card-body">
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <td><b>Название</b></td>
                            <td><b>Дата</b></td>
                            <td><b>Время</b></td>
                            <td><b>Количество игроков</b></td>
                            <td><b></b></td>
                            <td><b></b></td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="tr in trainings" :key="tr.id">
                            <td>{{tr.name}}</td>
                            <td> {{tr.date}}</td>
                            <td>{{tr.time}}</td>
                            <td>{{tr.players.length}}</td>
                            <td>
                                <i style="cursor: pointer;" v-on:click="remove(tr)" class="fas fa-trash-alt"></i> 
                            </td>
                            <td>
                                <router-link :to="{path: '/training/' + tr.id}">
                                    <i class="fa fa-info-circle"></i>
                                </router-link>
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
import db from '@/firebase.js'

let trainingsRef = db.ref("events/trainings");

export default {
    name: 'trainings',
    firebase: {
        trainings: trainingsRef,
    },
    data() {
        return {
            players: []
        }
    },
    methods: {
        remove: function (training) {
            trainingsRef.child(training['.key']).remove();
        }
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
