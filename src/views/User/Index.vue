<template>
    <v-container fill-height class="main-container">
        <div class="box-start">
            <v-row class="-mb38">
                <v-col cols="12" md="4">
                    <v-tooltip bottom>
                        <template v-slot:activator="{ on: tooltip }">
                            <v-text-field
                                dense
                                v-model="userList.filter.search"
                                outlined
                                filled
                                placeholder="Search..."
                                v-on="{ ...tooltip }"
                                prepend-inner-icon="search"
                            ></v-text-field>
                        </template>
                        <span>Search by code and name</span>
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
                    <v-select
                        v-model="userList.filter.status"
                        :items="status"
                        item-text="text"
                        item-value="value"
                        outlined
                        dense
                    ></v-select>
                </v-col>
                <v-col cols="12" md="3" class="-mt24">
                   <SelectArea
                        v-model="userList.filter.area"
                        :norequired="true"
                        @selected="areaSelected"
                        :aux_data="2"
                        :dense="true"
                   ></SelectArea>
                </v-col>
                <v-col cols="12" md="3" class="-mt24">
                    <SelectWarehouse
                        v-model="userList.filter.warehouse"
                        :norequired="true"
                        @selected="warehouseSelected"
                        :area_id="userList.filter.area ? userList.filter.area.id : ''"
                        :disabled="disabled_warehouse"
                        :clear="clearWarehouse"
                        :dense="true"
                    ></SelectWarehouse>
                </v-col>
                <v-col cols="12" md="3" class="-mt24">
                    <SelectDivision
                        :norequired="true"
                        v-model="userList.filter.division"
                        @selected="divisionSelected"
                        :dense="true"
                    ></SelectDivision>
                </v-col>
                <v-col cols="12" md="3" class="-mt24">
                    <SelectRole
                        :norequired="true"
                        v-model="userList.filter.role"
                        @selected="roleSelected"
                        :division_id="userList.filter.division ? userList.filter.division.id : ''"
                        :disabled="disabled_role"
                        :clear="clearRole"
                        :dense="true"
                    > </SelectRole>
                </v-col>
            </v-row>
        </div>
        <div class="box-title">
            <v-row>
                <v-col class="flex-align-end">
                    <v-btn
                        depressed
                        color="#50ABA3"
                        :to="{ name: 'UserCreate' }"
                        class="no-caps bold"
                        v-privilege="'usr_crt'"
                    >
                        <span class="text-white">
                            Create User
                        </span>
                    </v-btn>
                </v-col>
            </v-row>
        </div>
        <div class="box-body-table">
            <v-data-table
                :headers="userList.tableHeaders"
                :items="userList.data"
                :loading="userList.isLoading"
                :items-per-page="10"
                :mobile-breakpoint="0"
            >
                <template v-slot:item="props">
                    <tr style="height:48px">
                        <td>
                            {{ props.item.code }}<br>
                            <label class="text-black60">
                                {{ props.item.name }}
                            </label>
                        </td>
                        <td>{{ props.item.display_name }}<br>
                            <label class="text-black60">
                                {{ props.item.sales_group_name == undefined ? " " : props.item.sales_group_name }}
                            </label>
                        </td>
                        <td>
                            {{ props.item.role.code }}-{{ props.item.role.name }}<br>
                            <label class="text-black60">
                                {{ props.item.role.division.code }}-{{ props.item.role.division.name }}
                            </label>
                        </td>
                        <td>
                            <span v-if="props.item.area">
                                {{ props.item.area.code }}-{{ props.item.area.name }}
                            </span>
                            <span v-else>-</span><br>
                            <label class="text-black60">
                                {{ props.item.warehouse.code }}-{{ props.item.warehouse.name }}
                            </label>
                        </td>
                        <td>
                            <v-btn
                                elevation="0"
                                rounded
                                depressed
                                small
                                class="no-caps mb4"
                                :color="statusMaster(props.item.user.status_convert)"
                            >
                                {{capitalizeFirstLetter(props.item.user.status_convert)}}
                            </v-btn>
                        </td>
                        <td>
                            <v-menu>
                                <template v-slot:activator="{ on: menu }">
                                    <template >
                                        <v-btn
                                            icon
                                            v-on="{ ...menu }"
                                        >  
                                            <v-icon dark>more_vert</v-icon>
                                        </v-btn>
                                    </template>
                                </template>
                                <v-list class="bg-white">
                                    <v-list-item v-privilege="'usr_rdd'" :to="{ name: 'UserDetail', params: { id: props.item.id } }">
                                        <v-list-item-content>
                                            <v-list-item-title>Detail</v-list-item-title>
                                        </v-list-item-content>
                                        <v-list-item-icon>
                                            <v-icon>open_in_new</v-icon>
                                        </v-list-item-icon>
                                    </v-list-item>
                                    <v-list-item v-privilege="'usr_upd'" :to="{ name: 'UserUpdate', params: { id: props.item.id } }" v-if="props.item.status == 1">
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
                                    <v-list-item @click="changeStatus(props.item.user.status,props.item.user.id,props.item.id)" v-if="props.item.status=='1'" v-privilege="'usr_arc'">
                                        <v-list-item-content>
                                            <v-list-item-title>Archive</v-list-item-title>
                                        </v-list-item-content>
                                    </v-list-item>
                                    <v-list-item @click="changeStatus(props.item.user.status,props.item.user.id,props.item.id)" v-else v-privilege="'usr_urc'">
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
        <ConfirmationDialogNew :sendData="ConfirmData"/>
    </v-container>
