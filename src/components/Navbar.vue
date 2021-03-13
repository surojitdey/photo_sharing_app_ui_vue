<template>
    <v-app-bar class="navbar ma-auto" flat app rounded>
        <v-app-bar-nav-icon class="md-off" @click="navigationDrawer = true"></v-app-bar-nav-icon>
        <v-img class="logo-img" :src="logo" height="60" width="200" max-width="220" @click="$router.push('/')"></v-img>
        <v-spacer></v-spacer>
        <v-btn text class="small-off" color="primary" v-if="!loggedIn" @click="$router.push('signin')">Sign In</v-btn>
        <v-btn text class="small-off" color="primary" v-if="!loggedIn" @click="$router.push('signup')">New User? Sign Up</v-btn>
        <v-btn text class="small-off" color="primary" v-if="loggedIn" @click="signout">Sign Out</v-btn>
        <v-menu left bottom class="md-off">
            <template v-slot:activator="{ on, attrs}">
                <v-btn class="md-off" icon v-bind="attrs" v-on="on">
                    <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
            </template>

            <v-list flat>
                <v-list-item-group v-model="selectedVirticalList" color="primary">
                    <v-list-item v-for="(item, index) in verticalListItems" :key="index" @click="$router.push(item.route)">
                        <v-list-item-title>{{item.title}}</v-list-item-title>
                    </v-list-item>
                </v-list-item-group>
            </v-list>
        </v-menu>
        <v-navigation-drawer class="md-off" absolute app v-model="navigationDrawer">
            <v-list class="md-off" nav dense>
                <v-list-item v-for="(item, index) in listItems" :key="index">
                    <v-list-item-title>{{item.text}}</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
    </v-app-bar>
</template>

<script>
import logo from '@/assets/logo.png'
import { mapGetters, mapActions } from 'vuex'
export default {
    data: () => ({
        logo,
        verticalListItems: [
            {
                title: 'Sign In',
                route: 'signin'
            },
            {
                title: 'Sign Up',
                route: 'signup'
            }
        ],
        selectedVirticalList: null,
        navigationDrawer: false,
        listItems: [
            {
                text: 'BECOME A MEMBER'
            },
            {
                text: 'ABOUT'
            },
            {
                text: 'RESIDENTS'
            },
            {
                text: 'COMPLAINTS & GRIEVANCES'
            },
            {
                text: 'EVENTS'
            },
            {
                text: 'CONTACT US'
            },
        ]
    }),
    computed: {
        ...mapGetters('JWT',[
            'loggedIn'
        ])
    },
    methods: {
        ...mapActions('JWT', [
            'logout'
        ]),
        signout() {
            this.logout()
            location.reload()
        }
    }
}
</script>

<style scoped>
.navigation-list {
    height: none !important;
}

.logo-img >>> .v-image__image {
    width: 100px !important;
    height: 60px !important;
}

@media (max-width: 840px) {
    .navbar {
        width: 100% !important;
        left: 0px !important;
    }
    .navbar .v-image {
        height: 50px !important;
        width: 166px !important;
    }

    .small-off {
        display: none;
    }
}
@media (min-width: 841px) {
    .navbar {
        left: 0px !important;
    }
    .md-off {
        display: none;
    }
}
</style>
