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
                                v-model="division_list.search"
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
            <v-row :class="division_list.showFilter?'mb24':''">
                <v-col>
                    Filter 
                    <v-btn 
                        data-unq="division-btn-filterExpandLess"
                        depressed
                        x-small
                        @click="division_list.showFilter = !division_list.showFilter"
                        v-if="division_list.showFilter"
                        class="no-caps fs12"
                    >Hide<v-icon right>expand_less</v-icon></v-btn>
                    <v-btn 
                        data-unq="division-btn-filterExpandMore"
                        depressed
                        x-small
                        @click="division_list.showFilter = !division_list.showFilter"
                        v-else
                        class="no-caps fs12"
                    >Show<v-icon right>expand_more</v-icon></v-btn>
                </v-col>
            </v-row>
            <v-row v-if="division_list.showFilter">
                <v-col cols="12" md="3">
                    <SelectStatus
                        data-unq="division-select-status"
                        :default="1"
                        v-model="division_list.statuses"
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
                :headers="division_list.table.fields"
                :items="division_list.items"
                :loading="loading"
                :items-per-page="10"
            >
                <template v-slot:item="props">
                    <tr style="height:48px">
                        <td>{{ props.item.code ? props.item.code : '-' }}</td>
                        <td>{{ props.item.name ? props.item.name : '-' }}</td>
                        <td>{{ props.item.note ? props.item.note : '-' }}</td>
                        <td>
                            <div v-if="props.item.status == 1">
                                <v-chip
                                    :color="statusMaster('active')"
                                    :data-unq="`division-label-status-${props.index}`"
                                ><span class="pa-md-2">Active</span></v-chip>
                            </div>
                            <div v-if="props.item.status == 2">
                                <v-chip
                                    :color="statusMaster('archived')"
                                    :data-unq="`division-label-status-${props.index}`"
                                >Archived</v-chip>
                            </div>
                        </td>
                        <td>
                            <v-menu>
                                <template v-slot:activator="{ on: menu }">
                                    <template >
                                        <v-btn
                                            :data-unq="`division-button-actionButton-${props.index}`"
                                            icon
                                            v-on="{ ...menu }"
                                        >  
                                            <v-icon dark>more_vert</v-icon>
                                        </v-btn>
                                    </template>
                                </template>
                                <v-list class="bg-white">
                                    <v-list-item 
                                        :data-unq="`division-button-updateUser-${props.index}`"
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
                                        :data-unq="`division-button-archiveUser-${props.index}`"
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
        <ConfirmationDialogNew :sendData="division_list.ConfirmData"/>
    </v-container>
</template>
<script>
    import { mapState, mapActions, mapMutations } from "vuex";
    export default {
        name: "Division",
        data() {
            return {
            }
        },
        computed: {
            ...mapState({
                division_list: state => state.division.division_list,
            }),
        },
        mounted() {
            this.fetchDivisionList()
            let self = this
            this.$root.$on('event_success', function(res){
                if (res) {
                    self.fetchDivisionList()
                }
            });
        },
        methods: {
            ...mapActions([
                "fetchDivisionList"
            ]),
            changeStatus(val,id) {
                if (val=='1') {
                    this.division_list.ConfirmData = {
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
            statusSelected(d) {
                this.division_list.statuses = null;
                if (d) {
                    this.division_list.statuses = d.value;
                    this.fetchDivisionList()
                }
            },
        },
        watch: {
            'division_list.search': {
                handler: function (val) {
                    let that = this
                    clearTimeout(this._timerId)
                    this._timerId = setTimeout(function(){ 
                        that.fetchDivisionList()
                    }, 1000);
                },
                deep: true
            },
        },
    }
</script>