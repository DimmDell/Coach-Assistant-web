<template>
<div class="players">
    <div id="con" class="container">

        <vue-modaltor :visible="open" @hide="hideModal" :resize-width='{1200:"60%",992:"80%",768:"90%"}'>
            <div class="card-body">
                <div class="card">
                    <div class="card-heading">
                        <h3>Добавить игрока</h3>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-12 order-md-1">
                                <div class="row">
                                    <div class="col-md-3 mb-3">
                                        <label>Имя</label>
                                        <input v-model="newPlayer.name" type="text" class="form-control" id="name" placeholder="Введите имя" value="" required>
                                    </div>
                                    <div class="col-md-3 mb-3">
                                        <label for="firstName">Фамилия</label>
                                        <input v-model="newPlayer.surname" type="text" class="form-control" id="surname" placeholder="Введите фамилию" value="" required>
                                    </div>
                                    <div class="col-md-3 mb-3">
                                        <label for="firstName">Номер</label>
                                        <input v-model="newPlayer.number" id="number" placeholder="Введите номер игрока" class="form-control" type="text" required>
                                    </div>
                                    <div class="col-md-3 mb-3">
                                        <label>Позиция</label>
                                        <select v-model="newPlayer.position" id="playersSelect" required="required" class="custom-select d-block w-100">
                                            <option selected="selected" disabled>Выберите позицию</option>
                                            <option>Вратарь</option>
                                            <option>Защитник</option>
                                            <option>Полузащитник</option>
                                            <option>Нападающий</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-12 order-md-1">
                                <div class="row">
                                    <div class="col-md-3 mb-3">
                                        <label>Рост</label>
                                        <input v-model="newPlayer.weight" type="text" class="form-control" id="name" placeholder="Введите рост" value="" required>
                                    </div>
                                    <div class="col-md-3 mb-3">
                                        <label for="firstName">Вес</label>
                                        <input v-model="newPlayer.height" type="text" class="form-control" id="surname" placeholder="Введите вес" value="" required>
                                    </div>
                                    <div class="col-md-3 mb-3">
                                        <label>Страна</label>
                                        <input v-model="newPlayer.country" type="text" class="form-control" id="name" placeholder="Введите страну" value="" required>
                                    </div>
                                    <div class="col-md-3 mb-3">
                                        <label>Электронная почта</label>
                                        <input v-model="newPlayer.email" class="form-control" type="email" id="email" placeholder="Введите почту игрока" required>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    <hr class="mb-4">
                    <button v-on:click="addPlayer" class="btn btn-secondary btn-lg btn-block">Сохранить</button>
        </vue-modaltor>

        <div class="card">
            <div class="card-header">
                <h3>Состав команды
                    <button @click="open=true; " class=" btn btn-outline-dark float-right"><i class="fas fa-user-plus"></i></button>
                </h3>

            </div>
            <div class="card-body">
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <td><b>Номер</b></td>
                            <td><b>Игрок</b></td>
                            <td><b>Позиция</b></td>
                            <td><b>Игры</b></td>
                            <td><b>Голы</b></td>
                            <td><b>Пасы</b></td>
                            <td></td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="player in players">
                            <td>{{player.number}}</td>
                            <td> {{player.name + " " + player.surname}}</td>
                            <td>{{player.position}}</td>
                            <td>{{player.games}}</td>
                            <td>{{player.goals}}</td>
                            <td>{{player.assists}}</td>
                            <td>
                                <router-link :to="{path: '/player/' + player.id}"><i class="fas fa-id-card"></i></router-link>
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

export default {
    name: 'Players',
    firebase: {
        players: playersRef,
    },
    data() {
        return {
            open: false,
            newPlayer: {
                name: '',
                surname: '',
                number: '',
                position: '',
                country: ''
            }
        }
    },
    methods: {

        hideModal: function () {
            this.open = false;
        },

        addPlayer: function () {
            this.newPlayer.games = 0
            this.newPlayer.goals = 0
            this.newPlayer.assists = 0
            this.newPlayer.injury = false
            this.newPlayer.recovery = ""

            this.newPlayer.number = parseInt(this.newPlayer.number)
            this.newPlayer.weight = parseInt(this.newPlayer.weight)
            this.newPlayer.height = parseInt(this.newPlayer.height)
            var id = playersRef.push(this.newPlayer);

            this.newPlayer.id = id.key

            db.ref('players/' + id.key)
                .set(this.newPlayer)
                .then(() => {})

            this.newPlayer.name = '',
                this.newPlayer.surname = '',
                this.newPlayer.number = ''
            this.newPlayer.country = ''
            this.newPlayer.position = ''
            this.newPlayer.weight = ''
            this.newPlayer.height = ''

        },
        removePlayer: function (player) {
            playersRef.child(player['.key']).remove();
            alert("Игрок удален");
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
