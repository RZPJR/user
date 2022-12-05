<template>
    <v-container fill-height class="main-container">
        <div class="box">
            <v-row class="mt24">
                <v-col cols="12" md="6" class="mt24">
                    <v-text-field
                        data-unq="role-input-name"
                        name="name"
                        v-model="form.name"
                        :counter="20"
                        maxlength="20"
                        required
                        outlined
                        :error-messages="error.name"
                        dense
                    >
                        <template v-slot:label>
                            Name<span style="color:red">*</span>
                        </template>
                    </v-text-field>
                </v-col>
                <v-col cols="12" md="6" class="mt24">
                    <SelectDivision
                        data-unq="role-select-division"
                        name="division"
                        v-model="division"
                        @selected="divisionSelected"
                        :error="error.division_id"
                        :division="division"
                        :dense="true"
                        required
                    > </SelectDivision>
                </v-col>
            </v-row>
        </div>
        <div class="box-title fs16 bold">
            Permissions
        </div>
        <div class="box-body">
            <div class="-ma16">
                <PermissionCreate
                    data-unq="role-checkbox-permission"
                    name="permission"
                    v-model="form.permissions"
                    @checked="permissionChecked"
                    :idPermission="permission" >
                </PermissionCreate>
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
        <ConfirmationDialogNew :sendData="ConfirmData"/>
    </v-container>
</template>
<script>
    export default {
        name : 'RoleCreate',
        data () {
            return {
                ConfirmData:{},
                permission:[],
                division:{},
                form:{
                    name: '',
                    division_id: '',
                    permissions:[],
                },
                error:{},
                putData:{},
            }
        },
        methods:{
            confirmButton() {
                this.ConfirmData = {
                    model : true,
                    title : "Create Role",
                    text : "Are you sure want to create this role?",
                    urlApi : '/account/v1/role',
                    nextPage : '/user/role',
                    post : true,
                    data : this.form
                }
            },
            divisionSelected(d) {
                this.division = null;
                this.form.division_id = '';
                if (d !== '' && d !== undefined) {
                    this.division = d;
                    this.form.division_id = d.id;
                }
            },
            permissionChecked(d) {
                this.form.permissions = []
                if (d !== '') {
                    var i;
                    for (i = 0; i < d.length; i++) {
                        this.form.permissions.push(d[i].id)
                    }
                }
            },
        },
        mounted () {
            let self = this
            this.$root.$on('event_error', function(err){
                self.error = err
            });
        },
    }
</script>
