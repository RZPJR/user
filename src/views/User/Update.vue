<template>
    <v-container fill-height class="main-container">
        <div class="box">
            <v-row class="mt24">
                <v-col cols="12" md="6">
                    <v-tooltip top>
                        <template v-slot:activator="{ on }">
                            <div v-on="on">
                                <v-text-field
                                    name="employee_code"
                                    v-model="form.employee_code"
                                    required
                                    outlined
                                    disabled
                                    dense
                                    :error-messages="error.employee_code"
                                >
                                <template v-slot:label>
                                    Employee Code<span style="color:red">*</span>
                                </template>
                            </v-text-field>
                            </div>
                        </template>
                       <span>Employee ID in HR System (Talenta)</span>
                    </v-tooltip>
                </v-col>
                <v-col cols="12" md="6">
                    <v-tooltip top>
                        <template v-slot:activator="{ on }">
                            <v-text-field
                                name="name"
                                v-model="form.name"
                                required
                                outlined
                                dense
                                maxlength="30"
                                :error-messages="error.name"
                                v-on="on"
                            >
                                <template v-slot:label>
                                    Name <span style="color:red">*</span>
                                </template>
                            </v-text-field>
                        </template>
                       <span>Name according to Resident Identity Card (KTP)</span>
                    </v-tooltip>
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <v-tooltip top>
                        <template v-slot:activator="{ on }">
                            <v-text-field
                                name="display_name"
                                v-model="form.display_name"
                                required
                                outlined
                                dense
                                :error-messages="error.display_name"
                                v-on="on"
                            >
                                <template v-slot:label>
                                    Display Name<span style="color:red">*</span>
                                </template>
                            </v-text-field>
                        </template>
                       <span>Name displayed on system</span>
                    </v-tooltip>
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <SelectDivision
                        name="division"
                        v-model="updateUser.division"
                        @selected="divisionSelected"
                        :error="error.division_id"
                        :division="updateUser.division"
                        disabled
                        required
                        :dense="true"
                    ></SelectDivision>
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <SelectRole
                        name="role"
                        :dense="true"
                        v-model="updateUser.role"
                        @selected="roleSelected"
                        :division_id="form.division_id"
                        :error="error.role_id"
                        :clear="clearRole"
                        :role="updateUser.role"
                        required
                    > </SelectRole>
                </v-col>
                <v-col cols="12" md="6" class="-mt24" v-if="form.role_id == 524288">
                    <SelectSalesGroup
                        v-if="form.role_id == 524288"
                        @selected="salesGroupSelected"
                        :salesgroup_id="form.sales_group_id"
                        :norequired="true"
                        :dense="true"
                        :error="error.sales_group_id"
                    ></SelectSalesGroup>
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <SelectUser
                        name="user"
                        v-model="updateUser.supervisor"
                        :user="updateUser.supervisor"
                        :clear="clearUser"
                        :norequired="true"
                        :dense="true"
                        @selected="supervisorSelected"
                    ></SelectUser>
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <SelectArea
                        name="area"
                        required
                        :error="error.area_id"
                        v-model="updateUser.area"
                        :clear="clearArea"
                        :area="updateUser.area"
                        @selected="areaSelected"
                        :dense="true"
                    ></SelectArea>
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <SelectWarehouse
                        name="warehouse"
                        required
                        :error="error.warehouse_id"
                        v-model="updateUser.warehouse"
                        :warehouse="updateUser.warehouse"
                        :area_id="form.area_id"
                        :disabled="!updateUser.area"
                        @selected="warehouseSelected"
                        :clear="clearWarehouse"
                        :dense="true"
                    ></SelectWarehouse>
                </v-col>
                <v-col cols="12" md="12" class="-mt24">
                    <v-textarea
                        name="note"
                        v-model="form.note"
                        :counter="100"
                        maxlength="100"
                        outlined
                        rows="3"
                    >
                        <template v-slot:label>
                            Note
                        </template>
                    </v-textarea>
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <v-text-field
                        name="phone_number"
                        v-model="form.phone_number"
                        required
                        outlined
                        dense
                        :error-messages="error.phone_number"
                        onkeypress='return event.charCode >= 48 && event.charCode <= 57'
                        maxlength="15"
                    >
                        <template v-slot:label>
                            Phone Number<span style="color:red">*</span>
                        </template>
                    </v-text-field>
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <v-tooltip top>
                        <template v-slot:activator="{ on }">
                            <div v-on="on">
                               <v-text-field
                                    name="email"
                                    v-model="form.email"
                                    label="Email*"
                                    required
                                    outlined
                                    dense
                                    :error-messages="error.email"
                                    v-on="on"
                                    disabled
                                ></v-text-field>
                            </div>
                        </template>
                        <span>Email Company</span>
                    </v-tooltip>
                </v-col>
            </v-row>
        </div>
        <div class="box-end">
            <v-row class="-ma16">
                <v-col>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                            @click="$router.go(-1)"
                            depressed
                            outlined
                            color="#EBEBEB"
                            class="main-btn"
                        >
                            <span class="text-black80">Cancel</span>
                        </v-btn>
                        <v-btn
                            depressed
                            color="#50ABA3"
                            class="main-btn white--text"
                            @click="confirmButton()"
                            v-privilege="'usr_upd'"
                        >
                            Save
                        </v-btn>
                    </v-card-actions>
                </v-col>
            </v-row>
        </div>
        <ConfirmationDialogNew :sendData="ConfirmData"/>
    </v-container>
