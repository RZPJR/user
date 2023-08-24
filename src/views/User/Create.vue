<template>
    <v-container fill-height class="main-container">
        <div class="box">
            <v-row class="mt24">
                <v-col cols="12" md="6">
                    <v-tooltip top>
                        <template v-slot:activator="{ on }">
                            <v-text-field
                                data-unq="user-input-employeeCode"
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
                <v-col cols="12" md="6">
                    <v-tooltip top>
                        <template v-slot:activator="{ on }">
                            <v-text-field
                                data-unq="user-input-fullName"
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
                <v-col cols="12" md="6" class="-mt24">
                    <v-tooltip top>
                        <template v-slot:activator="{ on }">
                            <v-text-field
                                data-unq="user-input-displayName"
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
                        data-unq="user-select-division"
                        name="division"
                        v-model="create_user.division"
                        @selected="divisionSelected"
                        :error="error.division_id"
                        required
                        :dense="true"
                    ></SelectDivision>
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <SelectUser
                        data-unq="user-select-supervisor"
                        name="Supervisor"
                        v-model="create_user.supervisor"
                        @selected="supervisorSelected"
                        :dense="true"
                        :user="create_user.supervisor"
                        :norequired="true"
                        :clear="clearUser"
                    ></SelectUser>
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <SelectArea
                        data-unq="user-select-region"
                        name="region"
                        @selected="regionSelected"
                        :dense="true"
                        :clear="clearArea"
                        :error="error.region_id"
                    ></SelectArea>
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <SelectWarehouse
                        data-unq="user-select-site"
                        @selected="siteSelected"
                        :label="'Site'"
                        :dense="true"
                        :area_id="form.region_id"
                        :disabled="disabled_warehouse"
                        :clear="clearWarehouse"
                        :error="error.site_id"
                    ></SelectWarehouse>
                </v-col>
                <v-col cols="12" md="6" class="-mt24"></v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <SelectRole
                        data-unq="user-select-role"
                        name="role"
                        label="Main Role"
                        v-model="create_user.main_role"
                        @selected="mainRoleSelected"
                        :division_id="create_user.division_id"
                        :disabled="disabled_main_role"
                        :error="error.role_id"
                        :clear="clear_main_role"
                        :dense="true"
                        required
                    > </SelectRole>
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <SelectSalesGroup
                        data-unq="user-select-territory"
                        @selected="salesGroupSelected"
                        :class="form.main_role!=8 ? 'd-none' : ''"
                        :norequired="true"
                        :dense="true"
                        :clear="clearSalesGroup"
                        :error="error.territory_id"
                    ></SelectSalesGroup>
                </v-col>
                <v-col cols="12" class="-mt24">
                    <MultiSelectRole
                        data-unq="user-select-multiRole"
                        name="role"
                        :label="'Sub Roles'"
                        v-model="create_user.role"
                        @selected="roleSelected"
                        :division_id="create_user.division_id"
                        :main_role="form.main_role"
                        :disabled="disabled_role"
                        :error="error.sub_role"
                        :clear="clear_role"
                        :dense="true"
                        :norequired="true"
                        required
                    > </MultiSelectRole>
                </v-col>
                <v-col cols="12" md="12" class="-mt24 mb-10">
                    <v-textarea
                        data-unq="user-input-note"
                        name="note"
                        label="Note"
                        v-model="form.note"
                        :counter="100"
                        outlined
                        rows="3"
                    ></v-textarea>
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <v-text-field
                        data-unq="user-input-phoneNumber"
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
                                data-unq="user-input-email"
                                name="email"
                                v-model="form.email"
                                required
                                outlined
                                dense
                                :rules="create_user.email_rules"
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
                        data-unq="user-input-password"
                        :append-icon="show_password ? 'visibility' : 'visibility_off'"
                        :type="show_password ? 'text' : 'password'"
                        @click:append="show_password = !show_password"
                        name="password"
                        v-model="form.password"
                        outlined
                        dense
                        :error-messages="error.password"
                        :rules="create_user.password_rules"
                        maxlength="32"
                    >
                        <template v-slot:label>
                            Password<span style="color:red">*</span>
                        </template>
                    </v-text-field>
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <v-text-field
                        data-unq="user-input-passwordConfirmation"
                        :append-icon="show_confirm ? 'visibility' : 'visibility_off'"
                        :type="show_confirm ? 'text' : 'password'"
                        @click:append="show_confirm = !show_confirm"
                        name="confirm_password"
                        v-model="form.password_confirm"
                        outlined
                        dense
                        :error-messages="error.password_confirm"
                        :rules="create_user.confirm_password_rules"
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
                            data-unq="user-button-cancel"
                            @click="$router.go(-1)"
                            depressed
                            outlined
                            color="#EBEBEB"
                            class="main-btn"
                        >
                            <span class="text-black80">Cancel</span>
                        </v-btn>
                        <v-btn
                            data-unq="user-button-save"
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
        <ConfirmationDialogNew :sendData="confirm_data"/>
    </v-container>
