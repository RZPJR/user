<template>
    <v-container fill-height class="main-container">
        <div class="box-start">
            <v-row>
                <v-col cols="12" md="4" class="h70">
                    <v-tooltip bottom>
                        <template v-slot:activator="{ on: tooltip }">
                            <v-text-field
                                dense
                                v-model="permissionList.search"
                                outlined
                                filled
                                placeholder="Search..."
                                prepend-inner-icon="search"
                                v-privilege="'filter_rdl'"
                                v-on="{ ...tooltip }"
                            >
                            </v-text-field>
                        </template>
                       <span>Search by name</span>
                    </v-tooltip>
                </v-col>
            </v-row>
            <v-row class="hr-title"/>
            <v-row :class="showFilter?'mb24':''">
                <v-col>
                    Filter 
                    <v-btn 
                        depressed
                        x-small
                        @click="showFilter = !showFilter"
                        v-if="showFilter"
                        class="no-caps fs12"
                    >Hide<v-icon right>expand_less</v-icon></v-btn>
                    <v-btn 
                        depressed
                        x-small
                        @click="showFilter = !showFilter"
                        v-else
                        class="no-caps fs12"
                    >Show<v-icon right>expand_more</v-icon></v-btn>
                </v-col>
            </v-row>
            <v-row v-if="showFilter">
                <v-col cols="12" md="3" class="-mt24">
                    <SelectStatus
                        :default="1"
                        v-model="permissionList.status"
                        @selected="statusSelected"
                        v-privilege="'filter_rdl'"
                        :dense="true"
                    ></SelectStatus>
                </v-col>
            </v-row>
        </div>
        <div class="box-body-table">
            <v-data-table
                :mobile-breakpoint="0"
                :headers="permissionList.tableHeaders"
                :items="permissionList.data"
                :loading="permissionList.isLoading"
                :items-per-page="10"
            >
                <template v-slot:item="props">
                    <tr style="height:48px">
                        <td>{{ props.item.name }}</td>
                        <td>{{ props.item.value }}</td>
                        <td>
                            <div v-if="props.item.status == 1">
                                <v-chip
                                    :color="statusMaster('active')"
                                ><span class="pa-md-2">Active</span></v-chip>
                            </div>
                            <div v-if="props.item.status == 2">
                                <v-chip
                                    :color="statusMaster('archived')"
                                >Archived</v-chip>
                            </div>
                        </td>
                    </tr>
                </template>
            </v-data-table>
        </div>
    </v-container>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
    export default {
        name: "Division",
        data() {
            return {
                showFilter : false,
            }
        },
        created(){
            this.fetchPermissionList()
        },
        computed: {
            ...mapState({
                permissionList: state => state.permission.permissionList,
            }),
        },
        methods: {
            ...mapActions([
                "fetchPermissionList"
            ]),
            ...mapMutations([
                "setStatusFilterUserList",
            ]),
            statusSelected(d) {
                this.$store.commit('setStatusFilterUserList', null)
                if (d !== ''  && d !== undefined) {
                    this.$store.commit('setStatusFilterUserList', d.value)
                }
            },
        },
        watch: {
            'permissionList.search': {
                handler: function (val) {
                    let that = this
                    clearTimeout(this._timerId)
                    this._timerId = setTimeout(function(){ 
                        that.fetchPermissionList()
                    }, 1000);
                },
                deep: true
            },
            'permissionList.status': {
                handler: function (val) {
                    let that = this
                    that.fetchPermissionList()
                },
                deep: true
            },
        },
    }
</script>