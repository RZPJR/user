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
                                v-model="form.nickname"
                                required
                                outlined
                                dense
                                :error-messages="error.nickname"
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
                        v-model="update_user.division"
                        :division="update_user.division"
                        @selected="divisionSelected"
                        :error="error.division_id"
                        disabled
                        required
                        :dense="true"
                    ></SelectDivision>
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <SelectRole
                        name="role"
                        label="Main Role"
                        v-model="update_user.main_role"
                        :role="update_user.main_role"
                        @selected="mainRoleSelected"
                        :division_id="update_user.division_id"
                        :error="error.role_id"
                        :clear="clear_role"
                        :dense="true"
                        required
                    > </SelectRole>
                </v-col>
                <v-col cols="12" class="-mt24">
                    <MultiSelectRole
                        :roles="update_user.role"
                        :division_id="update_user.division_id"
                        @selected="roleSelected"
                        :label="'Main Role'"
                        :dense="true"
                        required
                    > </MultiSelectRole>
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
                clear_role:false,
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
                error:{},
                update_data: [],
            }
        },
        computed: {
            ...mapState({
                update_user: state => state.user.update_user,
                form: state => state.user.update_user.form,
            }),
        },
        methods:{
            ...mapActions([
                "fetchUpdateUserDetail",
            ]),
            ...mapMutations([
                "setDivisionUpdateUser",
                "setMainRoleUpdateUser",
                "setRoleUpdateUser",
                "setFormRoleUpdateUser",
            ]),
            confirmButton() {
                this.ConfirmData = {
                    model : true,
                    title : "Update User",
                    text : "Are you sure want to Update this user?",
                    urlApi : '/user/'+ this.form.idUser,
                    nextPage : '/user/user',
                    data : this.form
                }
            },            
            divisionSelected(d) {
                this.$store.commit('setDivisionUpdateUser', null)
                this.$store.commit('setMainRoleUpdateUser', null)
                this.$store.commit('setRoleUpdateUser', null)
                this.disabled_main_role = true
                this.clear_role = true
                this.clear_main_role = true
                if (d !== '' && d !== undefined) {
                    this.$store.commit('setDivisionUpdateUser', d)
                    this.disabled_main_role = false
                    this.clear_main_role = false
                    this.clear_role = false
                }
            },
            mainRoleSelected(d) {
                this.$store.commit('setMainRoleUpdateUser', null)
                this.$store.commit('setRoleUpdateUser', null)
                this.disabled_role = true
                if (d !== ''  && d !== undefined) {
                    this.$store.commit('setMainRoleUpdateUser', d)
                    this.disabled_role = false
                }
            },
            async roleSelected(d) {
                console.log(d);
                // this.$store.commit('setRoleUpdateUser', null)
                // if (d !== ''  && d !== undefined) {
                //     let selected_sub_roles = await d.map((e) => {
                //         return e.id
                //     })
                //     this.$store.commit('setFormRoleUpdateUser', selected_sub_roles)
                //     this.$store.commit('setRoleUpdateUser', d)
                // }
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
