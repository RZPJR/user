<template>
    <v-container fill-height class="main-container">
        <div class="box-start">
            <v-row>
                <v-col cols="12" md="4" class="h70">
                    <v-tooltip bottom>
                        <template v-slot:activator="{ on: tooltip }">
                            <v-text-field
                                data-unq="division-input-search"
                                dense
                                v-model="search"
                                outlined
                                filled
                                placeholder="Search..."
                                prepend-inner-icon="search"
                                v-on="{ ...tooltip }"
                            >
                            </v-text-field>
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
                        data-unq="division-btn-filterExpandLess"
                        depressed
                        x-small
                        @click="showFilter = !showFilter"
                        v-if="showFilter"
                        class="no-caps fs12"
                    >Hide<v-icon right>expand_less</v-icon></v-btn>
                    <v-btn 
                        data-unq="division-btn-filterExpandMore"
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
                    <SelectStatus
                        data-unq="division-select-status"
                        :default="1"
                        v-model="statuses"
                        @selected="statusSelected"
                        :dense="true"
                    ></SelectStatus>
                </v-col>
            </v-row>
        </div>
        <div class="box-title">
            <v-row >
                <v-col class="flex-align-end">
                    <v-btn
                        data-unq="division-button-createDivision"
                        depressed
                        color="#50ABA3"
                        to="/user/division/create"
                        class="no-caps bold"
                        v-privilege="'dvs_crt'"
                    >
                    <span class="text-white">
                        Create Division
                    </span>
                    </v-btn>
                </v-col>
            </v-row>
        </div>
        <div class="box-body-table">
            <v-data-table
                :mobile-breakpoint="0"
                :headers="table.fields"
                :items="items"
                :loading="loading"
                :items-per-page="10"
            >
                <template v-slot:item="props">
                    <tr style="height:48px">
                        <td>{{ props.item.name }}</td>
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
                                            data-unq="division-button-actionButton"
                                            icon
                                            v-on="{ ...menu }"
                                        >  
                                            <v-icon dark>more_vert</v-icon>
                                        </v-btn>
                                    </template>
                                </template>
                                <v-list class="bg-white">
                                    <v-list-item 
                                        data-unq="division-button-updateUser"
                                        v-privilege="'dvs_upd'"
                                        :to="{ name: 'DivisionUpdate', params: { id: props.item.id } }"
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
                                        data-unq="division-button-archiveUser"
                                        v-privilege="'dvs_arc'"
                                        @click="changeStatus(props.item.status,props.item.id)"
                                        v-if="props.item.status=='1'"
                                    >
                                        <v-list-item-content>
                                            <v-list-item-title>Archive</v-list-item-title>
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
        name: "Division",
        data() {
            return {
                search: '',
                loading: false,
                statuses:1,
                filter : false,
                showFilter : false,
                table: {
                    fields: [
                        {
                            text:'Name',
                            class: 'grey--text text--darken-4',
                            sortable: false
                        },
                        {
                            text:'Status',
                            class: 'grey--text text--darken-4',
                            sortable: false
                        },
                        {
                            width: '3%',
                            class: 'grey--text text--darken-4',
                            sortable: false
                        },
                    ],
                },
                items:[],
                ConfirmData : {},
            }
        },
        mounted() {
            this.renderData('')
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
                        statusMsg : "Success to Archive this Division",
                        text : "Are you sure want to Archive this Division?",
                        urlApi : '/account/v1/division/archive/'+id,
                        data : {}
                    }
                }
            },
            renderData(search){
                this.loading = true;
                this.items = []
                let statuses = ''
                if(this.statuses === 999){
                    statuses = ''
                }else{
                    statuses= "|status:"+this.statuses
                }
                this.$http.get("/account/v1/division",{params:{
                        per_page:100,
                        conditions:'Or.name.icontains:'+search+statuses,
                    }}).then(response => {
                    this.loading = false
                    this.items = response.data.data
                    if(this.items === null){
                        this.items = []
                    }
                });
            },
            statusSelected(d) {
                this.statuses = null;
                if (d !== ''  && d !== undefined) {
                    this.statuses = d.value;
                }
            },
        },
        watch: {
            'search': {
                handler: function (val) {
                    let that = this
                    clearTimeout(this._timerId)
                    this._timerId = setTimeout(function(){ 
                        that.renderData(val)
                    }, 1000);
                },
                deep: true
            },
            'statuses': {
                handler: function (val) {
                    let that = this

                    that.renderData(this.search)
                },
                deep: true
            },
        },
    }
</script>