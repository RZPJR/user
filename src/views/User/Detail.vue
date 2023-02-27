<template>
    <v-container fill-height class="main-container">
        <div class="box-start">
            <v-row class="mb24">
                <v-col class="fs24">
                    <span class="bold">{{user.name}}</span> ({{user.nickname}})
                </v-col>
                <v-col class="d-flex justify-end align-end">
                    <div v-if="user.status === 1">
                        <v-btn
                            elevation="0"
                            rounded
                            small
                            class="no-caps mb4"
                            :color="statusMaster('active')"
                        >Active</v-btn>
                    </div>
                    <div v-else-if="user.status === 2">
                        <v-btn
                            elevation="0"
                            rounded
                            small
                            class="no-caps mb4"
                            :color="statusMaster('archived')"
                        >Archived</v-btn>
                    </div>
                    <v-menu offset-y>
                        <template v-slot:activator="{ on }">
                            <v-btn 
                                data-unq="user-button-actionButton"
                                icon
                                v-on="on"
                            >
                                <v-icon>more_vert</v-icon>
                            </v-btn>
                        </template>
                        <v-list class="bg-white">
                            <v-list-item 
                                data-unq="user-button-updateUser"
                                v-privilege="'usr_upd'"
                                v-if="user.status === 1"
                                :to="{ name: 'UserUpdate'}"
                            >
                                <v-list-item-content>
                                    <v-list-item-title>Update</v-list-item-title>
                                </v-list-item-content>
                                <v-list-item-icon>
                                    <v-icon>open_in_new</v-icon>
                                </v-list-item-icon>
                            </v-list-item>
                            <v-list-item 
                                data-unq="user-button-resetPassword"
                                :to="{ name: 'UserResetPassword', params: { id_user: user.id }}"
                                v-privilege="'usr_rst_pass'"
                            >
                                <v-list-item-content>
                                    <v-list-item-title>Reset Password</v-list-item-title>
                                </v-list-item-content>
                                <v-list-item-icon>
                                    <v-icon>open_in_new</v-icon>
                                </v-list-item-icon>
                            </v-list-item>
                            <div>
                                <hr/>
                            </div>
                            <v-list-item 
                                data-unq="user-button-archiveUser"
                                v-privilege="'usr_arc'"
                                v-if="user.status===1"
                                @click="archive(user.id)"
                            >
                                <v-list-item-content>
                                    <v-list-item-title>Archive</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                            <v-list-item 
                                data-unq="user-button-unarchiveUser"
                                v-privilege="'usr_urc'"
                                v-if="user.status===2"
                                @click="unarchive(user.id)"
                            >
                                <v-list-item-content>
                                    <v-list-item-title>Unarchive</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                            <v-list-item 
                                data-unq="user-button-history"
                                @click="seeHistory()"
                            >
                                <v-list-item-content>
                                    <v-list-item-title>History</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" md="6" class="mt24">
                    <DetailRowNew :name="'Employee Code'" :value="user.employee_code" />
                </v-col>
                <v-col cols="12" md="6" class="mt24">
                    <DetailRowNew :name="'Division'" :value="user.division" />
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :name="'Role'" :value="user.main_role" />
                </v-col>  
                <v-col cols="12" md="6" class="-mt24" v-if="user.role_id === 8">
                    <DetailRowNew :name="'Territory'" :value="user.territory" />
                </v-col>              
                <v-col cols="12" class="-mt24">
                    <DetailRowNew :name="'Sub Role'" :value="showSubRoles(user.sub_roles)"  :align="true" />
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :name="'Region'" :value="user.region" />
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :name="'Site'" :value="user.site" />
                </v-col>
                <v-col cols="12" md="12">
                    <DetailRowNew :name="'Note'" :value="user.note" :align="true"/>
                </v-col>
            </v-row>
        </div>
        <div class="box-title fs16 bold">
            Contact
        </div>
        <div class="box-body">
            <v-row>
                <v-col cols="12" md="6">
                    <DetailRowNew :name="'Phone Number'" :value="user.phone_number" />
                </v-col>
                <v-col cols="12" md="6">
                    <DetailRowNew :name="'Email'" :value="user.email" />
                </v-col>
            </v-row>
        </div>
        <ConfirmationDialogNew :sendData="confirm_data"/>
        <AuditLogNew :data="data_audit_log"/>
        <LoadingBar :value="user_detail.is_loading" />
    </v-container>
</template>
<script>
    import { mapState, mapActions, mapMutations } from "vuex";
    export default {
        name: "UserDetail",
        data() {
            return {
                data_audit_log : {},
                confirm_data : {},
            }
        },
        async created(){
            await this.fetchUserDetail({id: this.$route.params.id})
            let self = this
            this.$root.$on('event_success', function(res){
                if (res && self.$route.params.id !== undefined) {
                    self.fetchUserDetail({id: self.$route.params.id})
                }
            });
        },
        computed: {
            ...mapState({
                user_detail: state => state.user.user_detail,
                user: state => state.user.user_detail.user,
            })
        },
        methods:{
            ...mapActions([
                "fetchUserDetail",
            ]),
            capitalizeFirstLetter(d) { // handle untuk data tampungan Capitalize First Letter
                return d ? d[0].toUpperCase() + d.slice(1) : "";
            },            
            showSubRoles(items) {
                let sub_roles = '-'
                if (items !== undefined && items.length > 0) {
                    sub_roles = ''
                    if (items.length > 0){
                        items.map((item, idx) => {
                            sub_roles += (item.name + (idx !== (items.length-1) ? ', ' : ''))
                        })
                    }
                }
                return sub_roles
            },
            archive(id) {
                this.confirm_data = {
                    model : true,
                    status : true,
                    statusMsg : "Success to Archive this User",
                    title : "Archive User",
                    text : "Are you sure want to Archive this User?",
                    urlApi : "/account/v1/user/archive/"+id,
                    data : {}
                }
            },
            unarchive(id) {
                this.confirm_data = {
                    model : true,
                    status : true,
                    statusMsg : "Success to Unarchive this User",
                    title : "Unarchive User",
                    text : "Are you sure want to Unarchive this User?",
                    urlApi : "/account/v1/user/unarchive/"+id,
                    data : {}
                }
            },
            deleteUser(id) {
                this.confirm_data = {
                    model : true,
                    status : true,
                    statusMsg : "Success to Delete this User",
                    title : "Delete User",
                    text : "Are you sure want to delete this User?",
                    urlApi : "/account/v1/user/delete/"+id,
                    nextPage : "/user/user",
                    cancelNote : "Note",
                    noDisable : true,
                    data : {}
                }
            },
            seeHistory() {
                this.data_audit_log = {
                    model : true,
                    id: this.user.id,
                    type: "user"
                }
            },
        },
    }
</script>