</template>
<script>
    import { mapState, mapActions, mapMutations } from "vuex";

    export default {
        name: "User",
        data() {
            return {
                showFilter : false,
                disabled_warehouse:true,
                clearWarehouse:false,
                disabled_role:true,
                clearRole:false,
                ConfirmData : {},
            }
        },
        created() {
            this.fetchUserList()
        },
        mounted() {
            let self = this
            this.$root.$on('event_success', function(res){
                if (res) {
                    self.fetchUserList()
                }
            });
        },
        computed: {
            ...mapState({
                userList: state => state.user.userList,
            }),
        },
        methods: {
            ...mapActions([
                "fetchUserList"
            ]),
            ...mapMutations([
                "setAreaFilterUserList",
                "setWarehouseFilterUserList",
                "setDivisionFilterUserList",
                "setRoleFilterUserList",
            ]),
            changeStatus(val,id,next) {
                if (val=='1') {
                    this.ConfirmData = {
                        model : true,
                        status : true,
                        title : "Archive",
                        statusMsg : "Success to Archive this User",
                        text : "Are you sure want to Archive this User?",
                        urlApi : '/user/archive/'+id,
                        nextPage : "/user/user/detail/"+next,
                        data : {}
                    }

                } else {
                    this.ConfirmData = {
                        model : true,
                        status : true,
                        title : "Unarchive",
                        statusMsg : "Success to Archive this User",
                        text : "Are you sure want to Unarchive this User?",
                        urlApi : '/user/unarchive/'+id,
                        nextPage : "/user/user/detail/"+next,
                        data : {}
                    }
                }
            },
            areaSelected(d){
                this.$store.commit('setAreaFilterUserList', null)
                this.disabled_warehouse = true;
                this.clearWarehouse = true
                if(d) {
                    this.$store.commit('setAreaFilterUserList', d)
                    this.warehouse = null;
                    this.$store.commit('setWarehouseFilterUserList', null)
                    this.disabled_warehouse = false;
                    this.clearWarehouse = false;
                }
                this.fetchUserList()
            },
            warehouseSelected(d) {
                this.$store.commit('setWarehouseFilterUserList', null)
                if (d) this.$store.commit('setWarehouseFilterUserList', d)
                this.fetchUserList()
            },
            divisionSelected(d) {
                this.$store.commit('setDivisionFilterUserList', null)
                this.disabled_role = true;
                if (d) {
                    this.$store.commit('setDivisionFilterUserList', d)
                    this.$store.commit('setRoleFilterUserList', null)
                    this.disabled_role = false;
                }
                this.fetchUserList()
            },
            roleSelected(d) {
                this.$store.commit('setRoleFilterUserList', null)
                if (d) {
                    this.$store.commit('setRoleFilterUserList', d)
                }
                this.fetchUserList()
            },
        },
        watch: {
            'userList.filter.search': {
                handler: function (val) {
                    let that = this
                    clearTimeout(this._timerId)
                    this._timerId = setTimeout(function(){
                        that.fetchUserList()
                    }, 1000);
                },
                deep: true
            },
            'userList.filter.status': {
                handler: function (val) {
                    if (val) {
                        this.fetchUserList()
                    }
                },
                deep: true
            },
        },
    }
</script>