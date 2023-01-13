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
                                v-model="search"
                                outlined
                                filled
                                placeholder="Search..."
                                v-on="{ ...tooltip }"
                                prepend-inner-icon="search"
                            ></v-text-field>
                        </template>
                        <span>Search by name</span>
                    </v-tooltip>
                </v-col>
            </v-row>
            <v-row class="hr-title"/>
            <v-row :class="showFilter?'mb24':''">
                <v-col>
                    Filter 
                    <v-btn 
                        data-unq="user-button-filterExpandLess"
                        depressed
                        x-small
                        @click="showFilter = !showFilter"
                        v-if="showFilter"
                        class="no-caps fs12"
                    >Hide<v-icon right>expand_less</v-icon></v-btn>
                    <v-btn 
                        data-unq="user-button-filterExpandMore"
                        depressed
                        x-small
                        @click="showFilter = !showFilter"
                        v-else
                        class="no-caps fs12"
                    >Show<v-icon right>expand_more</v-icon></v-btn>
                </v-col>
            </v-row>
            <v-row v-if="showFilter">
                <v-col cols="12" md="3">
                    <v-select
                        data-unq="user-select-status"
                        v-model="statuses"
                        :items="status"
                        item-text="text"
                        item-value="value"
                        outlined
                        dense
                    ></v-select>
                </v-col>
            </v-row>
        </div>
        <div class="box-title">
            <v-row >
                <v-col class="flex-align-end">
                    <v-btn
                        data-unq="user-button-createRole"
                        depressed
                        color="#50ABA3"
                        :to="{ name: 'RoleCreate' }"
                        class="no-caps bold"
                        v-privilege="'rol_crt'"
                    >
                        <span class="text-white">
                            Create Role
                        </span>
                    </v-btn>
                </v-col>
            </v-row>
        </div>
        <div class="box-body-table">
            <v-data-table
                :headers="table.fields"
                :items="items"
                :loading="loading"
                :items-per-page="10"
                :mobile-breakpoint="0"
            >
                <template v-slot:item="props">
                    <tr style="height:48px">
                        <td>
                            {{ props.item.name }}
                        </td>
                        <td>
                            <div v-if="props.item.status == 1">
                                <v-chip
                                    :color="statusMaster('active')"
                                ><span class="pa-md-2">Active</span></v-chip>
                            </div>
                            <div v-if="props.item.status == 2">
                                <v-chip
                                    :color="statusMaster('archived')"
                                >Archived</v-chip>
                            </div>
                        </td>
                        <td>
                            <v-menu>
                                <template v-slot:activator="{ on: menu }">
                                    <template >
                                        <v-btn
                                            :data-unq="`role-button-actionButton-${props.item.id}`"
                                            icon
                                            v-on="{ ...menu }"
                                        >  
                                            <v-icon dark>more_vert</v-icon>
                                        </v-btn>
                                    </template>
                                </template>
                                <v-list class="bg-white">
                                    <v-list-item 
                                        :data-unq="`role-button-detailRole-${props.item.id}`"
                                        v-privilege="'rol_rdd'"
                                        :to="{ name: 'RoleDetail', params: { id: props.item.id } }"
                                    >
                                        <v-list-item-content>
                                            <v-list-item-title>Detail</v-list-item-title>
                                        </v-list-item-content>
                                        <v-list-item-icon>
                                            <v-icon>open_in_new</v-icon>
                                        </v-list-item-icon>
                                    </v-list-item>
                                    <v-list-item 
                                        :data-unq="`role-button-updateRole-${props.item.id}`"
                                        v-privilege="'rol_upd'"
                                        :to="{ name: 'RoleUpdate', params: { id: props.item.id } }"
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
                                        :data-unq="`role-button-archiveRole-${props.item.id}`"
                                        @click="changeStatus(props.item.status,props.item.id)"
                                        v-if="props.item.status=='1'"
                                        v-privilege="'rol_arc'"
                                    >
                                        <v-list-item-content>
                                            <v-list-item-title>Archive</v-list-item-title>
                                        </v-list-item-content>
                                    </v-list-item>
                                    <v-list-item 
                                        :data-unq="`role-button-unarchiveRole-${props.item.id}`"
                                        @click="changeStatus(props.item.status,props.item.id)"
                                        v-else
                                        v-privilege="'rol_urc'"
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
        <ConfirmationDialogNew :sendData="ConfirmData"/>
    </v-container>
</template>
<script>
    export default {
        name: "RoleList",
        data() {
            return {
                search: '',
                loading: false,
                area:null,
                division:null,
                role:null,
                filter2 : false,
                warehouse:null,
                filter:{
                    area_id:'',
                    division_id:'',
                    role_id:'',
                    warehouse_id:'',
                },
                disabled_warehouse:true,
                clearWarehouse:false,
                disabled_role:true,
                clearRole:false,
                statuses:1,
                showFilter: false,
                table: {
                    fields: [
                        {
                            text:'Name',
                            class: 'grey--text text--darken-4',
                            sortable: false,
                        },
                        {
                            text:'Status',
                            class: 'grey--text text--darken-4',
                            sortable: false
                        },
                        {
                            text:'',
                            width: "5%",
                            sortable: false
                        },
                    ],
                },
                items:[],
                ConfirmData : {},
            }
        },
        created() {
            this.renderData('',this.statuses)
        },
        mounted() {
            let self = this
            this.$root.$on('event_success', function(res){
                if (res) {
                    self.renderData(self.search,self.statuses)
                }
            });
        },
        methods: {
            changeStatus(val,id) {
                if (val=='1') {
                    this.ConfirmData = {
                        model : true,
                        status : true,
                        title : "Archive",
                        statusMsg : "Success to Archive this Role",
                        text : "Are you sure want to Archive this Role?",
                        urlApi : '/role/archive/'+id,
                        data : {}
                    }
                } else {
                    this.ConfirmData = {
                        model : true,
                        status : true,
                        title : "Unarchive",
                        statusMsg : "Success to Unarchive this Role",
                        text : "Are you sure want to Unarchive this Role?",
                        urlApi : '/role/unarchive/'+id,
                        data : {}
                    }
                }
            },
            renderData(search, statuses){
                this.loading = true;
                this.items = []
                if(statuses === 999){
                  statuses = ''
                }else{
                  statuses= "|status:"+statuses
                }
                this.$http.get("/role",{params:{
                      per_page:100,
                      conditions:'Or.name.icontains:'+search+statuses,
                      orderby:'-id',
                  }}).then(response => {
                  this.loading = false;
                  this.items = response.data.data
                  if(this.items === null){
                      this.items = []
                  }
                })
                .catch(e => {
                    this.items = []
                });
            },
        },
        watch: {
            'search': {
                handler: function (search) {
                    let that = this
                    clearTimeout(this._timerId)
                    this._timerId = setTimeout(function(){
                        that.renderData(search,that.statuses)
                    }, 1000);
                },
                deep: true
            },
            'statuses': {
                handler: function (statuses) {
                    let that = this;
                    that.renderData(this.search,statuses)
                },
                deep: true
            },
        },
    }
</script>