</template>

<script>
    import Vue from 'vue'
    import { mapState, mapActions, mapMutations } from "vuex";

    export default {
        name: "UserUpdate",
        data () {
            return {
                ConfirmData:[],
                clearWarehouse:false,
                clearRole:false,
                clearSalesGroup:false,
                clearArea:false,
                clearUser:false,
                passwordRules: [
                    v => !!v || 'Password is required',
                    v => (v && v.length >= 8) || 'Password at least 8 characters',
                ],
                confirmPasswordRules: [
                    (value) => !!value || 'Confirm password is required',
                    (value) =>
                        value === this.form.password || 'The password confirmation does not match.',
                ],
                putData:{},
                error:{}
            }
        },
        computed: {
            ...mapState({
                updateUser: state => state.user.updateUser,
                form: state => state.user.updateUser.form,
            }),
        },
        methods:{
            ...mapActions([
                "fetchUpdateUserDetail",
                "setRoleUpdateUser",
                "setAreaUpdateUser",
                "setSupervisorUpdateUser",
                "setSalesGroupUpdateUser",
                "setWarehouseUpdateUser",
            ]),
            ...mapMutations([
                "setDivisionUpdateUser",
                "setRoleUpdateUser",
            ]),
            confirmButton() {
                this.putData.name = this.form.name
                this.putData.display_name = this.form.display_name
                this.putData.division_id = this.form.division_id
                this.putData.supervisor_id = this.form.supervisor_id
                this.putData.role_id = this.form.role_id
                if(this.form.sales_group_id){
                    this.putData.sales_group_id = this.form.sales_group_id
                }
                if(this.form.supervisor_id){
                    this.putData.supervisor_id = this.form.supervisor_id
                }
                this.putData.area_id = this.form.area_id
                this.putData.note = this.form.note
                this.putData.warehouse_id = this.form.warehouse_id
                this.putData.phone_number = this.form.phone_number

                this.ConfirmData = {
                    model : true,
                    title : "Update User",
                    text : "Are you sure want to Update this user?",
                    urlApi : '/user/'+ this.form.idUser,
                    nextPage : '/user/user',
                    data : this.putData
                }
            },
            divisionSelected(d) {
                this.$store.commit('setDivisionUpdateUser', null)
                this.$store.commit('setRoleUpdateUser', null)
                this.clearRole = true;
                if (d !== '' && d !== undefined) {
                    this.$store.commit('setDivisionUpdateUser', d)
                    this.clearRole = false
                }
            },
            roleSelected(d) {
                this.$store.commit('setRoleUpdateUser', null)
                this.$store.commit('setAreaUpdateUser', null)
                this.$store.commit('setSupervisorUpdateUser', null)
                this.$store.commit('setSalesGroupUpdateUser', '')
                this.form.warehouse_id = '';
                this.clearUser = true
                this.clearArea = true
                this.clearWarehouse = true
                if (d !== ''  && d !== undefined) {
                    this.$store.commit('setRoleUpdateUser', d)
                    this.clearUser = false
                    this.clearArea = false
                    this.clearWarehouse = false
                }
            },
            salesGroupSelected(d, setval) {
                this.$store.commit('setSalesGroupUpdateUser', '')
                this.$store.commit('setAreaUpdateUser', null)
                this.$store.commit('setSupervisorUpdateUser', null)
                this.$store.commit('setWarehouseUpdateUser', null)
                this.clearUser = true
                this.clearArea = true
                if(d){
                    this.clearUser = false
                    this.clearArea = false
                    this.$store.commit('setSalesGroupUpdateUser', d.id)
                    if(setval == 1){
                        setval == 2
                    }else{
                        Vue.nextTick(() => {
                            this.supervisorSelected(d.sls_man)
                            this.areaSelected(d.area)
                        });
                    }
                    
                }
            },
            supervisorSelected(d) {
                this.$store.commit('setSupervisorUpdateUser', null)
                if (d !== ''  && d !== undefined) {
                    this.$store.commit('setSupervisorUpdateUser', d)
                }
            },
            areaSelected(d) {
                this.$store.commit('setAreaUpdateUser', null)
                this.$store.commit('setWarehouseUpdateUser', null)
                this.clearWarehouse = true
                if (d) {
                    this.$store.commit('setAreaUpdateUser', d)
                    this.clearWarehouse = false
                }
            },
            warehouseSelected(d) {
                this.$store.commit('setWarehouseUpdateUser', null)
                if (d !== ''  && d !== undefined) {
                    this.$store.commit('setWarehouseUpdateUser', d)
                }
            },
        },
        async created(){
            await this.fetchUpdateUserDetail({id: this.$route.params.id})
        },
        mounted () {
            let self = this
            this.$root.$on('event_success', function(res){
                if (res) {
                    self.fetchUpdateUserDetail({id: this.$route.params.id})
                }
            });
            this.$root.$on('event_error', function(err){
                self.error = err
            });
        },
        watch: {
            'form.phone_number':{
                handler: function (val) {
                    let that = this
                    that.form.phone_number = val.replace(/^0+/, '')
                },
                deep: true
            },
            'form.sales_group_id':{
                handler: function (val) {
                    if(val == ''){
                        this.clearUser = true
                        this.clearArea = true
                        this.clearWarehouse = true
                    }else{
                        this.clearUser = false
                        this.clearArea = false
                        this.clearWarehouse = false
                    }
                },
                deep: true
            },
        },
    }
</script>
