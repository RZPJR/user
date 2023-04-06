<template>
    <v-container fill-height class="main-container">
        <div class="box-start">
            <v-row class="-mb38">
                <v-col cols="12" md="4">
                    <v-tooltip bottom>
                        <template v-slot:activator="{ on: tooltip }">
                            <v-text-field
                                data-unq="user-input-search"
                                dense
                                v-model="role_list.search"
                                outlined
                                filled
                                placeholder="Search..."
                                v-on="{ ...tooltip }"
                                prepend-inner-icon="search"
                            ></v-text-field>
                        </template>
                        <span>Search by code or name</span>
                    </v-tooltip>
                </v-col>
            </v-row>
            <v-row class="hr-title"/>
            <v-row :class="role_list.showFilter?'mb24':''">
                <v-col>
                    Filter 
                    <v-btn 
                        data-unq="user-button-filterExpandLess"
                        depressed
                        x-small
                        @click="role_list.showFilter = !role_list.showFilter"
                        v-if="role_list.showFilter"
                        class="no-caps fs12"
                    >Hide<v-icon right>expand_less</v-icon></v-btn>
                    <v-btn 
                        data-unq="user-button-filterExpandMore"
                        depressed
                        x-small
                        @click="role_list.showFilter = !role_list.showFilter"
                        v-else
                        class="no-caps fs12"
                    >Show<v-icon right>expand_more</v-icon></v-btn>
                </v-col>
            </v-row>
            <v-row v-if="role_list.showFilter">
                <v-col cols="12" md="3">
                    <SelectStatus
                        data-unq="role-select-status"
                        :default="1"
                        v-model="role_list.status"
                        @selected="statusSelected"
                        :dense="true"
                    ></SelectStatus>
                </v-col>
                <v-col cols="12" md="3">
                    <SelectDivision
                        data-unq="user-select-division"
                        :norequired="true"
                        @selected="divisionSelected"
                        :dense="true"
                    ></SelectDivision>
                </v-col>
            </v-row>
        </div>
        <div class="box-title">
            <v-row >
                <v-col class="flex-align-end">
                    <v-btn
                        data-unq="user-button-createRole"
                        depressed
                        color="#50ABA3"
                        :to="{ name: 'RoleCreate' }"
                        class="no-caps bold"
                        v-privilege="'rol_crt'"
                    >
                        <span class="text-white">
                            Create Role
                        </span>
                    </v-btn>
                </v-col>
            </v-row>
        </div>
        <div class="box-body-table">
            <v-data-table
                :headers="role_list.table.fields"
                :items="role_list.items"
                :loading="role_list.isLoading"
                :items-per-page="10"
                :mobile-breakpoint="0"
            >
                <template v-slot:item="props">
                    <tr style="height:48px">
                        <td :data-unq="`role-value-code-${props.index}`">
                            {{ props.item.code ?  props.item.code : '-' }}
                            <br>
                            <label class="text-black40" :data-unq="`role-value-name-${props.index}`">
                                {{ props.item.name ?  props.item.name : '-' }}
                            </label>
                        </td>
                        <td :data-unq="`role-value-divisionName-${props.index}`">
                            {{ props.item.division.name ?  props.item.division.name : '-' }}
                        </td>
                        <td :data-unq="`role-value-note-${props.index}`">
                            {{ props.item.note ?  props.item.note : '-' }}
                        </td>
                        <td>
                            <div v-if="props.item.status == 1">
                                <v-chip 
                                    :data-unq="`role-value-status-${props.index}`"
                                    :color="statusMaster('active')"
                                ><span class="pa-md-2">Active</span></v-chip>
                            </div>
                            <div v-if="props.item.status == 2">
                                <v-chip
                                    :data-unq="`role-value-status-${props.index}`"
                                    :color="statusMaster('archived')"
                                >Archived</v-chip>
                            </div>
                        </td>
                        <td>
                            <v-menu>
                                <template v-slot:activator="{ on: menu }">
                                    <template >
                                        <v-btn
                                            :data-unq="`role-button-actionButton-${props.index}`"
                                            icon
                                            v-on="{ ...menu }"
                                        >  
                                            <v-icon dark>more_vert</v-icon>
                                        </v-btn>
                                    </template>
                                </template>
                                <v-list class="bg-white">
                                    <v-list-item 
                                        :data-unq="`role-button-detailRole-${props.index}`"
                                        v-privilege="'rol_rdd'"
                                        :to="{ name: 'RoleDetail', params: { id: props.item.id } }"
                                    >
                                        <v-list-item-content>
                                            <v-list-item-title>Detail</v-list-item-title>
                                        </v-list-item-content>
                                        <v-list-item-icon>
                                            <v-icon>open_in_new</v-icon>
                                        </v-list-item-icon>
                                    </v-list-item>
                                    <v-list-item 
                                        :data-unq="`role-button-updateRole-${props.index}`"
                                        v-privilege="'rol_upd'"
                                        :to="{ name: 'RoleUpdate', params: { id: props.item.id } }"
                                        v-if="props.item.status == 1"
                                    >
                                        <v-list-item-content>
                                            <v-list-item-title>Update</v-list-item-title>
                                        </v-list-item-content>
                                        <v-list-item-icon>
                                            <v-icon>open_in_new</v-icon>
                                        </v-list-item-icon>
                                    </v-list-item>
                                    <div>
                                        <hr/>
                                    </div>
                                    <v-list-item 
                                        :data-unq="`role-button-archiveRole-${props.index}`"
                                        @click="changeStatus(props.item.status,props.item.id)"
                                        v-if="props.item.status=='1'"
                                        v-privilege="'rol_arc'"
                                    >
                                        <v-list-item-content>
                                            <v-list-item-title>Archive</v-list-item-title>
                                        </v-list-item-content>
                                    </v-list-item>
                                    <v-list-item 
                                        :data-unq="`role-button-unarchiveRole-${props.index}`"
                                        @click="changeStatus(props.item.status,props.item.id)"
                                        v-else
                                        v-privilege="'rol_urc'"
                                    >
                                        <v-list-item-content>
                                            <v-list-item-title>Unarchive</v-list-item-title>
                                        </v-list-item-content>
                                    </v-list-item>
                                    <router-view></router-view>
                                </v-list>
                            </v-menu>
                        </td>
                    </tr>
                </template>
            </v-data-table>
        </div>
        <ConfirmationDialogNew :sendData="role_list.ConfirmData"/>
    </v-container>
