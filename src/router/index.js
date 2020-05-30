import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Players from '@/views/players.vue'
import Games from '@/views/games.vue'
import Player from '@/views/player.vue'
import Game from '@/views/game.vue'
import AddGame from '@/views/addGame.vue'
import upcomingGames from '@/views/upcomingGames.vue'
import editGame from '@/views/editGame.vue'
import upcomingGame from '@/views/upcomingGame.vue'
import AddTraining from '@/views/addTraining.vue'
import trainings from '@/views/trainings.vue'
import training from '@/views/training.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/players',
      name: 'Players',
      component: Players
    },
    {
      path: '/games',
      name: 'Games',
      component: Games
    },
    {
      path: '/player/:id',
      name: 'Player',
      component: Player
    },
    {
      path: '/game/:id',
      name: 'Game',
      component: Game
    },
    {
      path: '/addGame',
      name: 'AddGame',
      component: AddGame
    },
    {
      path: '/upcomingGames',
      name: 'upcomingGames',
      component: upcomingGames
    },
    {
      path: '/upcomingGame/:id',
      name: 'upcomingGame',
      component: upcomingGame
    },
    {
      path: '/editGame/:id',
      name: 'editGame',
      component: editGame
    },
    {
      path: '/addTraining',
      name: 'AddTraining',
      component: AddTraining
    },
    {
      path: '/trainings',
      name: 'trainings',
      component: trainings
    },
    {
      path: '/training/:id',
      name: 'training',
      component: training
    }
  ]
})
