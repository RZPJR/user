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
                        :error-messages="error.name"
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
                        v-model="division"
                        @selected="divisionSelected"
                        :error="error.division_id"
                        :division="division"
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
                    v-model="form.permission_id"
                    @selected="permissionChecked"
                    :idPermission="permission"
                    :idRole="role_id"
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
        <ConfirmationDialogNew :sendData="ConfirmData"/>
    </v-container>
</template>
<script>
    import http from "../../services/http";
    export default {
        name: "RoleUpdate",
        data() {
            return {
                ConfirmData:{},
                permission:[],
                division:null,
                form:{
                    code:'',
                    name:'',
                    division_id: '',
                    note: '',
                    permissions:[],
                },
                error:{},
                putData:{},
                role_id: ''
            }
        },
        methods:{
            confirmButton() {
                this.ConfirmData = {
                    model : true,
                    title : "Update Role",
                    text : "Are you sure want to Update this role?",
                    urlApi : '/account/v1/role/'+ this.$route.params.id,
                    nextPage : '/user/role/detail/'+this.$route.params.id,
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
            async renderData(){
                await http.get("/role/" + this.$route.params.id).then(response => {
                    let data = response.data.data
                    this.form.name = data.name
                    this.divisionSelected(data.division);
                    this.role_id = data.id
                    this.permission=[]
                    let temp = data.permission_ids
                    temp.forEach((value, index) => {
                        this.permission.push(value)
                    });
                });
            },
            permissionChecked(d) {
                if (d.length >0 ) {
                    this.form.permissions = d
                }
            }
        },
        created(){
            this.renderData()
        },
        mounted () {
            let self = this
            this.$root.$on('event_error', function(err){
                self.error = err
            });
        },
        watch: {
            'division': {
                handler: function (val) {
                    let that = this
                    that.form.division = val;
                },
                deep: true
            },
        },
    }
</script>
