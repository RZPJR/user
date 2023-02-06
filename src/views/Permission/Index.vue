<template>
    <v-container fill-height class="main-container">
        <div class="box-start">
            <v-row>
                <v-col cols="12" md="4" class="h70">
                    <v-tooltip bottom>
                        <template v-slot:activator="{ on: tooltip }">
                            <v-text-field
                                data-unq="permission-input-search"
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
        </div>
        <div class="box-table">
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
        name: "Permission",
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