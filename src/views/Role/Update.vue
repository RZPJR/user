<template>
    <v-container fill-height class="main-container">
        <div class="box">
            <v-row class="mt24">
                <v-col cols="12" md="6" class="mt18">
                    <v-text-field
                        data-unq="role-input-code"
                        name="code"
                        v-model="form.code"
                        disabled
                        required
                        outlined
                        dense
                    >
                        <template v-slot:label>
                            Code<span style="color:red">*</span>
                        </template>
                    </v-text-field>
                    <v-text-field
                        data-unq="role-input-name"
                        name="name"
                        v-model="form.name"
                        :counter="20"
                        maxlength="20"
                        required
                        outlined
                        dense
                        :error-messages="role_update.error.name"
                    >
                        <template v-slot:label>
                            Name<span style="color:red">*</span>
                        </template>
                    </v-text-field>
                </v-col>
                <v-col cols="12" md="6" class="mt18">
                    <SelectDivision
                        data-unq="role-select-division"
                        name="division"
                        v-model="form.division"
                        :error="role_update.error.division_id"
                        :division="form.division"
                        disabled
                        required
                        :dense="true"
                    > </SelectDivision>
                </v-col>
                <v-col cols="12" md="12" class="-mt24">
                    <v-textarea
                        name="note"
                        v-model="form.note"
                        :counter="250"
                        outlined
                        rows="3"
                    >
                        <template v-slot:label>
                            <div>
                                Note
                            </div>
                        </template>
                    </v-textarea>
                </v-col>
            </v-row>
        </div>
        <div class="box-title fs16 bold">
            Permissions
        </div>
        <div class="box-body">
            <div class="-ma16">
                <PermissionUpdate
                    data-unq="role-checkbox-permission"
                    name="permission"
                    v-model="form.permission_ids"
                    @selected="permissionChecked"
                    :idPermission="form.permission_ids"
                    :idRole="form.id"
                ></PermissionUpdate>
            </div>
        </div>
        <div class="box-end">
            <v-row class="-ma16">
                <v-col>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                            data-unq="role-button-cancel"
                            @click="$router.go(-1)"
                            depressed
                            outlined
                            color="#EBEBEB"
                            class="main-btn"
                        >
                            <span class="text-black80">Cancel</span>
                        </v-btn>
                        <v-btn
                            data-unq="role-button-save"
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
        <ConfirmationDialogNew :sendData="role_update.ConfirmData"/>
    </v-container>
</template>
<script>
    import { mapState, mapActions } from "vuex";
    export default {
        name: "RoleUpdate",
        data() {
            return {
            }
        },
        created(){
            this.fetchRoleUpdate()
            this.fetchRoleDetail({id: this.$route.params.id});
        },
        mounted () {
            let self = this
            this.$root.$on('event_error', function(err){
                self.role_update.error = err
            });
        },
        computed: {
            ...mapState({
                role_detail: state => state.role.role_detail,
                form: state => state.role.role_detail.item,
                role_update: state => state.role.role_update,
            }),
        },
        methods:{
            ...mapActions([
                "fetchRoleDetail",
                "fetchRoleUpdate"
            ]),
            confirmButton() {
                let send_data = this.form
                send_data.division_id = this.form.division.id
                this.role_update.ConfirmData = {
                    model : true,
                    title : "Update Role",
                    text : "Are you sure want to Update this role?",
                    urlApi : '/account/v1/role/'+ this.$route.params.id,
                    nextPage : '/user/role/detail/'+this.$route.params.id,
                    data : send_data
                }
            },
            permissionChecked(d) {
                if (d.length >0 ) {
                    this.form.permissions = d
                }
            }
        },
    }
</script>