</template>
<script>
    import { mapState, mapMutations, mapActions } from "vuex";

    export default {
        name: "UserCreate",
        data () {
            return {
                confirm_data:{},
                show_password:false,
                show_confirm:false,
                disabled_main_role: true,
                disabled_role:true,
                disabled_warehouse:true,
                clearUser:false,
                clearArea:false,
                clearWarehouse:false,
                clearSalesGroup:false,
                clear_main_role: false,
                clear_role:false,
                error:{}
            }
        },
        computed: {
            ...mapState({
                create_user: state => state.user.create_user,
                form: state => state.user.create_user.form,
            }),
        },
        created () {
            this.fetchUserCreate()
        },
        mounted () {
            let self = this
            this.$root.$on('event_error', function(err){
                self.error = err
            });
        },
        methods:{
            ...mapMutations([
                "setDivisionCreateUser",
                "setMainRoleCreateUser",
            ]),
            ...mapActions([
                "fetchUserCreate"
            ]),
            confirmButton() {
                let send_data = {}
                if(this.form.main_role == 8){
                    send_data = this.form
                }else{
                    send_data = {
                        employee_code : this.form.employee_code,
                        name : this.form.name,
                        nickname : this.form.nickname,
                        region_id : this.form.region_id,
                        site_id : this.form.site_id,
                        main_role : this.form.main_role,
                        sub_roles : this.form.sub_roles,
                        phone_number : this.form.phone_number,
                        email : this.form.email,
                        password : this.form.password,
                        password_confirm : this.form.password_confirm,
                        parent_id : this.form.parent_id,
                    }
                }
                this.confirm_data = {
                    model : true,
                    title : "Create User",
                    text : "Are you sure want to create this user?",
                    urlApi : '/account/v1/user',
                    nextPage : '/user/user',
                    post : true,
                    data : send_data
                }
            },
            divisionSelected(d) {
                this.$store.commit('setDivisionCreateUser', null)
                this.$store.commit('setMainRoleCreateUser', null)
                this.create_user.form.sub_roles = null
                this.form.region_id = '';
                this.disabled_main_role = true
                this.clear_role = true
                this.clear_main_role = true
                this.clearArea = true
                if (d !== '' && d !== undefined) {
                    this.$store.commit('setDivisionCreateUser', d)
                    this.disabled_main_role = false
                    this.clear_main_role = false
                    this.clear_role = false
                }
            },
            supervisorSelected(d) {
                this.create_user.supervisor = null;
                this.form.parent_id = '';
                if (d !== ''  && d !== undefined) {
                    this.supervisor = d;
                    this.form.parent_id = d.id
                }
            },
            regionSelected(d) {
                this.create_user.region = null;
                this.form.region_id = '';
                this.create_user.site = null;
                this.form.site_id = '';
                this.clearWarehouse = true
                this.disabled_warehouse = true
                if (d) {
                    this.create_user.region = d;
                    this.form.region_id = d.id
                    this.disabled_warehouse = false
                    this.clearWarehouse = false
                }
            },
            siteSelected(d) {
                this.create_user.site = null;
                this.form.site_id = '';
                if (d !== ''  && d !== undefined) {
                    this.create_user.site = d;
                    this.form.site_id = d.id
                }
            },
            salesGroupSelected(d) {
                this.form.territory_id = '';
                if(d){
                    this.form.territory_id = d.id
                }
            },
            mainRoleSelected(d) {
                this.$store.commit('setMainRoleCreateUser', null)
                this.create_user.form.sub_roles = null
                this.form.territory_id = '';
                this.clearSalesGroup = true
                this.disabled_role = true
                if (d !== ''  && d !== undefined) {
                    this.$store.commit('setMainRoleCreateUser', d)
                    this.disabled_role = false
                }
            },
            async roleSelected(d) {
                this.create_user.form.sub_roles = null
                if (d) {
                    let selected_sub_roles = await d.map((e) => {
                        return e.id
                    })
                    this.create_user.form.sub_roles = selected_sub_roles
                }
            },
        },
        watch: {
            'form.phone_number': {
                handler: function (val) {
                    this.form.phone_number = val.replace(/^0+/, '')
                },
                deep: true
            },
        },
    }
</script>
