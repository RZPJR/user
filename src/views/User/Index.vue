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
                                v-model="user_list.filter.search"
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
            <v-row :class="show_filter?'mb24':''">
                <v-col>
                    Filter 
                    <v-btn 
                        data-unq="user-button-filterExpandLess"
                        depressed
                        x-small
                        @click="show_filter = !show_filter"
                        v-if="show_filter"
                        class="no-caps fs12"
                    >Hide<v-icon right>expand_less</v-icon></v-btn>
                    <v-btn 
                        data-unq="user-button-filterExpandMore"
                        depressed
                        x-small
                        @click="show_filter = !show_filter"
                        v-else
                        class="no-caps fs12"
                    >Show<v-icon right>expand_more</v-icon></v-btn>
                </v-col>
            </v-row>
            <v-row v-if="show_filter">
                <v-col cols="12" md="3" class="-mt24">
                    <v-select
                        data-unq="user-select-status"
                        v-model="user_list.filter.status"
                        :items="status"
                        item-text="text"
                        item-value="value"
                        outlined
                        dense
                    ></v-select>
                </v-col>
                <v-col cols="12" md="3" class="-mt24">
                   <SelectArea
                        data-unq="user-select-region"
                        :label="'Region'"
                        :disabled="true"
                        :norequired="true"
                        :dense="true"
                   ></SelectArea>
                </v-col>
                <v-col cols="12" md="3" class="-mt24">
                    <SelectWarehouse
                        data-unq="user-select-warehouse"
                        :label="'Site'"
                        :disabled="true"
                        :norequired="true"
                        :dense="true"
                    ></SelectWarehouse>
                </v-col>
                <v-col cols="12" md="3" class="-mt24">
                    <SelectDivision
                        data-unq="user-select-division"
                        :no_required="true"
                        v-model="user_list.filter.division"
                        @selected="divisionSelected"
                        :dense="true"
                    ></SelectDivision>
                </v-col>
                <v-col cols="12" md="3" class="-mt24">
                    <SelectRole
                        data-unq="user-select-role"
                        :no_required="true"
                        v-model="user_list.filter.role"
                        @selected="roleSelected"
                        :division_id="user_list.filter.division ? user_list.filter.division.id : ''"
                        :disabled="disabled_role"
                        :clear="clear_role"
                        :dense="true"
                    > </SelectRole>
                </v-col>
            </v-row>
        </div>
        <div class="box-title">
            <v-row>
                <v-col class="flex-align-end">
                    <v-btn
                        data-unq="user-button-createUser"
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
                :headers="user_list.table_headers"
                :items="user_list.data"
                :loading="user_list.is_loading"
                :items-per-page="10"
                :mobile-breakpoint="0"
            >
                <template v-slot:item="props">
                    <tr style="height:48px">
                        <td>
                            {{ props.item.employee_code ? props.item.employee_code : '-' }}
                            <br>
                            <label class="text-black40">
                                {{ props.item.nickname ? props.item.nickname : '-'}}
                            </label>
                        </td>
                        <td>
                            {{ props.item.name ? props.item.name : '-'}}
                        </td>
                        <td>
                            {{ props.item.main_role ? (props.item.main_role.name ? props.item.main_role.name : '-') : '-' }}
                            <br><label class="text-black40">
                                {{ props.item.main_role ? 
                                    (props.item.main_role.division.code && props.item.main_role.division.name ? props.item.main_role.division.code - props.item.main_role.division.name : '-')
                                    : '-' 
                                }}
                            </label>
                        </td>
                        <td>
                            {{ props.item.region ? (props.item.region.name ? props.item.region.name : '-') : '-' }}
                        </td>
                        <td>
                            <div v-if="props.item.status == 1">
                                <v-chip
                                    :color="statusMaster('active')"
                                    :data-unq="`user-label-status-${props.index}`"
                                ><span class="pa-md-2">Active</span></v-chip>
                            </div>
                            <div v-if="props.item.status == 2">
                                <v-chip
                                    :color="statusMaster('archived')"
                                    :data-unq="`user-label-status-${props.index}`"
                                >Archived</v-chip>
                            </div>
                        </td>
                        <td>
                            <v-menu>
                                <template v-slot:activator="{ on: menu }">
                                    <template >
                                        <v-btn
                                            :data-unq="`user-button-actionButton-${props.index}`"
                                            icon
                                            v-on="{ ...menu }"
                                        >  
                                            <v-icon dark>more_vert</v-icon>
                                        </v-btn>
                                    </template>
                                </template>
                                <v-list class="bg-white">
                                    <v-list-item 
                                        :data-unq="`user-button-detailUser-${props.index}`"
                                        v-privilege="'usr_rdd'"
                                        :to="{ name: 'UserDetail', params: { id: props.item.id } }"
                                    >
                                        <v-list-item-content>
                                            <v-list-item-title>Detail</v-list-item-title>
                                        </v-list-item-content>
                                        <v-list-item-icon>
                                            <v-icon>open_in_new</v-icon>
                                        </v-list-item-icon>
                                    </v-list-item>
                                    <v-list-item 
                                        :data-unq="`user-button-updateUser-${props.index}`"
                                        v-privilege="'usr_upd'" 
                                        :to="{ name: 'UserUpdate', params: { id: props.item.id } }"
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
                                        :data-unq="`user-button-archiveUser-${props.index}`"
                                        @click="changeStatus(props.item.status, props.item.id)"
                                        v-if="props.item.status=='1'"
                                        v-privilege="'usr_arc'"
                                    >
                                        <v-list-item-content>
                                            <v-list-item-title>Archive</v-list-item-title>
                                        </v-list-item-content>
                                    </v-list-item>
                                    <v-list-item 
                                        :data-unq="`user-button-unarchiveUser-${props.index}`"
                                        @click="changeStatus(props.item.status, props.item.id)"
                                        v-else
                                        v-privilege="'usr_urc'"
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
        <ConfirmationDialogNew :sendData="confirm_data"/>
    </v-container>
</template>
<script>
    import { mapState, mapActions, mapMutations } from "vuex";
    export default {
        name: "User",
        data() {
            return {
                show_filter : false,
                disabled_warehouse:true,
                clear_warehouse:false,
                disabled_role:true,
                clear_role:false,
                confirm_data : {},
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
                user_list: state => state.user.user_list,
            }),
        },
        methods: {
            ...mapActions([
                "fetchUserList"
            ]),
            ...mapMutations([
                "setRoleFilterUserList",
            ]),
            changeStatus(val,id) {
                if (val=='1') {
                    this.confirm_data = {
                        model : true,
                        status : true,
                        title : "Archive",
                        statusMsg : "Success to Archive this User",
                        text : "Are you sure want to Archive this User?",
                        urlApi : '/account/v1/user/archive/'+id,
                        nextPage : "/user/user/detail/"+id,
                        data : {}
                    }

                } else {
                    this.confirm_data = {
                        model : true,
                        status : true,
                        title : "Unarchive",
                        statusMsg : "Success to Archive this User",
                        text : "Are you sure want to Unarchive this User?",
                        urlApi : '/account/v1/user/unarchive/'+id,
                        nextPage : "/user/user/detail/"+id,
                        data : {}
                    }
                }
            },
            divisionSelected(d) {
                this.user_list.filter.division = ''
                this.disabled_role = true;
                if(d){
                    this.user_list.filter.division = d
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
            'user_list.filter.search': {
                handler: function (val) {
                    let that = this
                    clearTimeout(this._timerId)
                    this._timerId = setTimeout(function(){
                        that.fetchUserList()
                    }, 1000);
                },
                deep: true
            },
            'user_list.filter.status': {
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