</template>
<script>
    import { mapState, mapActions, mapMutations } from "vuex";
    export default {
        name: "RoleList",
        data() {
            return {
            }
        },
        created() {
            this.fetchRoleList()
        },
        mounted() {
            let self = this
            this.$root.$on('event_success', function(res){
                if (res) {
                    self.fetchRoleList()
                }
            });
        },
        computed: {
            ...mapState({
                role_list: state => state.role.role_list,
            }),
        },
        methods: {
            ...mapActions([
                "fetchRoleList"
            ]),
            ...mapMutations([
                'setFilterDivisionRoleList',
            ]),
            changeStatus(val,id) {
                if (val=='1') {
                    this.role_list.ConfirmData = {
                        model : true,
                        status : true,
                        title : "Archive",
                        statusMsg : "Success to Archive this Role",
                        text : "Are you sure want to Archive this Role?",
                        urlApi : '/account/v1/role/archive/'+id,
                        data : {}
                    }
                } else {
                    this.role_list.ConfirmData = {
                        model : true,
                        status : true,
                        title : "Unarchive",
                        statusMsg : "Success to Unarchive this Role",
                        text : "Are you sure want to Unarchive this Role?",
                        urlApi : '/account/v1/role/unarchive/'+id,
                        data : {}
                    }
                }
            },
            statusSelected(d) {
                this.$store.commit('setFilterStatusRoleList', '')
                if (d) {
                    this.$store.commit('setFilterStatusRoleList', d.value)
                }
                this.fetchRoleList()
            },
            divisionSelected(d) {
                this.$store.commit('setFilterDivisionRoleList', '')
                if(d){
                    this.$store.commit('setFilterDivisionRoleList', d.id)
                }
                this.fetchRoleList()
            },
        },
        watch: {
            'role_list.search': {
                handler: function (val) {
                    let that = this
                    clearTimeout(this._timerId)
                    this._timerId = setTimeout(function(){
                        that.fetchRoleList()
                    }, 1000);
                },
                deep: true
            }
        },
    }
</script>
