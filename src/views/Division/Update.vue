<template>
    <v-container fill-height class="main-container">
        <div class="box">
            <v-row class="mt24">
                <v-col cols="12" md="6" class="mt24">
                    <v-text-field
                        data-unq="division-input-code"
                        name="code"
                        v-model="form.code"
                        maxlength="20"
                        required
                        outlined
                        :dense="true"
                        :error-messages="error.code"
                    >
                        <template v-slot:label>
                            Code<span class="text-red">*</span>
                        </template>
                    </v-text-field>
                </v-col>
                <v-col cols="12" md="6" class="mt24">
                    <v-text-field
                        data-unq="division-input-name"
                        name="name"
                        v-model="form.name"
                        maxlength="20"
                        required
                        outlined
                        :dense="true"
                        :error-messages="error.name"
                    >
                        <template v-slot:label>
                            Name<span class="text-red">*</span>
                        </template>
                    </v-text-field>
                </v-col>
                <v-col cols="12" class="-mt24">
                    <v-textarea
                        name="note"
                        v-model="form.note"
                        :counter="250"
                        outlined
                        rows="3"
                    >
                        <template v-slot:label>
                            Note
                        </template>
                    </v-textarea>
                </v-col>
            </v-row>
            <v-row class="hr-title"/>
            <v-row>
                <v-col>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                            data-unq="division-button-cancel"
                            @click="$router.go(-1)"
                            depressed
                            outlined
                            color="#EBEBEB"
                            class="main-btn"
                        >
                            <span class="text-black80">Cancel</span>
                        </v-btn>
                        <v-btn 
                            data-unq="division-button-save"
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
        name: "DivisionUpdate",
        data () {
            return {
                ConfirmData:[],
                permission:[],
                form:{
                    code: '',
                    name: '',
                    note: ''
                },
                error:{},
            }
        },
        mounted () {
            this.renderData()
            let self = this
            this.$root.$on('event_error', function(err){
                self.error = err
            });
        },
        methods:{
            renderData(){
                this.$http.get("/account/v1/division/" + this.$route.params.id,{params:{
                        per_page:100,
                    }}).then(response => {
                    this.form = response.data.data
                });
            },
            confirmButton() {
                this.ConfirmData = {
                    model : true,
                    title : "Update Division",
                    text : "Are you sure want to update this Division?",
                    urlApi : "/account/v1/division/" + this.$route.params.id,
                    nextPage : "/user/division",
                    data : this.form
                }
            }
        },
    }
</script>
