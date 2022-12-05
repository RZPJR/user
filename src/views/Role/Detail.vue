<template>
    <v-container fill-height class="main-container">
        <div class="box-start">
            <v-row class="mb24">
                <v-col class="fs24 bold">
                    {{item.name}}
                </v-col>
                <v-col class="d-flex justify-end align-end">
                    <div v-if="item.status == 1">
                        <v-btn
                            elevation="0"
                            rounded
                            small
                            class="no-caps mb4"
                            :color="statusMaster('active')"
                        >Active</v-btn>
                    </div>
                    <div v-else-if="item.status == 2">
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
                            <v-btn icon v-on="on">
                                <v-icon>more_vert</v-icon>
                            </v-btn>
                        </template>
                        <v-list class="bg-white">
                            <v-list-item 
                                data-unq="role-button-updateRole"
                                :to="{ name: 'RoleUpdate', params: { id: item.id } }"
                                v-if="item.status === 1"
                                v-privilege="'rol_upd'"
                            >
                                <v-list-item-content>
                                    <v-list-item-title>Update</v-list-item-title>
                                </v-list-item-content>
                                <v-list-item-icon>
                                    <v-icon>mdi-open-in-new</v-icon>
                                </v-list-item-icon>
                            </v-list-item>
                            <div v-if="item.status === 1">
                                <hr/>
                            </div>
                            <v-list-item 
                                data-unq="role-button-archiveRole"
                                @click="changeStatus(item.status,item.id)"
                                v-if="item.status === 1"
                                v-privilege="'rol_arc'"
                            >
                                <v-list-item-content>
                                    <v-list-item-title>Archive</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                            <v-list-item 
                                data-unq="role-button-unarchiveRole"
                                @click="changeStatus(item.status,item.id)"
                                v-else
                                v-privilege="'rol_urc'"
                            >
                                <v-list-item-content>
                                    <v-list-item-title>Unarchive</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" md="6" class="mt24">
                    <DetailRowNew :name="'Name'" :value="item.name"/>
                </v-col>
                <v-col cols="12" md="6" class="mt24">
                    <DetailRowNew :name="'Division'" :value="item.division.name"/>
                </v-col>
            </v-row>
        </div>
        <div class="box-title fs16 bold">
            Permissions
        </div>
        <div class="box-body">
            <div class="-ma16">
                <v-simple-table>
                    <template>
                        <ul v-for="item in permission" :key="item.id">
                            <li>{{item.name}}</li>
                            <ul v-for="c in item.child" :key="c.id">
                                <li>{{ c.name }}</li>
                                <ul v-for="gc in c.grand_child" :key="gc.id">
                                    <li>{{ gc.name }}</li>
                                </ul>
                            </ul>
                        </ul>
                    </template>
                </v-simple-table>
            </div>
        </div>
        <ConfirmationDialogNew :sendData="ConfirmData"/>
    </v-container>
</template>

<script>
    export default {
        name: "RoleDetail",
        data () {
            return {
                item:{
                    division: {},
                    status_convert : '',
                },
                permission:[],
                ConfirmData:{},
            }
        },
        methods: {
            async renderData(){
                await this.$http.get("/account/v1/role/" + this.$route.params.id).then(response => {
                    this.item = response.data.data
                    this.permission=[]
                    if(response.data.data.permissions){
                        this.permission = response.data.data.permissions
                    }
                });
            },
            changeStatus(val,id) {
                if (val=='1') {
                    this.ConfirmData = {
                        model : true,
                        status : true,
                        title : "Archive",
                        text : "Are you sure want to Archive this Role?",
                        urlApi : '/role/archive/'+id,
                        statusMsg : "Success to Archive this Role",
                        data : {}
                    }
                } else {
                    this.ConfirmData = {
                        model : true,
                        status : true,
                        title : "Unarchive",
                        text : "Are you sure want to Unarchive this Role?",
                        urlApi : '/role/unarchive/'+id,
                        statusMsg : "Success to Unarchive this Role",
                        data : {}
                    }
                }
            },
        },
        mounted() {
            this.renderData()
            let self = this
            this.$root.$on('event_success', function(res){
                if (res) {
                    self.renderData()
                }
            });
        },
    }
</script>
