<template>
<div id="app">
    <sidebar-menu :menu="menu" :collapsed="true" />
    <div id="nav">
    </div>
    <router-view></router-view>
</div>
</template>

<script>
export default {
    name: 'App',

    data() {
        return {
            menu: [{
                    header: true,
                    title: 'Меню навигации',
                    hiddenOnCollapse: true
                },
                {
                    href: '/players',
                    title: 'Состав',
                    icon: 'fa fa-user'
                },
                {
                    href: '/games',
                    title: 'Сыгранные матчи',
                    icon: 'far fa-futbol'
                },
                {
                    href: '/upcomingGames',
                    title: 'Предстоящие матчи',
                    icon: 'fas fa-clock'
                },
                {
                    href: '',
                    title: 'Добавление данных',
                    icon: 'fas fa-plus-circle',
                    child: [{
                            href: '/addGame',
                            title: 'Добавить предстоящий матч'
                        },
                        {
                            href: '/AddTraining',
                            title: 'Добавить тренировку'
                        }
                    ]
                },
                {
                    href: '/trainings',
                    title: 'Тренировки',
                    icon: 'fas fa-running'
                }
            ]
        }
    },
    methods: {}
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
