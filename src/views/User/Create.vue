<template>
    <v-container fill-height class="main-container">
        <div class="box">
            <v-row class="mt24">
                <v-col cols="12" md="6">
                    <v-tooltip top>
                        <template v-slot:activator="{ on }">
                            <v-text-field
                                name="name"
                                v-model="form.name"
                                required
                                outlined
                                style=""
                                dense
                                maxlength="30"
                                :error-messages="error.name"
                                v-on="on"
                            >
                            <template v-slot:label>
                                Full Name (KTP)<span style="color:red">*</span>
                            </template>
                            </v-text-field>
                        </template>
                        <span>Name according to Resident Identity Card (KTP)</span>
                    </v-tooltip>
                </v-col>
                <v-col cols="12" md="6">
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
                    <v-tooltip top>
                        <template v-slot:activator="{ on }">
                            <v-text-field
                                name="employee_code"
                                v-model="form.employee_code"
                                required
                                outlined
                                dense
                                :error-messages="error.employee_code"
                                v-on="on"
                            >
                            <template v-slot:label>
                                Employee Code<span style="color:red">*</span>
                            </template>
                            </v-text-field>
                        </template>
                        <span>Employee ID in HR System</span>
                    </v-tooltip>
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <SelectDivision
                        name="division"
                        v-model="createUser.division"
                        @selected="divisionSelected"
                        :error="error.division_id"
                        required
                        :dense="true"
                    > </SelectDivision>
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <MultiSelectRole
                        name="role"
                        v-model="createUser.role"
                        @selected="roleSelected"
                        :division_id="form.division_id"
                        :disabled="disabled_role"
                        :error="error.role_id"
                        :clear="clearRole"
                        :dense="true"
                        required
                    > </MultiSelectRole>
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
                        <template v-slot:label>Note</template>
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
                    ><template v-slot:label>
                        Phone Number<span style="color:red">*</span>
                    </template>
                    </v-text-field>
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <v-tooltip top>
                        <template v-slot:activator="{ on }">
                            <v-text-field
                                name="email"
                                v-model="form.email"
                                required
                                outlined
                                dense
                                :rules="createUser.emailRules"
                                :error-messages="error.email"
                                v-on="on"
                            >
                                <template v-slot:label>
                                    Email<span style="color:red">*</span>
                                </template>
                            </v-text-field>
                        </template>
                        <span>Email Company</span>
                    </v-tooltip>
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <v-text-field
                        :append-icon="show_password ? 'visibility' : 'visibility_off'"
                        :type="show_password ? 'text' : 'password'"
                        @click:append="show_password = !show_password"
                        name="password"
                        v-model="form.password"
                        outlined
                        dense
                        :error-messages="error.password"
                        :rules="createUser.passwordRules"
                        maxlength="32"
                    >
                        <template v-slot:label>
                            Password<span style="color:red">*</span>
                        </template>
                    </v-text-field>
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <v-text-field
                        :append-icon="show_confirm ? 'visibility' : 'visibility_off'"
                        :type="show_confirm ? 'text' : 'password'"
                        @click:append="show_confirm = !show_confirm"
                        name="confirm_password"
                        v-model="form.confirm_password"
                        outlined
                        dense
                        :error-messages="error.confirm_password"
                        :rules="createUser.confirmPasswordRules"
                        maxlength="32"
                    >
                        <template v-slot:label>
                            Confirm Password<span style="color:red">*</span>
                        </template>
                    </v-text-field>
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
    import { mapState, mapMutations } from "vuex";

    export default {
        name: "UserCreate",
        data () {
            return {
                ConfirmData:{},
                show_password:false,
                show_confirm:false,
                disabled_role:true,
                disabled_warehouse:true,
                clearArea:false,
                clearWarehouse:false,
                clearRole:false,
                clearSalesGroup:false,
                clearUser:false,
                error:{}
            }
        },
        computed: {
            ...mapState({
                createUser: state => state.user.createUser,
                form: state => state.user.createUser.form,
            }),
        },
        methods:{
            ...mapMutations([
                "setDivisionCreateUser",
                "setRoleCreateUser",
                "setSalesGroupCreateUser",
                "setSupervisorCreateUser",
                "setAreaCreateUser",
                "setWarehouseCreateUser",
            ]),
            confirmButton() {
                this.ConfirmData = {
                    model : true,
                    title : "Create User",
                    text : "Are you sure want to create this user?",
                    urlApi : '/user',
                    nextPage : '/user/user',
                    post : true,
                    data : this.form
                }
            },
            divisionSelected(d) {
                this.$store.commit('setDivisionCreateUser', null)
                this.$store.commit('setRoleCreateUser', null)
                this.$store.commit('setSalesGroupCreateUser', '')
                this.$store.commit('setSupervisorCreateUser', null)
                this.$store.commit('setAreaCreateUser', null)
                this.disabled_role = true
                this.clearRole = true;
                this.clearUser = true
                this.clearArea = true
                if (d !== '' && d !== undefined) {
                    this.$store.commit('setDivisionCreateUser', d)
                    this.disabled_role = false
                    this.clearRole = false;
                }
            },
            roleSelected(d) {
                this.$store.commit('setRoleCreateUser', null)
                this.$store.commit('setSalesGroupCreateUser', '')
                this.$store.commit('setSupervisorCreateUser', null)
                this.$store.commit('setAreaCreateUser', null)
                if (d !== ''  && d !== undefined) {
                    this.$store.commit('setRoleCreateUser', d)
                }
            },
            areaSelected(d) {
                this.$store.commit('setAreaCreateUser', null)
                this.$store.commit('setWarehouseCreateUser', null)
                this.clearWarehouse = true
                this.disabled_warehouse = true
                if (d !== ''  && d !== undefined) {
                    this.$store.commit('setAreaCreateUser', d)
                    this.disabled_warehouse = false
                    this.clearWarehouse = false
                }
            },
            warehouseSelected(d) {
                this.$store.commit('setWarehouseCreateUser', null)
                if (d !== ''  && d !== undefined) {
                    this.$store.commit('setWarehouseCreateUser', d)
                }
            },
        },
        mounted () {
            let self = this
            this.$root.$on('event_error', function(err){
                self.error = err
            });
        },
        watch: {
            'form.phone_number': {
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
                    }else{
                        this.clearUser = false
                        this.clearArea = false
                    }
                },
                deep: true
            }
        },
    }
</script>
